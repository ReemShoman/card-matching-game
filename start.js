document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startGame");

  startButton.addEventListener("click", () => {
    const nameInput = document.getElementById("username");
    const name = nameInput.value.trim();

    if (name) {
      localStorage.setItem("playerName", name);
      window.location.href = "level.html";
    } else {
      alert("Please enter your name!");
    }
  });
});