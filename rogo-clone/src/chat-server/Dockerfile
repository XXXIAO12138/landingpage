FROM golang:1.23 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o chat-server ./cmd/server

FROM gcr.io/distroless/static
WORKDIR /
COPY --from=builder /app/chat-server /chat-server

ENV BIGTABLE_PROJECT=""
ENV BIGTABLE_INSTANCE=""
ENTRYPOINT ["/chat-server"]