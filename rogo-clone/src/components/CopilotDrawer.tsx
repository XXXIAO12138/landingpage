'use client';

import { useHotkeys } from '@/lib/hooks/useHotkeys';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function CopilotDrawer() {
  const [open, setOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  // Toggle drawer with Ctrl+Shift+K
  useHotkeys(['ctrl+shift+k'], () => setOpen(o => !o));

  // Establish WebSocket connection once on mount
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_CHAT_WS;
    console.log('[CopilotDrawer] connecting to', wsUrl);
    const ws = new WebSocket(wsUrl!);
    wsRef.current = ws;

    ws.onopen = () => console.log('[CopilotDrawer] WebSocket open');
    ws.onmessage = e => {
      console.log('[CopilotDrawer] Received:', e.data);
      setMessages(prev => [...prev, e.data as string]);
    };
    ws.onerror = err => console.error('[CopilotDrawer] WebSocket error', err);
    ws.onclose = () => console.log('[CopilotDrawer] WebSocket closed');

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  // Send message helper
  const send = useCallback(() => {
    if (!input.trim()) return;
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('[CopilotDrawer] Sending:', input);
      ws.send(input);
      setMessages(prev => [...prev, 'You: ' + input]);
      setInput('');
    } else {
      console.warn('[CopilotDrawer] socket not open:', ws?.readyState);
    }
  }, [input]);

  if (!open) {
    return null;
  }

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl flex flex-col">
      <header className="p-4 font-semibold border-b flex justify-between">
        Copilot <button onClick={() => setOpen(false)}>×</button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="px-3 py-1 bg-slate-900 text-white rounded" onClick={send}>
          Send
        </button>
      </div>
    </aside>
  );
}
