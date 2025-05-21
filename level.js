document.addEventListener("DOMContentLoaded", () => {
  const levelCards = document.querySelectorAll(".level-card");
  const startButton = document.getElementById("startGame");
  let selectedLevel = null;

  levelCards.forEach(card => {
    card.addEventListener("click", () => {
      levelCards.forEach(c => c.classList.remove("border-primary"));
      card.classList.add("border", "border-primary");

      selectedLevel = card.getAttribute("data-level");

      startButton.disabled = false;
    });
  });

  startButton.addEventListener("click", () => {
    
    localStorage.setItem("gameLevel", selectedLevel);
    window.location.href = "cards.html";
  });
});
