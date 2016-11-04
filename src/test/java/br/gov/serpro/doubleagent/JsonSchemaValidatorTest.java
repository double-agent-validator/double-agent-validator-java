package br.gov.serpro.doubleagent;

import br.gov.serpro.doubleagent.model.ValidationResult;
import com.fitbur.testify.Cut;
import com.fitbur.testify.junit.UnitTest;
import org.apache.commons.lang3.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.script.ScriptException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by abner.oliveira on 03/11/16.
 */
@RunWith(UnitTest.class)
public class JsonSchemaValidatorTest {

    @Cut // Class Under Test
    JsonSchemaValidator cut;

    @Test
    public void testAddSchema() throws Exception {
        InputStreamReader is = new InputStreamReader(this.getClass().getResourceAsStream("/validators/js/pessoa.js"));
        cut.loadSchemaData(is, "DoubleAgent.JsonSchemaValidator");

        ValidationResult result = cut.validate("pessoa-v1", "{name: 'John', age: 1}");

        assertThat(result.hasErrors()).isFalse();
    }

    @Test
    public void testLoadSchemasFromMultipleNamespaces() throws Exception {
        InputStreamReader is = new InputStreamReader(this.getClass().getResourceAsStream("/validators/js/rfb.js"));
        cut.loadSchemaData(is, "RFB.JsonSchemaValidator", "RFB.JsonSchemaValidator.Common", "RFB.JsonSchemaValidator.Documento");

        ValidationResult result1 = cut.validate("tipoCredito-v1", "{ id: 1, descricao: \"some description\"}");
        ValidationResult result2 = cut.validate("tipoDeclaracao-v1", "{ id: 1, descricao: \"some description\"}");

        assertThat(result1.hasErrors()).isFalse();
        assertThat(result2.hasErrors()).isFalse();
    }

    @Test
    @Ignore
    public void getValidatorJavascript() {
    }


}
