package controllers;

public class PropostaController {
    public int create() {
        // Sucesso no create deve retornar 201 segundo o OpenAPI
        return 201;
    }

    public int getById(String id) {
        // OK segundo o OpenAPI
        return 200;
    }
}
