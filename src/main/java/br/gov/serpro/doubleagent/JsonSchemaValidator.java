package br.gov.serpro.doubleagent;

import br.gov.serpro.doubleagent.model.ItemValidationResult;
import br.gov.serpro.doubleagent.model.ValidationResult;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.MapLikeType;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

/**
 * This class validates using nashorn (Java 8 Script Engine) and ajv (json validator javascript library)
 * Created by abner.oliveira on 03/11/16.
 */
public class JsonSchemaValidator {

    private final static String AJV_SCRIPT_NAME = "ajv.min.js";
    private final static String LODASH_SCRIPT_NAME = "lodash.min.js";
    private final static String DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME = "validators.js";

    private final static String SCHEMA_PATH = "schema-and-validators";

    private final static String VENDOR_FOLDER = "/validators/vendor";
    private final static String JAVASCRIPT_ROOT_FOLDER = "/validators/js";

    private ObjectMapper mapper = new ObjectMapper();

    private boolean initialized = false;

    private List<String> namespaces;

    private ScriptEngine nashorn = (ScriptEngine) new ScriptEngineManager()
            .getEngineByName("nashorn");

    /***
     *
     */
    public JsonSchemaValidator() throws ScriptException {
        System.out.println("[JsonSchemaValidator] => Constructor Called");
        this.namespaces = namespaces;

        // CARREGA SCRIPTS do AJV e do LODASH
        loadVendorScripts(LODASH_SCRIPT_NAME);
        loadVendorScripts(AJV_SCRIPT_NAME);

        // INICIALIZA o AJV
        nashorn.eval("var ajv = new Ajv({ allErrors: true, verbose: false });");

        // CARREGA O SCRIPT DE SCHEMA E CUSTOM VALIDATORS A PARTIR DO SCHEMA
        loadJsScripts(DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME);

//        nashorn.eval("DoubleAgent.JsonSchemaValidator.init([" +
//                StringUtils.join(this.namespaces.iterator(), ",\n") +
//                "]);");
    }

    public void loadSchemaData(String namespaceName, InputStreamReader namespaceCode) throws ScriptException {
        this.nashorn.eval(namespaceCode);
        this.nashorn.eval("DoubleAgent.JsonSchemaValidator.load(" + namespaceName + ");");
        this.namespaces.add(namespaceName);
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

        nashorn.eval("var result = DoubleAgent.JsonSchemaValidator.validate('" + schemaName + "', value);");
        // obtem o resultado da execuçao do script
        Object jsObjResult = nashorn.getBindings(ScriptContext.ENGINE_SCOPE).get("result");

        if (jsObjResult.equals(true)) {
            return new ValidationResult();
        }

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

    private void loadJsScripts(String scriptName) throws ScriptException {
        loadScripts(JAVASCRIPT_ROOT_FOLDER, scriptName);
    }

    private void loadVendorScripts(String scriptName) throws ScriptException {
        loadScripts(VENDOR_FOLDER, scriptName);
    }

    private void loadScripts(String folder, String scriptPath) throws ScriptException {
        String scriptFilePath = folder + "/" + scriptPath;
        InputStreamReader is = new InputStreamReader(getClass()
                .getResourceAsStream(scriptFilePath));
        System.out.println("LOADING SCRIPT FILE: " + scriptFilePath);
        nashorn.eval(is);

    }

    private String buildSchemaFilePath(String schemaName) {
        return SCHEMA_PATH + "/" + schemaName + ".js";
    }

    public InputStream getScriptFile() {
        String scriptFilePath = JAVASCRIPT_ROOT_FOLDER + "/" + DOUBLE_AGENT_VALIDATORS_SCRIPT_NAME;
        return getClass().getResourceAsStream(scriptFilePath);
    }

}
