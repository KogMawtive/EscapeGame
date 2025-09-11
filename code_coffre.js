document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.getElementById("code");
  const computer = document.getElementById("computer");

  // Choisis ton code secret ici
  const secretCode = "Project";

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // empêche le rechargement de la page
    const userCode = input.value.trim();

    if (userCode === secretCode) {
      // Succès
      const successMsg = document.createElement("p");
      successMsg.textContent = "✅ code bon, transfert stoppé !";
      successMsg.style.color = "lime";
      successMsg.style.fontWeight = "bold";
      computer.appendChild(successMsg);
    } else {
      // Échec
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "❌ Code incorrect, réessaie. (indice : code binaire) ";
      errorMsg.style.color = "red";
      computer.appendChild(errorMsg);
    }
  });
});
