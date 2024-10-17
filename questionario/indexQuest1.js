var myQuestions = [
	{
		
		question: "1- Oque podemos fazer com o computador?",
		answers: {
			a: ' Manter registros, analisar dados, fazer pesquisas e gerenciar projetos, jogar, conhecer pessoas, estudar entre outras tarefas.<br>',
			b: ' Apenas para acessar a internet.<br>',
			
			c: ' Para jogar, acessar a internet, viver na natureza.<br>',
			d: ' Somente algumas coisas.'
		},
		correctAnswer: 'a'
	},
	{
		question: "2- Oque é Hardware?",
		answers: {
			a: ' São os programas que dão vida ao computador<br>',
			b: ' Conjunto formado por circuitos eletrônicos e partes eletromecânicas<br>',
			c: ' É o nome do sistema operacional windows 7<br>',
			d: ' Conjunto de partes coordenadas que concorrem para a realização de um determinado objetivo.<br>'
		},
		correctAnswer: 'b'
	},
	{
		question: "3- Oque é Software?",
		answers: {
			a: ' Pessoas que constroem ou utiliza sistema computacional<br>',
			b: ' É responsável por levar energia para as placas e circuitos de dentro do computador<br>',
			c: ' Programas que dão vida ao computador .Faz com que o hardware possa gerar informação<br>',
			d: ' Conjunto formado por circuitos eletrônicos e partes eletromecânicas<br>'
		},
		correctAnswer: 'c'
	},
	{
		question: "4- Selecione respectivamente um Hardware e Software",
		answers: {
			a: ' Monitor e Mouse<br>',
			b: ' Impressora e Gabinete<br>',
			c: ' Windows 7 e Placa Mãe<br>',
			d: ' Teclado e Word 2010<br>'
		},
		correctAnswer: 'd'
	},
	{
		question: "5- Quais desses são dispositivos internos?",
		answers: {
			a: ' Caixa de Som, Teclado e Mouse<br>',
			b: ' Placa Mãe, Memória e Monitor<br>',
			c: ' HD, Placa Mãe e Fonte<br>',
			d: ' Fonte, Scanner e Pen Drive<br>'
		},
		correctAnswer: 'c'
	},
	{
		question: "6- Quais desses dispositivos são Externos?",
		answers: {
			a: 'Gabinte, pen drive e Cd-Rom<br>',
			b: 'Caixa de Som, teclado e mouse<br>',
			c: 'Placa Mãe, memória e monitor<br>',
			d: 'hd, Placa Mãe e fonte<br>'
		},
		correctAnswer: 'b'
	},
	{
		question: "7- Selecione respectivamente dois dispositivos de entrada e um de saida.",
		answers: {
			a: ' Windows-word-memória<br>',
			b: ' Mouse-monitor-pen drive<br>',
			c: ' Impressora-mouse-monitor<br>',
			d: ' Teclado-mouse-impressora<br>'
		},
		correctAnswer: 'd'
	},
	{
		question: "8- Oque são periféricos?",
		answers: {
			a: ' Dispositivos externos que não são necessários para ligar o computador<br>',
			b: ' Dispositivos necessários para liar o computador<br>',
			c: ' São os programas que dão vida ao computador<br>',
			d: ' Dispositivos internos não são necessários para ligar o computador<br>'
		},
		correctAnswer: 'a'
	},
	{
		question: "9- Quais desses dispositivos são periféricos?",
		answers: {
			a: 'Impressora-hd-mouse<br>',
			b: 'Monitor-teclado-mouse<br>',
			c: 'Pen Drive-Impressora-Fone de Ouvido<br>',
			d: 'Monitor-gabinete-placa mãe<br>'
		},
		correctAnswer: 'c'
	},
	{
		question: "10- Oque são conexões?",
		answers: {
			a: 'qualquer dispositivo conectado ao computador<br>',
			b: 'são todos os dispositivos de saida<br>',
			c: 'são todos os dispoditivos de entrada<br>',
			d: 'são as portas de entrada dos periféricos<br>'
		},
		correctAnswer: 'd'
	},
	{
		question: "11-Oque é um sistema operacinal?",
		answers: {
			a: ' Dispositivos que armazenam os dados com os quais o processador trabalha<br>',
			b: ' É um programa que gerencia todos os sistemas internos (hardware) do computador.<br>',
			c: ' É uma maquina constituída por uma séria de componentes e circuitos eletrônicos<br>',
			d: ' São circuitos integrados passiveis de ser programados para executar uma tarefa predefinida<br>'
		},
		correctAnswer: 'b'
	},
	{
		question: "12- Quais destes são exemplos de Sistemas Operacionais?",
		answers: {
			a: ' Word-Excel-PowerPoint-Notepad<br>',
			b: ' Photoshop-Gimp-Android<br>',
			c: ' Android-Mac-Linux<br>',
			d: ' Windows-Linux-Office<br>'
		},
		correctAnswer: 'c'
	},
	{
		question: "13- Oque são aplicativos?",
		answers: {
			a: ' São programas utilizados na automação das rotinas comerciais, industriais e cientificas<br>',
			b: ' Conjunto de partes coordenadas que concorrem para a realização de um determinado objetivo.<br>',
			c: ' É toda parte lógica do computador<br>',
			d: ' Parte física, visivel do sistema computacional<br>'
		},
		correctAnswer: 'a'
	},
	{
		question: "14- Quais destes são exemplos de aplicativos?",
		answers: {
			a: ' Word-Excel-PowerPoint<br>',
			b: ' Linux-PowerPoint-Windows<br>',
			c: ' Windows-Paint-Bloco de Notas<br>',
			d: ' Word-Android-PowerPoint<br>'
		},
		correctAnswer: 'a'
	},
	
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// precisaremos de um lugar para armazenar a saída e as opções de resposta
		var output = [];
		var answers; // poderia ter dado outro nome, alem do mais, eu mesmo me confundi :/

		// para cada questão
		for(var i=0; i<questions.length; i++){
			
			// mas, primeiro resetamos a lista de questões
			answers = [];

			// e aqui faremos para cada resposta na questão.
			for(letter in questions[i].answers){

				// Aqui será escrito para html para usar o Radio.
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					//	+ letter + ') ' vou deixar a letra comentada, porque achei melhor assim
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
			
		
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		
		var userAnswer = '';
		var numCorrect = 0;
		
		
		for(var i=0; i<questions.length; i++){

			// agora ele vai virar a letra que esta marcada.
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			
			
			if(userAnswer===questions[i].correctAnswer){
				
				numCorrect++;
				
				
				answerContainers[i].style.color = 'lightgreen';
			}
			
			else{
				
				answerContainers[i].style.color = 'red';
			}
		}

			
			resultsContainer.innerHTML = numCorrect + ' de ' + questions.length;
		}

	// show questions right away
	showQuestions(questions, quizContainer);

	// on submit, show results
	
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
		
	}
	
}
