// script.js

function openPopup(imageSrc) {
    window.open(imageSrc, 'Image Popup');
}

function checkPassword() {
    var userInput = document.getElementById("password").value;
    var titleText = document.querySelector("h1").innerText;

    if (userInput === titleText) {
        window.location.href = "index.html";  // Substitua 'outra_pagina.html' pelo nome da sua outra página
    } else {
        document.getElementById("errorMessage").innerText = "Senha incorreta! Tente novamente.";
    }
}

document.getElementById("password").addEventListener("input", function() {
    this.value = this.value.toUpperCase();
});

function copyCode() {
    var codeContent = document.getElementById("codeContent");
    var range = document.createRange();
    range.selectNode(codeContent);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    alert("Código copiado para a área de transferência!");
}