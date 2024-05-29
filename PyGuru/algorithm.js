const quizData = [
    {
        question: 'Algoritma yazıldıktan sonra, sonuçları daha önceden bilinen veriler girilerek, eldeki sonuçlarla çıkan sonuçlar karşılaştırıldığı aşama ...... dır?',
        options: [
          'Problem',
          'Çözümü Geliştrme',
          'Algoritma',
          'Güvenirlik',
        ],
        answer: 'Çözümü Geliştirme',
    },
    {
        question: 'Akış şeması,bir problem çözme yöntemidir.',
        options: [
          'Doğru',
          'Yanlış',
        ],
        answer: 'Doğru',
    },
    {
        question: "A1 :sayac = 0 <br> A2:a değerini gir.<br> A3: Eğer a < 0 A2'ye git.<br> A4 :toplam = toplam + a <br> A5 :..................... <br> A6: Toplam değerini yaz.<br> A7:Bitir. <br> Yukardaki algoritmanın klavyeden girilen 5 adet pozitif sayının toplamını ekrana yazdırması için boş bırakılan satıra aşağıdaki seçeneklerden hangisi yazılmalıdır.",
        options: [
          "Eğer sayaç < 6 A2'ye ",
          "Eğer sayaç < 5 A2' ye git",
          "Eğer sayaç < 5 A4'e git",
          "Eğer sayaç > 5 A4' e git",
        ],
        answer: "Eğer sayaç < 5 A2' ye git",
    },
    {
        question: 'Aşağıdakilerden hangisi bir problemi çözmek için yapılması gereken ilk aşamadır?',
        options: [
          "Problemin çözümünü gösteren bir liste hazırlamak",
          "Problemde kullanılacak değişkenleri belirlemek.",
          "Problemin çözümünü gösteren bir akış şeması hazırlamak",
          "Problemin ne olduğunu doğru bir şekilde anlamak."
        ],
        answer: 'Problemin ne olduğunu doğru bir şekilde anlamak.',
    }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Puanınız ${score} <> ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    
    localStorage.setItem('algoritmalar', 'green');
    localStorage.setItem('algoritmalarText', 'Tamamlandı');
    displayQuestion();

}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
        <strong>Soru</strong> ${incorrectAnswers[i].question}<br>
        <strong>Sizin Cevabınız :</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Doğru Cevap:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Puanınız : ${score} <> ${quizData.length}!</p>
    <p>Yanlış Cevaplarınız :</p>
    ${incorrectAnswersHtml}
  `;
  localStorage.setItem('algoritmalar', 'green');
  localStorage.setItem('algoritmalarText', 'Tamamlandı');
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
