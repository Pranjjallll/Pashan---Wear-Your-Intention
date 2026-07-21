import { ExternalLink, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "447767956428";
const DISPLAY_NUMBER = "07767 956428";

type ChatMessage = {
  id: number;
  sender: "concierge" | "visitor";
  text: string;
};

const QUICK_REPLIES = [
  "Help me choose a stone",
  "Customise a bracelet",
  "Ask about my order",
] as const;

const REPLIES: Record<(typeof QUICK_REPLIES)[number], string> = {
  "Help me choose a stone":
    "Tell us the quality you want to carry - courage, calm, focus, prosperity, growth, balance, or resilience. I can point you to a stone.",
  "Customise a bracelet":
    "You can build bead by bead or begin with Prem Sutra, Shanti Dhara, Shakti Path, or Nayi Disha. Our team can help refine your choices on WhatsApp.",
  "Ask about my order":
    "Of course. Use the Track your order page, or continue on WhatsApp with your order name or reference and our team will help check it.",
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: "concierge",
    text: "Namaste. Welcome to Pashan support. How can we help with your bracelet today?",
  },
];

export function WhatsAppConcierge() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastVisitorMessage =
    [...messages].reverse().find((message) => message.sender === "visitor")
      ?.text ?? "I would like help choosing a Pashan bracelet.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Namaste Pashan, I was using the website support chat. ${lastVisitorMessage}`,
  )}`;

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing, open]);

  useEffect(
    () => () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    },
    [],
  );

  const addMessage = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || typing) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "visitor", text: cleanText },
    ]);
    setDraft("");
    setTyping(true);

    replyTimer.current = setTimeout(() => {
      const guidedReply = REPLIES[cleanText as keyof typeof REPLIES];
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: "concierge",
          text:
            guidedReply ??
            "Thank you. Your message is ready so our team can continue with you securely on WhatsApp.",
        },
      ]);
      setTyping(false);
    }, 650);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMessage(draft);
  };

  return (
    <aside className={`concierge-shell ${open ? "is-open" : ""}`}>
      {open && (
        <section
          className="concierge-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Pashan WhatsApp support"
        >
          <header className="concierge-head">
            <div className="concierge-avatar" aria-hidden>
              <Sparkles size={17} />
            </div>
            <div>
              <strong>Pashan Support</strong>
              <span>Friendly help / Continue on WhatsApp</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close support chat"
            >
              <X size={19} aria-hidden />
            </button>
          </header>

          <div className="concierge-messages" aria-live="polite">
            <div className="concierge-timestamp">Today</div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`concierge-message is-${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            {typing && (
              <div className="concierge-message is-concierge is-typing">
                <i />
                <i />
                <i />
                <span className="sr-only">Support is typing</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="concierge-quick-replies">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => addMessage(reply)}
                disabled={typing}
              >
                {reply}
              </button>
            ))}
          </div>

          <form className="concierge-compose" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message"
              aria-label="Message for Pashan support"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
              <Send size={17} aria-hidden />
            </button>
          </form>

          <a
            className="concierge-whatsapp-link"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} aria-hidden />
            Continue on WhatsApp
            <ExternalLink size={14} aria-hidden />
          </a>
          <p className="concierge-number">WhatsApp: {DISPLAY_NUMBER}</p>
        </section>
      )}

      <button
        type="button"
        className="concierge-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close Pashan chat" : "Chat with Pashan"}
      >
        {open ? (
          <X size={20} aria-hidden />
        ) : (
          <MessageCircle size={20} aria-hidden />
        )}
        <span>{open ? "Close" : "Chat with Pashan"}</span>
        {!open && <i aria-hidden>1</i>}
      </button>
    </aside>
  );
}
