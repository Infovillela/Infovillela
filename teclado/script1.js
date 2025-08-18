// script.js

const correctPasswords = ["*","bom dia","boa tarde","CoMparTiLhar"]; // Adicione suas senhas corretas aqui
const phrases = ["bom dia","boa tarde","CoMparTiLhar","*"];

function checkPassword() {
    var passwordInput = document.getElementById("password").value;

    if (correctPasswords.includes(passwordInput)) {
        updateText();
    }
}

function updateText() {
    var outputText = document.getElementById("outputText");
    var currentPasswordIndex = correctPasswords.indexOf(document.getElementById("password").value);

    if (currentPasswordIndex !== -1) {
        outputText.innerText = phrases[currentPasswordIndex];
    } else {
        outputText.innerText = "Bem-vindo!";
    }
}

function limparCampoInput() {
    var campoInput = document.getElementById("password"); // Substitua "id_do_seu_campo_input" pelo ID do seu campo de input
    campoInput.value = ""; // Define o valor do campo como uma string vazia
}




