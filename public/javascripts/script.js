const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data
    .map(
      (item) =>
        `<p style="margin-bottom: 0em;">${item.author}: ${item.message}</p><br style="display: block; margin-bottom: 0em;"><p style="margin-top:0em;"><small>${item.ts}</small></p>`
    )
    .join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const author = document.getElementById("author");
  const complete = { message: message.value, author: author.value };
  const json = JSON.stringify(complete);
  fetch("http://localhost:3000/chat/api/messages/", {method: "POST",body: json, headers: {"Content-Type":"application/json"}});
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
