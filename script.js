// Add more questions here. "correct" is the answer index, starting at 0.
const questions = [
  { category: 'Geography', question: 'Which is the largest ocean on Earth?', answers: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], correct: 2, explanation: 'The Pacific is the largest ocean on Earth.' },
  { category: 'Science', question: 'Which planet is known as the Red Planet?', answers: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correct: 1, explanation: 'Mars looks reddish because of iron oxide on its surface.' },
  { category: 'History', question: 'In which year did humans first walk on the Moon?', answers: ['1959', '1965', '1969', '1975'], correct: 2, explanation: 'The Apollo 11 astronauts landed on the Moon in July 1969.' },
  { category: 'Culture', question: 'Who painted the Mona Lisa?', answers: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Leonardo da Vinci'], correct: 3, explanation: 'Leonardo da Vinci painted the Mona Lisa during the Renaissance.' },
  { category: 'Nature', question: 'How many legs does an insect have?', answers: ['Four', 'Six', 'Eight', 'Ten'], correct: 1, explanation: 'Insects have six legs. Spiders have eight and are arachnids.' },
  { category: 'Geography', question: 'What is the capital of Canada?', answers: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correct: 2, explanation: 'Ottawa is the capital of Canada.' },
  { category: 'Science', question: 'What is the chemical symbol for gold?', answers: ['Ag', 'Au', 'Fe', 'Cu'], correct: 1, explanation: 'Gold has the symbol Au, from the Latin word aurum.' },
  { category: 'Literature', question: 'Who wrote Romeo and Juliet?', answers: ['Charles Dickens', 'Jane Austen', 'Mark Twain', 'William Shakespeare'], correct: 3, explanation: 'William Shakespeare wrote the tragedy Romeo and Juliet.' },
  { category: 'Sports', question: 'How many players does a football (soccer) team have on the field at the start of a match?', answers: ['Nine', 'Ten', 'Eleven', 'Twelve'], correct: 2, explanation: 'Each team starts with eleven players, including the goalkeeper.' },
  { category: 'Nature', question: 'Which is the largest living animal?', answers: ['African elephant', 'Blue whale', 'Giraffe', 'Whale shark'], correct: 1, explanation: 'The blue whale is the largest living animal.' }
];

const byId = (id) => document.getElementById(id);
let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion(moveFocus = false) {
  answered = false;
  const item = questions[currentQuestion];
  byId('question-count').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  byId('category').textContent = item.category;
  byId('progress').max = questions.length;
  byId('progress').value = currentQuestion;
  byId('question-title').textContent = item.question;
  byId('feedback').textContent = '';
  byId('next-button').disabled = true;
  byId('next-button').textContent = currentQuestion === questions.length - 1 ? 'See my result →' : 'Next question →';
  byId('answers').replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.setAttribute('aria-hidden', 'true');
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement('span');
    label.textContent = answer;
    button.append(letter, label);
    button.addEventListener('click', () => selectAnswer(index));
    byId('answers').append(button);
  });
  if (moveFocus) byId('question-title').focus();
}

function selectAnswer(selected) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const isCorrect = selected === item.correct;
  if (isCorrect) score++;
  [...byId('answers').children].forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add('correct');
    if (index === selected && !isCorrect) button.classList.add('incorrect');
  });
  byId('feedback').textContent = `${isCorrect ? 'Correct!' : 'Not quite.'} ${item.explanation}`;
  byId('progress').value = currentQuestion + 1;
  byId('next-button').disabled = false;
  byId('next-button').focus();
}

function showResult() {
  byId('question-screen').hidden = true;
  byId('result-screen').hidden = false;
  const percentage = Math.round(score / questions.length * 100);
  const achievement = percentage >= 80 ? 'Quiz Champion' : percentage >= 40 ? 'Knowledge Enthusiast' : 'Curious Explorer';
  byId('score').textContent = `${score}/${questions.length}`;
  byId('achievement').textContent = achievement;
  byId('result-message').textContent = `${percentage}% correct. ${percentage >= 80 ? 'Great work — keep that curiosity alive!' : 'Every question is a chance to learn something new.'}`;
  byId('result-title').focus();
}

byId('next-button').addEventListener('click', () => {
  if (!answered) return;
  currentQuestion++;
  if (currentQuestion < questions.length) renderQuestion(true);
  else showResult();
});

byId('restart-button').addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  byId('result-screen').hidden = true;
  byId('question-screen').hidden = false;
  renderQuestion(true);
});

byId('year').textContent = new Date().getFullYear();
renderQuestion();
