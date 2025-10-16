package com.example;

public class Proposta {
    private String tipo;   // e.g., "PERSONAL"
    private String status; // e.g., "CREATED"

    public void setTipo(String t) { this.tipo = t; }
    public void setStatus(String s) { this.status = s; }
    public String getTipo() { return tipo; }
    public String getStatus() { return status; }

    public static void main(String[] args) {
        Proposta p = new Proposta();
        p.setTipo("SPACE_LOAN"); 
        p.setStatus("ON_MARS"); 
        System.out.println(p.getTipo() + " " + p.getStatus());
    }
}
