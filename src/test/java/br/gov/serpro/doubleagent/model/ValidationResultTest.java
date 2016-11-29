package br.gov.serpro.doubleagent.model;

import com.fitbur.testify.Cut;
import com.fitbur.testify.junit.UnitTest;
import org.assertj.core.api.JUnitSoftAssertions;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by 80129498572 on 29/11/16.
 */
@RunWith(UnitTest.class)
public class ValidationResultTest {
    @Rule
    public JUnitSoftAssertions softly = new JUnitSoftAssertions();

    @Cut
    public ValidationResult validationResult;

    public void itInitializesWithHasErrorEqualsFalse() {
        softly.assertThat(validationResult.hasErrors()).isFalse();
    }

    @Test
    public void buildValidationResultWithNonExpectedData(){

        Map<String, Map<String, Object>> resultData = new HashMap<String, Map<String, Object>>() ;

        Map<String, Object> resultItem = new HashMap<String, Object>();

        resultItem.put("bla", null);
        resultData.put("0", resultItem);

        ValidationResult result = ValidationResult.buildValidationResult(resultData);

        softly.assertThat(result.hasErrors()).isTrue();

        softly.assertThat(result.getErrors().size()).isEqualTo(1);
    }


}
