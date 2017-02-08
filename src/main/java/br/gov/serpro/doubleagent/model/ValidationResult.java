package br.gov.serpro.doubleagent.model;

import org.apache.commons.lang3.ArrayUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Created by abner.oliveira on 03/11/16.
 */

public class ValidationResult {
	private ArrayList<ItemValidationResult> errors = new ArrayList<ItemValidationResult>();

	private static final String[] OBJ_RESULT_PROPERTIES = { "keyword", "dataPath", "schemaPath", "params", "message" , "data"};

	private static final int KEYWORD_INDEX = 0;
	private static final int DATA_PAH_INDEX = 1;
	private static final int SCHEMA_PATH_INDEX = 2;
	private static final int PARAMS_INDEX = 3;
	private static final int MESSAGE_INDEX = 4;
    private static final int DATA_INDEX = 5;

	public ValidationResult() {

	}

	public boolean hasErrors() {
		return !this.errors.isEmpty();
	}

	public ArrayList<ItemValidationResult> getErrors() {
		return errors;
	}

	public void setErrors(Collection<ItemValidationResult> errors) {
		this.errors.clear();
		this.errors.addAll(errors);
	}

	public static ValidationResult buildValidationResult(Map<String, Map<String, Object>> resultData) {
		List<ItemValidationResult> results = new ArrayList<ItemValidationResult>();

		for (Object key : resultData.keySet()) {
			ItemValidationResult itemResult = new ItemValidationResult();
			Object resultMap = resultData.get(key);
			if (resultMap != null) {
				for (String propKey : resultData.get(key).keySet()) {
					switch (ArrayUtils.indexOf(OBJ_RESULT_PROPERTIES, propKey)) {
					case KEYWORD_INDEX:
						itemResult.setKeyword((String) resultData.get(key).get(propKey));
						break;
					case DATA_PAH_INDEX:
						itemResult.setDataPath((String) resultData.get(key).get(propKey));
						break;
					case SCHEMA_PATH_INDEX:
						itemResult.setSchemaPath((String) resultData.get(key).get(propKey));
						break;
					case PARAMS_INDEX:
						itemResult.setParams((Map<String, String>) resultData.get(key).get(propKey));
						break;
					case MESSAGE_INDEX:
						itemResult.setMessage((String) resultData.get(key).get(propKey));
						break;
                    case DATA_INDEX:
                            itemResult.setData((Map<String, String>) resultData.get(key).get(propKey));
                            break;
					default:
						break;
					}
				}
				results.add(itemResult);
			}

		}

		ValidationResult validationResult = new ValidationResult();
		validationResult.setErrors(results);
		return validationResult;
	}

}
