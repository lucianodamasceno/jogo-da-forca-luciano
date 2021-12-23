$(document).ready(function () {
	startGame();
});

import data from "../data/dados.js";

let shortPalavra;
let acertos;
let erros;

function startGame() {
	acertos = 0;
	erros = 0;
	shortPalavra = "";
	acertos = 0;
	erros = 0;
	$(".div-letra").remove();
	let divsMan = document.getElementsByClassName("man");
	let divsButton = document.querySelectorAll(".button-letra");
	for (let index = 0; index < divsMan.length; index++) {
		divsMan[index].classList.add("hide");
	}
	for (let index = 0; index < divsButton.length; index++) {
		$(divsButton[index]).removeClass("errorLetra acertLetra");
	}
	let getClasse = Object.keys(data)[Math.round(Math.random())];
	let getPalavra = data[getClasse][Math.round(Math.random() * data[getClasse].length)];

	$("#span-dica").text(getClasse);
	setPalavra(getPalavra);
}

function setPalavra(palavra) {
	let arrayLetras = palavra.split("");
	shortPalavra = arrayLetras;
	let div_palavra = document.getElementById("div-palavra");
	arrayLetras.map(function (char, index) {
		let div_letra = document.createElement("div");
		div_letra.className = "div-letra";

		let letraDigitada = document.createElement("label");
		letraDigitada.className = "letra hide";
		letraDigitada.innerHTML = char;
		letraDigitada.setAttribute("id", char);

		let line_letra = document.createElement("label");
		line_letra.className = "line-letra";

		div_letra.append(letraDigitada);
		div_letra.append(line_letra);
		div_palavra.appendChild(div_letra);
	});
}

function checkLetra(letra) {
	let statusLetra = true;
	let validChar = [];
	shortPalavra.map(function (char, index) {
		if (letra === char) {
			acertos++;
			validChar.push(index);
			let a = document.getElementsByClassName("letra");
			a[index].classList.remove("hide");
		}
	});
	if (validChar.length === 0) {
		statusLetra = false;
		document.getElementsByClassName("man")[erros].classList.remove("hide");
		erros++;
	}
	return statusLetra;
}

function checkPontos() {
	if (acertos === shortPalavra.length) {
		alert("GANHOU !!! PARABENS");
		startGame();
	}
	if (erros === 6) {
		let palavraRecebida = "";
		shortPalavra.map(function (char) {
			palavraRecebida += char;
		});
		alert("PERDEU :(\nEra " + palavraRecebida);
		startGame();
	}
}

$(".button-letra").click(function (e) {
	let letra = $(this).text();
	if (this.classList.length === 1) {
		let statusLetra = checkLetra(letra.toLowerCase());
		if (statusLetra) {
			this.classList.add("acertLetra");
			checkPontos();
		} else {
			this.classList.add("errorLetra");
			checkPontos();
		}
	}
});
