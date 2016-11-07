package br.gov.serpro.doubleagent.model;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by abner.oliveira on 03/11/16.
 */

public class ValidationResult {
    private ArrayList<ItemValidationResult> errors = new ArrayList<ItemValidationResult>();

    public ValidationResult() {

    }

    public boolean hasErrors() {
        return ! this.errors.isEmpty();
    }


    public ArrayList<ItemValidationResult> getErrors() {
        return errors;
    }

    public void setErrors(Collection<ItemValidationResult> errors) {
        this.errors.clear();
        this.errors.addAll(errors);
    }


}

