package chat

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "time"

    "landingpage/chat-server/internal/llm"
    "landingpage/chat-server/internal/storage"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{CheckOrigin: func(*http.Request) bool { return true }}

func HandleWS(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer conn.Close()

    sessionID := time.Now().UnixNano()
    ctx := context.Background()

    for {
        // 1. Read incoming message
        _, msg, err := conn.ReadMessage()
        if err != nil {
            log.Printf("[chat] read error: %v\n", err)
            break
        }
        prompt := string(msg)
        log.Printf("[chat] Received prompt: %q\n", prompt)
        storage.Put(ctx, sessionID, "user", prompt)

        // 2. Stream LLM response
        chunks := llm.Stream(ctx, prompt)
        sentAny := false
        for chunk := range chunks {
            sentAny = true
            log.Printf("[chat] Sending chunk: %q\n", chunk)
            if err := conn.WriteMessage(websocket.TextMessage, []byte(chunk)); err != nil {
                log.Printf("[chat] WriteMessage error: %v\n", err)
                break
            }
            storage.Put(ctx, sessionID, "assistant", chunk)
        }

        // 3. Fallback if no chunks were sent
        if !sentAny {
            fallback := "Sorry, no response from Gemini."
            log.Println("[chat] fallback response:", fallback)
            conn.WriteMessage(websocket.TextMessage, []byte(fallback))
        }
    }
}

func HandleKeys(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    keys, err := storage.ScanKeys(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(keys)
}
