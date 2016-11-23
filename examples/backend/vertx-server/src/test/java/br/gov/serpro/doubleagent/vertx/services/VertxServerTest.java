package br.gov.serpro.doubleagent.vertx.services;

import br.gov.serpro.doubleagent.JsonSchemaValidator;
import br.gov.serpro.doubleagent.vertx.VertxServer;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.unit.TestContext;
import org.junit.*;
import org.junit.runner.RunWith;
import io.vertx.ext.unit.junit.RunTestOnContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;

import javax.script.ScriptException;
import java.io.IOException;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.not;


@RunWith(VertxUnitRunner.class)
public class VertxServerTest {

    private Vertx vertx;
    static JsonSchemaValidator jsonSchemaValidator;
    @Rule
    public RunTestOnContext rule = new RunTestOnContext(new VertxOptions().setMaxEventLoopExecuteTime(Long.MAX_VALUE));


    @BeforeClass
    public static void configureRestAssured() throws ScriptException, IOException {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = Integer.getInteger("http.port", 8081);

        jsonSchemaValidator = new JsonSchemaValidator();
        jsonSchemaValidator.loadSchemaData(VertxServer.class.getResourceAsStream("/doubleagent/js/schemas.js"), "DoubleAgent.Example.JsonSchemaValidator");
    }

    @AfterClass
    public static void unconfigureRestAssured() {
        RestAssured.reset();
    }

    @Before
    public void setUp(TestContext context) {

        vertx = rule.vertx();

        DeploymentOptions options = new DeploymentOptions().setConfig(new JsonObject().put("http.port", 8081));
        vertx.deployVerticle(new VertxServer(jsonSchemaValidator), options, context.asyncAssertSuccess());
    }

    @After
    public void tearDown(TestContext context) {
        vertx.close(context.asyncAssertSuccess());
    }

    @Test
    public void obterScriptValidacao() {
        get("/validacao").then()
                .assertThat()
                .statusCode(200)
                .contentType("text/javascript");
    }

    @Test
    public void validarObjeto() {


        JsonObject json = new JsonObject()
                .put("id", 2)
                .put("ni", "00000000000191")
                .put("nacionalidade", "brasileiro")
                .put("nome", "BBC");


        Response response =  given().body(json.toString())
                .when()
                .post("/validacao?schema=contribuinte-v1")
                .then()
                .assertThat()
                .statusCode(200)
                .body("hasErrors", equalTo(false))
                .extract().response();

        System.out.println("RESPONSE [validarObjeto] " + response.body().asString());

    }

}
