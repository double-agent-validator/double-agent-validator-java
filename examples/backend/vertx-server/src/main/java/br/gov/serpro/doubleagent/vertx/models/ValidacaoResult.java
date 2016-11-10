package br.gov.serpro.doubleagent.vertx.models;


import br.gov.serpro.doubleagent.model.ItemValidationResult;
import br.gov.serpro.doubleagent.model.ValidationResult;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

/**
 * Created by 80129498572 on 08/11/16.
 */
public class ValidacaoResult extends ValidationResult {

    public ValidacaoResult(ValidationResult result) {
        this.setErrors(result.getErrors());
    }

    public ValidacaoResult() {

    }

    @Override
    @JsonProperty(value = "hasErrors")
    public boolean hasErrors() {
        return super.hasErrors();
    }

    @Override
    @JsonProperty("errors")
    public ArrayList<ItemValidationResult> getErrors() {
        return super.getErrors();
    }


}
