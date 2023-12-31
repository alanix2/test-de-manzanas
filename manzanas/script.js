let empezarButton = document.querySelector('.empezar'); 
let containerDiv = document.querySelector('.container');
let h2Element = document.querySelector('#hero h2');


// esto es para que el botón de empezar funcione y se muestre el quiz
empezarButton.addEventListener('click', function() {
    containerDiv.style.opacity = '1';
    h2Element.style.display = 'none';
    empezarButton.style.display = 'none';
});

// las preguntas y respuestas
const quizData = [
    {
      question: '¿Cuál es el nombre científico de la manzana comúnmente consumida?',
      options: ['Malus domestica', 'Malus silvestris', 'Pyrus domestica', 'Prunus persica'],
      answer: 'Malus domestica',
    },
    {
      question: ' ¿En qué temporada del año las manzanas suelen estar en su punto máximo de frescura y sabor?',
      options: ['Primavera', 'Verano', 'Otoño', ' Invierno'],
      answer: 'Otoño',
    },
    {
      question: '¿Cuántas calorías aproximadamente tiene una manzana de tamaño mediano?',
      options: ['50 calorías', '75 calorías', '95 calorías', '100 calorías'],
      answer: '95 calorías',
    },
    {
      question: '¿Cuál es el país líder en la producción mundial de manzanas?',
      options: ['China', 'Estados Unidos', 'India', 'Brasil'],
      answer: 'China',
    },
    {
      question: '¿Cuántas variedades de manzanas se estima que existen en todo el mundo?',
      options: ['Más de 7,500','Más de 2,000','Más de 5,000','Más de 10,000',],
      answer: 'Más de 7,500',
    },
    {
      question: '¿Qué nutriente importante para la salud ocurre en cantidades significativas en la piel de la manzana?',
      options: ['Fibra', 'Vitamina C', 'Calcio', 'Hierro'],
      answer: 'Fibra',
    },
    {
      question: '¿Cuál es el nombre de la famosa variedad de manzana con tonalidades rojas y verdes, y un sabor agridulce?',
      options: ['Gala','Granny Smith','Manzana Fuji','Pink Lady',],
      answer: 'Manzana Fuji',
    },
    {
      question: '¿En qué año se cree que se cultivaron las primeras manzanas?',
      options: ['4,000 a.C.', '2,000 a.C.', '3,500 a.C.', '5,000 a.C.'],
      answer: '4,000 a.C.',
    },
    {
      question: '¿Cuál es la función principal de la cera natural que recubre la piel de algunas manzanas?',
      options: ['Mejorar el sabor','Conservar la frescura y prevenir la deshidratación','Prevenir la oxidación','Facilitar el transporte',],
      answer: 'Conservar la frescura y prevenir la deshidratación',
    },
    {
      question: '¿Cuál es el beneficio para la salud asociado con el consumo regular de manzanas?',
      options: ['Reducción del riesgo de enfermedades cardíacas y mejora de la salud digestiva', 'Mejora la visión', 'Fortalece los huesos', 'Aumenta la concentración'],
      answer: 'Reducción del riesgo de enfermedades cardíacas y mejora de la salud digestiva',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  //esto es para que las opciones se muestren en orden aleatorio
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  //esto es para mostrar las preguntas y opciones
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
  
  //esto es para que se muestre la opción seleccionada
  function addOptionClickEvent() {
    let options = document.querySelectorAll('.option');
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            options.forEach(function(opt) {
                opt.classList.remove('option-selected');
            });
            option.classList.add('option-selected');
        });
    });
}

  //esto es para verificar si la respuesta es correcta o incorrecta
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
        addOptionClickEvent();
      } else {
        displayResult();
      }
    }
  }
  
  //esto es para mostrar el resultado
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Has acertado ${score} de ${quizData.length}!`;
  }
  
  //esto es para volver a intentar el quiz
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  //esto es para mostrar el puntaje
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    resultContainer.innerHTML = `
      
    <p>Has acertado ${score} de ${quizData.length}!</p>
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);

  
  displayQuestion();
  addOptionClickEvent();