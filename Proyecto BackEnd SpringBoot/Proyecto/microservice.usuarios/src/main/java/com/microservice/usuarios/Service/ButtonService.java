package com.microservice.usuarios.Service;
// ButtonService.java
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ButtonService {

    private List<Button> buttons;
    private Map<String, WebSocketSession> sessions;

    public ButtonService() {
        // Inicializa botones con un estado predeterminado
        this.buttons = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            buttons.add(new Button(i, "available"));
        }
        this.sessions = new ConcurrentHashMap<>();
    }

    public List<Button> getButtons() {
        return buttons;
    }

    public Button getButtonById(int id) {
        return buttons.stream()
                .filter(button -> button.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public void updateButtonStatus(int id, String newStatus) {
        Button button = getButtonById(id);
        if (button != null) {
            button.setStatus(newStatus);
            notifyClients();
        }
    }

    private void notifyClients() {
        String updateMessage = buttons.toString(); // Convierte la lista a JSON si es necesario
        for (WebSocketSession session : sessions.values()) {
            try {
                session.sendMessage(new TextMessage(updateMessage));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void addSession(String sessionId, WebSocketSession session) {
        sessions.put(sessionId, session);
    }

    public void removeSession(String sessionId) {
        sessions.remove(sessionId);
    }
}
