// Aspetta che la pagina sia completamente caricata
document.addEventListener("DOMContentLoaded", function() {

    // Pulsante Login
    const loginBtn = document.querySelector(".btn-primary"); // Seleziona il bottone con classe "btn-primary"
    if (loginBtn) {
        loginBtn.addEventListener("click", function() {
            window.location.href = "/login"; // Reindirizza alla pagina di login
        });
    }

    // Pulsante Register
    const registerBtn = document.querySelector(".btn-secondary"); // Seleziona il bottone con classe "btn-secondary"
    if (registerBtn) {
        registerBtn.addEventListener("click", function() {
            window.location.href = "/register"; // Reindirizza alla pagina di registrazione
        });
    }

    // Debug: verifica che lo script sia caricato
    console.log("Script.js è stato caricato correttamente!");
});