const expandTextarea = ((id) => {
  document.getElementById(id).addEventListener('keyup', function () {
    this.style.overflow = 'hidden';
    this.style.height = 0;
    this.style.height = this.scrollHeight + 'px';
  }, false);
})


const sendMessage = ((message) => {

  fetch("/chat/0", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  })
    .then(() => {
      document.querySelector("#message").value = "";
    })
    .catch((error) => console.log(error));

});

const fetchMessage = (() => {
  let message = ""
  document.querySelector("#message").addEventListener("keydown", (event) => {
    console.log(event);
    message = event.target.value
    if (event.keyCode === 13) {
      sendMessage(message)
    }

  });
  document.querySelector("#messageSend").addEventListener("click", (event) => {
    console.log(event);
    sendMessage(message)
  });

  const messages = document.querySelector("#messages");

  socket.on("chat:0", ({ sender, message, timestamp }) => {

    const template = document.querySelector("message");

    //document.querySelector("#debug").innerHTML += ` create,`;

    const container = document.createElement("div");
    //container.setAttribute("class", "chat-message-container");
    
    const user = document.createElement("div");
    user.setAttribute("class", "chat-message-user");
    //const time = document.createElement("div");
    //time.setAttribute("class", "chat-message-time");
    const text = document.createElement("div");
    text.setAttribute("class", "chat-message-text");

    //document.querySelector("#debug").innerHTML += ` create end,`;

    user.innerText = sender;
    //time.innerText = time();
    text.innerText = message;

    //document.querySelector("#debug").innerHTML += ` innerText end,`;

    container.appendChild(user);
    //container.appendChild(time);
    container.appendChild(text);

    //document.querySelector("#debug").innerHTML += ` appendChild end,`;
    
    messages.appendChild(container);

    //document.querySelector("#debug").innerHTML += ` created,`;
  });
});

fetchMessage()
expandTextarea('message');
