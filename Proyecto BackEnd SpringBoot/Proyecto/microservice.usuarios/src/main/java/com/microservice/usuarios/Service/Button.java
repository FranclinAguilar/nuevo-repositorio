package com.microservice.usuarios.Service;
// Button.java
public class Button {
    private int id;
    private String status; // Puede ser "available", "reserved", "unavailable"

    // Constructor
    public Button(int id, String status) {
        this.id = id;
        this.status = status;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
