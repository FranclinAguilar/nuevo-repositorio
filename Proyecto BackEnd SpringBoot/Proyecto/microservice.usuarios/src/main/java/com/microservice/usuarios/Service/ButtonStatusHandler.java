package com.microservice.usuarios.Service;
// ButtonStatusHandler.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ButtonStatusHandler extends TextWebSocketHandler {

    @Autowired
    private ButtonService buttonService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        buttonService.addSession(session.getId(), session);
        // Enviar el estado actual de los botones al nuevo cliente
        String initialMessage = buttonService.getButtons().toString(); // Convierte a JSON si es necesario
        session.sendMessage(new TextMessage(initialMessage));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        buttonService.removeSession(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Procesar el mensaje del cliente para actualizar el estado del botón
        String[] parts = message.getPayload().split(":");
        int buttonId = Integer.parseInt(parts[0]);
        String action = parts[1];

        switch (action) {
            case "reserve":
                buttonService.updateButtonStatus(buttonId, "reserved");
                break;
            case "cancel":
                buttonService.updateButtonStatus(buttonId, "available");
                break;
            // Puedes agregar más casos si es necesario
        }
    }
}
