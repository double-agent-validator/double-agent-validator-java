package br.gov.serpro.doubleagent;

import com.fitbur.testify.Cut;
import com.fitbur.testify.junit.UnitTest;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by abner.oliveira on 03/11/16.
 */
@RunWith(UnitTest.class)
public class JsonSchemaValidatorTest {

    @Cut
    JsonSchemaValidator cut;
    @Test
    public void testJoinList() {
        List<String> namespaces = new ArrayList<String>(
                Arrays.asList("PERDCOMP.JsonSchemaValidator", "PERDCOMP.JsonSchemaValidator.Common", "PERDCOMP.JsonSchemaValidator.Documento")
        );

        String result = StringUtils.join(namespaces, ",\n");

        assertThat(result).isEqualTo("PERDCOMP.JsonSchemaValidator,\n" +
                "PERDCOMP.JsonSchemaValidator.Common,\n" +
                "PERDCOMP.JsonSchemaValidator.Documento");
    }
}
