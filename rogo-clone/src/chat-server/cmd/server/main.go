package main

import (
    "log"
    "net/http"

    "landingpage/chat-server/internal/chat"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/ws", chat.HandleWS)   // WebSocket endpoint
    mux.HandleFunc("/keys", chat.HandleKeys) // Row-key JSON list

    log.Println("chat-server listening on :8080 …")
    if err := http.ListenAndServe(":8080", mux); err != nil {
        log.Fatal(err)
    }
}
