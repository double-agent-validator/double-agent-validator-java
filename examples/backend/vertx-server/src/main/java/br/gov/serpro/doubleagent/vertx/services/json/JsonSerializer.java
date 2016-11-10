package br.gov.serpro.doubleagent.vertx.services.json;


import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by 80129498572 on 07/11/16.
 */
public class JsonSerializer {

    private static final JsonSerializer INSTANCE = new JsonSerializer();

    public ObjectMapper mapper;

    private JsonSerializer() {
        mapper = new ObjectMapper();
    }

    public static JsonSerializer getInstance() {
        return INSTANCE;
    }
}
