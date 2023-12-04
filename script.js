const questions = [
    {
        question: "Which is larget animal in the world ?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        answers: [
            { text: "Vatican", correct: false},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: true},
        ]
    },
    {
        question: "Which is the largest desert in the world ?",
        answers: [
            { text: "Kalahari", correct: true},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antartica", correct: false},
        ]
    },
];
// Criado um array com um objeto em cada índice, onde tera duas propriedades, a pergunta e um array representando as respostas
// dentro do array terá duas propriedades: uma resposta e um valor booleano representando verdadeiro ou falso

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// Selecionando os elementos do arquivo html

let currentQuestionIndex = 0;
let score = 0;
// Flag variaveis

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
// Função com os valores iniciais, chamando a função "showQuestion"

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 
// question é um array com objetos em cada índice, currentQuestion recebe o objeto de acordo com o indice
// questionNo ira receber o indice do array + 1;
// questionElement ira alterar o html adicionando o questionNo que será o número
// e currentQuestion.question que é a propriedade(pergunta) do objeto atual;

currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
// Função que ira criar no html as respostas, onde iremos acessar .answers que é um array
// Onde iremos percorrer os elementos com o forEach, criando então um button até percorrer todo o array.
// O If verificar se a propriedade é "true"
// Então adicionamos a propriedade correct ao objeto dataset
// dataset: É um objeto associado a elementos HTML que permite acessar e armazenar atributos de dados personalizados.
// Por fim adicionamos um EventListener para chamar a função para lidar com a resposta selecionada
startQuiz()

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    // Seleciona o elemento no qual o evento ocorreu no caso o button
    const isCorrect = selectedBtn.dataset.correct === "true";
    // Resposta escolhida pelo usuario
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        // Array.from obejto Array usando um método para transformar os elementos de answerButton em array para usar o forEach
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        // Muda a classe do botao se for o elemento correto
        }
        button.disabled = true;
        // impede que o usuario clique em outros elementos
    });
    nextButton.style.display = "block"
    // Mostra o botão next
}
// 

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
// Após realizar todo o questionario ira chamar a função de encerramento
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});