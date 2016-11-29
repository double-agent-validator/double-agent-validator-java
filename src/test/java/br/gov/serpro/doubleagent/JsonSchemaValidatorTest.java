package br.gov.serpro.doubleagent;

import br.gov.serpro.doubleagent.model.ValidationResult;
import com.fitbur.testify.Cut;
import com.fitbur.testify.junit.UnitTest;
import org.assertj.core.api.JUnitSoftAssertions;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.InputStream;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by abner.oliveira on 03/11/16.
 */
@RunWith(UnitTest.class)
public class JsonSchemaValidatorTest {

    @Rule
    public JUnitSoftAssertions softly = new JUnitSoftAssertions();

    // Class Under Test
    @Cut
    JsonSchemaValidator cut;

    @Test
    public void testAddSchema() throws Exception {
        InputStream is = this.getClass().getResourceAsStream("/validators/js/pessoa.js");
        cut.loadSchemaData(is, "DoubleAgent.JsonSchemaValidator");

        ValidationResult result = cut.validate("pessoa-v1", "{name: 'John', age: 1}");

        assertThat(result.hasErrors()).isFalse();
    }

    @Test
    public void testLoadSchemasFromMultipleNamespaces() throws Exception {
        InputStream is = this.getClass().getResourceAsStream("/validators/js/rfb.js");
        cut.loadSchemaData(is, "RFB.JsonSchemaValidator", "RFB.JsonSchemaValidator.Common", "RFB.JsonSchemaValidator.Documento");

        ValidationResult result1 = cut.validate("tipoCredito-v1", "{ id: 1, descricao: \"some description\"}");
        ValidationResult result2 = cut.validate("tipoDeclaracao-v1", "{ id: 1, descricao: \"some description\"}");

        assertThat(result1.hasErrors()).isFalse();
        assertThat(result2.hasErrors()).isFalse();
    }

    @Test
    public void testValidationFailed() throws Exception {
        InputStream is = this.getClass().getResourceAsStream("/validators/js/rfb.js");
        cut.loadSchemaData(is, "RFB.JsonSchemaValidator", "RFB.JsonSchemaValidator.Common", "RFB.JsonSchemaValidator.Documento");

        ValidationResult result1 = cut.validate("tipoCredito-v1", "{ id: 1, descricao: null}");

        assertThat(result1.hasErrors()).isTrue();
    }

    @Test
    public void returnErrorsWhenValidationFails() throws Exception {
        InputStream is = this.getClass().getResourceAsStream("/validators/js/rfb.js");
        cut.loadSchemaData(is, "RFB.JsonSchemaValidator", "RFB.JsonSchemaValidator.Common", "RFB.JsonSchemaValidator.Documento");

        ValidationResult result1 = cut.validate("tipoCredito-v1", "{ id: 1, descricao: null}");

        softly.assertThat(result1.getErrors()).isNotNull();
        softly.assertThat(result1.getErrors().get(0).getMessage()).isEqualTo("should be string");
        softly.assertThat(result1.getErrors().get(0).getKeyword()).isEqualTo("type");
        softly.assertThat(result1.getErrors().get(0).getDataPath()).isEqualTo(".descricao");
        softly.assertThat(result1.getErrors().get(0).getSchemaPath()).isEqualTo("tipoCredito-v1/properties/descricao/type");
        softly.assertThat(result1.getErrors().get(0).getParams().get("type")).isEqualTo("string");
    }


    @Test
    public void getValidatorJavascript() throws Exception {
        InputStream is = this.getClass().getResourceAsStream("/validators/js/rfb.js");
        cut.loadSchemaData(is, "RFB.JsonSchemaValidator", "RFB.JsonSchemaValidator.Common", "RFB.JsonSchemaValidator.Documento");
        String validationScript = cut.getScriptFile();
        assertThat(validationScript.contains("contribuinte-v1")).isTrue();
    }


}

