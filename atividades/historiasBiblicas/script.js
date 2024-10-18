// script.js

function checkWords() {
    var nome1 = document.getElementById("nome1").value.toLowerCase();
    var nome2 = document.getElementById("nome2").value.toLowerCase();
    var nome3 = document.getElementById("nome3").value.toLowerCase();
    var nome4 = document.getElementById("nome4").value.toLowerCase();
    var nome5 = document.getElementById("nome5").value.toLowerCase();
    var nome6 = document.getElementById("nome6").value.toLowerCase();
    var nome7 = document.getElementById("nome7").value.toLowerCase();
    var nome8 = document.getElementById("nome8").value.toLowerCase();

    if (nome1 === "eva" && nome2 === "adão" && nome3 === "terra" && nome4 === "plantas" && nome5 === "sol" && nome6 === "lua"  && nome7 === "estrela"  && nome8 === "animais") {
        window.location.href = "p3.html"; // Substitua 'outra_pagina.html' pelo nome da sua próxima página
    } else {
        alert("Palavras incorretas! Tente novamente.");
    }
}

// script.js

