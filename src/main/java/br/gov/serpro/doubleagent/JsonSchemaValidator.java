package br.gov.serpro.doubleagent;

import br.gov.serpro.doubleagent.model.ItemValidationResult;
import br.gov.serpro.doubleagent.model.ValidationResult;
import org.apache.commons.io.IOUtils;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * This class validates using nashorn (Java 8 Script Engine) and ajv (json validator javascript library)
 *
 * @author abner.oliveira on 03/11/16.
 */
public class JsonSchemaValidator {

    private final static String NEW_LINE = "\r\n";

    private final static String AJV_SCRIPT_NAME = "ajv.min.js";
    private final static String LODASH_SCRIPT_NAME = "lodash.min.js";
    private final static String DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME = "validators.js";

    private final static String SCHEMA_PATH = "schema-and-validators";

    private final static String VENDOR_FOLDER = "/validators/vendor";
    private final static String JAVASCRIPT_ROOT_FOLDER = "/validators/js";

    private List<String> namespaces = new ArrayList<>();

    private ScriptEngine nashorn = (ScriptEngine) new ScriptEngineManager()
            .getEngineByName("nashorn");

    StringBuilder scriptsLoaded = new StringBuilder();

    private Charset encoding = Charset.forName("UTF-8");

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
        String script = IOUtils.toString(namespaceCode, encoding);
        this.scriptsLoaded.append(script + NEW_LINE);
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

    public synchronized ValidationResult validate(String schemaName, String jsonTarget)
            throws Exception {

        nashorn.put("schemaName", schemaName);

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

        Map<String, Map<String, Object>> resultMap = (Map<String, Map<String, Object>>)jsObjResult;

        // otherwise builds a ValidationResult object containing the errors
        return buildValidationResultWithErrors(resultMap);
    }

    private ValidationResult buildValidationResultWithErrors(Map<String, Map<String, Object>> resultData) throws IOException {
        // TODO - Implement the build of a ValidationResult instance using Javascript/Nashorn so we will not need Jackson here
        List<ItemValidationResult> results = new ArrayList<ItemValidationResult>();


        for (Object key :
                resultData.keySet()
             ) {
            ItemValidationResult itemResult = new ItemValidationResult();
            for (String propKey : resultData.get(key).keySet()) {
                switch (propKey) {
                    case "keyword":
                        itemResult.setKeyword((String)resultData.get(key).get(propKey));
                        break;
                    case "dataPath":
                        itemResult.setDataPath((String)resultData.get(key).get(propKey));
                        break;
                    case "schemaPath":
                        itemResult.setSchemaPath((String)resultData.get(key).get(propKey));
                        break;
                    case "params":
                        itemResult.setParams((Map<String, String>) resultData.get(key).get(propKey));
                        break;
                    case "message":
                        itemResult.setMessage((String)resultData.get(key).get(propKey));
                        break;
                }
            }
            results.add(itemResult);

        }

        ValidationResult validationResult = new ValidationResult();
        validationResult.setErrors(results);
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

        String script = IOUtils.toString(is, encoding);

        if (saveOnList) {
            this.scriptsLoaded.append(script + NEW_LINE);
        }

        nashorn.eval(script);

    }

    public String getScriptFile() {
        return this.scriptsLoaded.toString();
    }

}
