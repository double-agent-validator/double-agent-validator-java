package br.gov.serpro.doubleagent;

import br.gov.serpro.doubleagent.model.ItemValidationResult;
import br.gov.serpro.doubleagent.model.ValidationResult;
import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.MapLikeType;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

/**
 * This class validates using nashorn (Java 8 Script Engine) and ajv (json validator javascript library)
 *
 * @author abner.oliveira on 03/11/16.
 */
public class JsonSchemaValidator {

    private final static String AJV_SCRIPT_NAME = "ajv.min.js";
    private final static String LODASH_SCRIPT_NAME = "lodash.min.js";
    private final static String DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME = "validators.js";

    private final static String SCHEMA_PATH = "schema-and-validators";

    private final static String VENDOR_FOLDER = "/validators/vendor";
    private final static String JAVASCRIPT_ROOT_FOLDER = "/validators/js";

    private ObjectMapper mapper = new ObjectMapper();

    private List<String> namespaces = new ArrayList<>();

    private ScriptEngine nashorn = (ScriptEngine) new ScriptEngineManager()
            .getEngineByName("nashorn");

    StringBuilder scriptsLoaded = new StringBuilder();

    private Charset encondig = Charset.forName("UTF-8");

    /***
     *
     */
    public JsonSchemaValidator() throws ScriptException, IOException {
        System.out.println("[JsonSchemaValidator] => Constructor Called");

        // Load the lodash and ajv libraries into the nashorn environment
        loadVendorScripts(LODASH_SCRIPT_NAME);
        loadVendorScripts(AJV_SCRIPT_NAME);

        // Initializes the ajv engine
        nashorn.eval("var ajv = new Ajv({ allErrors: true, verbose: false });");

        // Loads the double-agent-validators base script
        loadJsScripts(DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME);

    }

    public void loadSchemaData(InputStream namespaceCode, String... namespaceName) throws ScriptException, IOException {
        String script = IOUtils.toString(namespaceCode, encondig);
        this.scriptsLoaded.append(script);
        if (namespaceName.length == 1) {
            this.nashorn.eval(script);
            this.nashorn.eval("DoubleAgent.JsonSchemaValidator.load(" + namespaceName[0] + ");");
            this.namespaces.add(namespaceName[0]);
        } else {
            this.nashorn.eval(script);
            this.nashorn.eval("DoubleAgent.JsonSchemaValidator.loadMultiple(" + Arrays.toString(namespaceName) + ");");
            this.namespaces.addAll(Arrays.asList(namespaceName));
        }
    }


    public synchronized ValidationResult validate(String schemaName, Object target) throws Exception {
        return this.validate(schemaName, mapper.writeValueAsString(target));

    }

    public synchronized ValidationResult validate(String schemaName, String jsonTarget)
            throws Exception {

        nashorn.put("schemaName", schemaName);

        nashorn.put("mapper", mapper);

        // ugly but necessary to the object behaves like a common anonymous
        // javascript Object
        // and so, works as it should in the browser
        nashorn.eval("var value = " + jsonTarget + ";");

        // calls the validation function
        nashorn.eval("var result = DoubleAgent.JsonSchemaValidator.validate('" + schemaName + "', value);");

        // get the result from the nashorn environment
        Object jsObjResult = nashorn.getBindings(ScriptContext.ENGINE_SCOPE).get("result");

        // if the value is true, so get a result indicating "no error"
        if (jsObjResult.equals(true)) {
            return new ValidationResult();
        }

        // otherwise builds a ValidationResult object containing the errors
        return buildValidationResultWithErrors(jsObjResult);
    }

    private ValidationResult buildValidationResultWithErrors(Object resultData) throws IOException {
        String json = mapper.writeValueAsString(resultData);
        MapLikeType javaType = mapper.getTypeFactory().constructMapLikeType(Map.class, Long.class, ItemValidationResult.class);
        Map<Long, ItemValidationResult> map = mapper.readValue(json, javaType);

        ValidationResult validationResult = new ValidationResult();
        validationResult.setErrors(map.values());
        return validationResult;
    }

    private void loadJsScripts(String scriptName) throws ScriptException, IOException {
        loadScripts(JAVASCRIPT_ROOT_FOLDER, scriptName, true);
    }


    private void loadVendorScripts(String scriptName) throws ScriptException, IOException {
        loadScripts(VENDOR_FOLDER, scriptName);
    }

    private void loadScripts(String folder, String scriptPath) throws ScriptException, IOException {
        loadScripts(folder, scriptPath, false);
    }

    private void loadScripts(String folder, String scriptPath, boolean saveOnList) throws ScriptException, IOException {
        String scriptFilePath = folder + "/" + scriptPath;
        InputStream is = getClass().getResourceAsStream(scriptFilePath);
        System.out.println("LOADING SCRIPT FILE: " + scriptFilePath);

        String script = IOUtils.toString(is, encondig);

        if (saveOnList) {
            this.scriptsLoaded.append(script);
        }

        nashorn.eval(script);

    }

    public String getScriptFile() {
        return this.scriptsLoaded.toString();
    }

}
