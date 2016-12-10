package br.gov.serpro.doubleagent;

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
    StringBuilder vendorScripts = new StringBuilder();

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
        nashorn.eval(getAjvInitializationCode());

        this.vendorScripts.append(getAjvInitializationCode() + NEW_LINE);

        // Loads the double-agent-validators base script
        loadJsScripts(DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME);

    }


    public void loadSchemaData(InputStream scriptCode)  throws ScriptException, IOException {
        loadValidationScript(scriptCode);
    }

    public void loadSchemaData(InputStream scriptCode, String... namespaceName) throws ScriptException, IOException {

        loadValidationScript(scriptCode);
        String scriptLoadCall;
        if (namespaceName.length == 1) {
            scriptLoadCall = "DoubleAgent.JsonSchemaValidator.load(" + namespaceName[0] + ");";
            this.namespaces.add(namespaceName[0]);
        } else {
            scriptLoadCall = "DoubleAgent.JsonSchemaValidator.loadMultiple("+ Arrays.toString(namespaceName) + ");";
            this.namespaces.addAll(Arrays.asList(namespaceName));
        }

        // execute load of namespaces
        this.nashorn.eval(scriptLoadCall);

        // add the call to load the namespaces to the STRING BUFFER
        this.scriptsLoaded.append(scriptLoadCall);
    }

    private void loadValidationScript(InputStream scriptCode) throws IOException, ScriptException {
        String script = IOUtils.toString(scriptCode, encoding);
        // execute scripts
        this.nashorn.eval(script);


        // add script load to the STRING BUFFER
        this.scriptsLoaded.append(script + NEW_LINE);
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
        Map<String, Object>jsObjResult = (Map<String, Object>) nashorn.getBindings(ScriptContext.ENGINE_SCOPE).get("result");
        
        // if the value is true, so get a result indicating "no error"
        if (Boolean.FALSE.equals(jsObjResult.get("hasErrors"))) {
            return new ValidationResult();
        } else {
        	// otherwise builds a ValidationResult object containing the errors
        	Map<String, Map<String, Object>> resultMap = (Map<String, Map<String, Object>>)jsObjResult.get("errors");
        	return ValidationResult.buildValidationResult(resultMap);       	
        }


    }


    private void loadJsScripts(String scriptName) throws ScriptException, IOException {
        loadScripts(JAVASCRIPT_ROOT_FOLDER, scriptName, false);
    }


    private void loadVendorScripts(String scriptName) throws ScriptException, IOException {
        loadScripts(VENDOR_FOLDER, scriptName, true);
    }


    private void loadScripts(String folder, String scriptPath, boolean isVendorScript) throws ScriptException, IOException {
        String scriptFilePath = folder + "/" + scriptPath;

        String script = getScriptStreamFromResource(scriptFilePath);

        if (isVendorScript) {
            this.vendorScripts.append(script + NEW_LINE);
        } else {
            this.scriptsLoaded.append(script + NEW_LINE);
        }

        nashorn.eval(script);

    }

    private String getAjvInitializationCode() {
        return "var ajv = new Ajv({ allErrors: true, verbose: false });";
    }

    private String getScriptStreamFromResource(String resourcePath) throws IOException {
        InputStream is = getClass().getResourceAsStream(resourcePath);
        return IOUtils.toString(is, encoding);
    }

    public String getScriptFile() {
        return this.scriptsLoaded.toString();
    }

    public String getScriptFileWithDependencies() {
        return vendorScripts.toString() + NEW_LINE + scriptsLoaded.toString();
    }


}
