package br.gov.serpro.doubleagent.vertx.routes;

import br.gov.serpro.doubleagent.JsonSchemaValidator;
import br.gov.serpro.doubleagent.model.ValidationResult;
import br.gov.serpro.doubleagent.vertx.models.ValidacaoResult;
import br.gov.serpro.doubleagent.vertx.services.json.JsonSerializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.vertx.core.Handler;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.RoutingContext;
import org.apache.commons.lang3.StringUtils;

/**
 * Created by 80129498572 on 07/11/16.
 */
public class ValidacaoHandler implements Handler<RoutingContext> {

    final static Logger logger = LoggerFactory.getLogger(ValidacaoHandler.class);

    JsonSchemaValidator jsonSchemaValidator;

    public ValidacaoHandler(JsonSchemaValidator jsonSchemaValidator) {
        this.jsonSchemaValidator = jsonSchemaValidator;
    }

    @Override
    public void handle(RoutingContext routingContext) {
        try {

            switch (routingContext.request().method()) {
                case GET:
                    handleGet(routingContext);
                    break;
                case POST:
                    handlePost(routingContext);
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            routingContext.fail(e);
        }
    }

    protected void handleGet(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("content-type", "text/javascript");
        logger.info("GET Called. Returning JsonSchemaValidator Script");
        routingContext.response().end(this.jsonSchemaValidator.getScriptFile());
    }



    protected void handlePost(RoutingContext routingContext) throws Exception{

        logger.info("POST called. Processing JsonSchema Validation");

        HttpServerResponse response = routingContext.response();
        response.putHeader("content-type", "application/json");

        String json= routingContext.getBodyAsString();
        String schema = routingContext.request().getParam("schema");

        if (StringUtils.isNotBlank(json) && StringUtils.isNotBlank(schema)){
            ValidationResult result = jsonSchemaValidator.validate(schema, json);
            String jsonResult = serialize(new ValidacaoResult(result));
            routingContext.response().setStatusCode(200).end(jsonResult);
        } else {
            throw new IllegalArgumentException("Missing either json body or schema name!");
        }
    }

    private String serialize(ValidacaoResult result) throws JsonProcessingException {
        return JsonSerializer.getInstance().mapper.writeValueAsString(result);
    }
}
