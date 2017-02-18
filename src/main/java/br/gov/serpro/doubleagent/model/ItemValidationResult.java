package br.gov.serpro.doubleagent.model;

import org.apache.commons.lang3.builder.EqualsBuilder;

import java.io.Serializable;
import java.util.Map;

/**
 * Item do resulvado de validacao
 * Compoe a coleçao @Link ValidationResult.errors
 *
 * @author: abner.oliveira
 */
public class ItemValidationResult implements Serializable {


    private static final long serialVersionUID = 3489999103242660985L;


    private String keyword;
    private String dataPath;
    private String schemaPath;
    private Map<String, String> params;
    private String message;
    private Map<String, String> data;


    public ItemValidationResult() {
    }

    // Add a new constructor with "keyword" passed by param
    public ItemValidationResult(String keyword, String dataPath) {
        this.keyword = keyword;
        this.dataPath = dataPath;
    }

    //And/Or create a new static method to return a object of this class
    public static ItemValidationResult build(String keyword, String dataPath) {
        return new ItemValidationResult(keyword, dataPath);
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getDataPath() {
        if(this.getData() != null && this.getData().get("customDataPath") != null) {
            return this.getData().get("customDataPath");
        } else {
            return dataPath;
        }
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

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    public String getCustomDataPath() {
        if (this.getData() != null) {
            return this.getData().get("customDataPath");
        }
        return null;
    }

    @Override
    public boolean equals(Object object) {
        boolean isSame = false;

        if (object != null && object instanceof ItemValidationResult) {
            ItemValidationResult objectToCompare = (ItemValidationResult) object;

            isSame = new EqualsBuilder()
                .append(this.getDataPath(), objectToCompare.getDataPath())
                .append(this.getKeyword(), objectToCompare.getKeyword())
                .isEquals();
        }

        return isSame;
    }
}
