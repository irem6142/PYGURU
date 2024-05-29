const quizData = [
  {
    question: "Python'da kullanılan veri tiplerinden biri aşağıdakilerden hangisidir?",
    options: ["Integer", "Boolean", "Both"],
    answer: "Both",
    category: "Veri Tipleri"
  },
  {
    question: "Bir listenin elemanlarına ulaşmak için kullanılan ifade hangisidir?",
    options: ["()", "[]", "{}"],
    answer: "[]",
    category: "Veri Tipleri"
  },
  {
    question: "Python'da koşullu ifadeler hangi anahtar kelimelerle başlar?",
    options: ["switch-case", "if-else", "for-in"],
    answer: "if-else",
    category: "Koşullu İfadeler"
  },
  {
    question: "Python'da bir liste elemanını belirlemek için hangi işaret kullanılır?",
    options: ["()", "{}", "[]"],
    answer: "[]",
    category: "Veri Tipleri"
  },
  {
    question: "Python'da hangi işaret bir satır yorumu oluşturur?",
    options: ["//", "#", "--"],
    answer: "#",
    category: "Veri Tipleri"
  },
  {
    question: "Python'da 'if-else' yapısında else kısmının çalışması için ne gerekir?",
    options: ["if koşulunun doğru olması", "if koşulunun yanlış olması", "koşul olmadan çalışır"],
    answer: "if koşulunun yanlış olması",
    category: "Koşullu İfadeler"
  },
  {
    question: "Python'da bir liste elemanı eklemek için hangi metot kullanılır?",
    options: ["add()", "insert()", "append()"],
    answer: "append()",
    category: "Veri Tipleri"
  },
  {
    question: "Python'da bir sayıyı tam bölenlerini bulmak için kullanılan işlem hangisidir?",
    options: ["divisors()", "factors()", "None of the above"],
    answer: "None of the above",
    category: "Math"
  },
  {
    question: "Python'da bir liste elemanını kaldırmak için hangi metot kullanılır?",
    options: ["delete()", "remove()", "discard()"],
    answer: "remove()",
    category: "Veri Tipleri"
  },
  {
    question: "Python'da bir string'i parçalara ayırmak için hangi metot kullanılır?",
    options: ["split()", "parse()", "divide()"],
    answer: "split()",
    category: "Veri Tipleri"
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
let incorrectCategories = {};

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
    const questionData = quizData[currentQuestion];
    if (answer === questionData.answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: questionData.question,
        incorrectAnswer: answer,
        correctAnswer: questionData.answer,
        category: questionData.category
      });

      if (incorrectCategories[questionData.category]) {
        incorrectCategories[questionData.category]++;
      } else {
        incorrectCategories[questionData.category] = 1;
      }
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
  resultContainer.innerHTML = `Puanınız ${score} / ${quizData.length}!`;

  // Determine the category with the most incorrect answers
  let maxIncorrect = 0;
  let suggestionCategory = '';
  for (const category in incorrectCategories) {
    if (incorrectCategories[category] > maxIncorrect) {
      maxIncorrect = incorrectCategories[category];
      suggestionCategory = category;
    }
  }

  if (suggestionCategory) {
    alert(`Daha fazla çalışmanız gereken konu: ${suggestionCategory}`);
  }
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  incorrectCategories = {};
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';

  
  localStorage.setItem('kendiniTestEt', 'green');
  localStorage.setItem('kendiniTestEtText', 'Tamamlandı');

  
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
    <p>Puanınız : ${score} / ${quizData.length}!</p>
    <p>Yanlış Cevaplarınız :</p>
    ${incorrectAnswersHtml}
  `;
  localStorage.setItem('kendiniTestEt', 'green');
  localStorage.setItem('kendiniTestEtText', 'Tamamlandı');
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
