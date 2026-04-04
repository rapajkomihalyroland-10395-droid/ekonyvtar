import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import api from "../../../../axios_url/baseURL.js";

const UserDetailsMessagesTab = ({ email }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    setStatus(null);

    try {
      await api.post("/send-mail", {
        email,
        message,
      });

      setStatus({ type: "success", text: "Az üzenet sikeresen elküldve!" });
      setMessage("");
    } catch (error) {
      console.error("Hiba az üzenet küldésekor:", error);
      setStatus({
        type: "error",
        text:
          "Hiba történt az üzenet küldésekor: " +
          (error.response?.data?.message || error.message),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSending}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-4 disabled:opacity-50 text-foreground placeholder:text-muted-foreground"
          placeholder="Írja be az üzenetét..."
        />

        {status && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              status.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {status.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={isSending || !message.trim()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSending ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Send size={16} className="mr-2" />
            )}
            {isSending ? "Küldés..." : "Küldés"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsMessagesTab;
