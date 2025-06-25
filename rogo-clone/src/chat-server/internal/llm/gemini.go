package llm

import (
    "context"
    "os"

    "google.golang.org/genai"
)

// Stream returns a channel streaming text chunks from Gemini.
func Stream(ctx context.Context, prompt string) <-chan string {
    out := make(chan string)
    go func() {
        defer close(out)

        apiKey := os.Getenv("API_KEY")
        if apiKey == "" {
            out <- "⚠️ Gemini API_KEY not configured – returning stub response"
            return
        }

        // Initialize the Gemini API client
        cfg := &genai.ClientConfig{
            APIKey:  apiKey,
            Backend: genai.BackendGeminiAPI,
        }
        client, err := genai.NewClient(ctx, cfg)
        if err != nil {
            out <- "[genai] init error: " + err.Error()
            return
        }

        // Generate full content response from the specified model
        resp, err := client.Models.GenerateContent(
            ctx,
            "gemini-2.5-flash",    
            genai.Text(prompt),
            nil,                   
        )
        if err != nil {
            out <- "[genai] error: " + err.Error()
            return
        }
        // Send the entire response text as a single chunk
        out <- resp.Text()
    }()
    return out
}
