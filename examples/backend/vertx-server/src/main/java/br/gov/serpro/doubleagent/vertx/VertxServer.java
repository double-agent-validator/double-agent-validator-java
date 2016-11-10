package br.gov.serpro.doubleagent.vertx;

import br.gov.serpro.doubleagent.JsonSchemaValidator;
import br.gov.serpro.doubleagent.vertx.routes.ValidacaoHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;


import javax.script.ScriptException;
import java.io.IOException;

public class VertxServer extends AbstractVerticle {

    private Router router;


    private static final HttpServerOptions SERVER_OPTIONS = new HttpServerOptions()
            .setPort(8080)
            .setHost("localhost");

    @Override
    public void start(Future<Void> future) throws Exception {

        super.start();

        router = Router.router(vertx);
        vertx.createHttpServer(SERVER_OPTIONS).requestHandler(router::accept).listen(
                result -> {
                    if (result.succeeded()) {
                        future.complete();
                    } else {
                        future.fail(result.cause());
                    }
                }
        );

        configureRoutes();
    }

    @Override
    public void stop() throws Exception {
        super.stop();
    }


    public static void main(String[] args) {

        DeploymentOptions options = new DeploymentOptions().setConfig(new JsonObject().put("http.port", SERVER_OPTIONS.getPort()));
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new VertxServer(), options);
    }

    public void configureRoutes() throws ScriptException, IOException {

        router.route().handler(BodyHandler.create());


        JsonSchemaValidator jsonSchemaValidator = new JsonSchemaValidator();
        jsonSchemaValidator.loadSchemaData(getClass().getResourceAsStream("/doubleagent/js/schemas.js"), "DoubleAgent.Example.JsonSchemaValidator");
        ValidacaoHandler validacaoHandler = new ValidacaoHandler(jsonSchemaValidator);
        router.route(HttpMethod.GET, "/validacao").handler(validacaoHandler);
        router.route(HttpMethod.POST, "/validacao").handler(validacaoHandler);
    }

}
