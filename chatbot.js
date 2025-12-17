document.getElementById("send-btn").addEventListener("click", async () => {
    const inputEl = document.getElementById("user-input");
    const message = inputEl.value.trim();
    if (!message) return;
  
    addMessage("Bạn", message, "user");
    inputEl.value = "";
  
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
  
    const data = await res.json();
    addMessage("Bot", data.reply, "bot");
  });
  
  function addMessage(sender, text, type) {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<span class="${type}">${sender}:</span> ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  