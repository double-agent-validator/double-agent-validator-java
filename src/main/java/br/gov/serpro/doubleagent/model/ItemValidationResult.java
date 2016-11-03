package br.gov.serpro.doubleagent.model;

import java.io.Serializable;
import java.util.Map;

/**
 * Item do resulvado de validacao
 * Compoe a coleçao @Link ValidationResult.errors
 * @author: abner.oliveira
 */
public class ItemValidationResult implements Serializable {


    private static final long serialVersionUID = 3489999103242660985L;


    private String keyword;
    private String dataPath;
    private String schemaPath;
    private Map<String, String> params;
    private String message;
    private boolean hasError = true;

    public ItemValidationResult() {
    }

    public ItemValidationResult withoutError() {
        this.hasError = false;
        return this;

    }

    public void setError(boolean hasError) {
        this.hasError = hasError;
    }

    public boolean hasError() {
        return this.hasError;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getDataPath() {
        return dataPath;
    }

    public void setDataPath(String dataPath) {
        this.dataPath = dataPath;
    }

    public String getSchemaPath() {
        return schemaPath;
    }

    public void setSchemaPath(String schemaPath) {
        this.schemaPath = schemaPath;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
