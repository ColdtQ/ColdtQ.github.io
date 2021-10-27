const btn = document.getElementById("sendBtn");
btn.addEventListener("click", sendBots);

function sendBots() {
  const code = document.getElementById("code")?.value;
  const amount = document.getElementById("amount")?.value;
  const botName = document.getElementById("name")?.value;

  if (isNaN(code)) {
    return alert(`The game code must be a number`);
  } else if (isNaN(amount)) {
    return alert(`The amount of bots must be a number`);
  }

  if (!code) {
    return alert(`Please specify the game code.`);
  } else if (!amount) {
    return alert(`Please specify the amount of bots`);
  } else if (!botName) {
    return alert(`Please specify the bot name.`);
  }

  const body = { code, amount, name: botName };
  const headers = {
    "Content-Type": "application/json",
  };

  fetch("http://137.184.219.148:3000/send_bots", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
