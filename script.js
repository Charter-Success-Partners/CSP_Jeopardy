// Build the board using JEOPARDY_DATA
const data = window.JEOPARDY_DATA;

const board = document.getElementById('game-board');

// Create headers
data.categories.forEach((cat, i) => {
  const header = document.createElement('div');
  header.className = 'category-header';
  header.textContent = cat;
  board.appendChild(header);
});

// Create cells
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < data.categories.length; col++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = data.questions[col][row].value;
    cell.dataset.col = col;
    cell.dataset.row = row;
    cell.addEventListener('click', cellClick);
    board.appendChild(cell);
  }
}

// Modal logic
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const modalQuestion = document.getElementById('modal-question');
const modalAnswer = document.getElementById('modal-answer');
const submitBtn = document.getElementById('submit-answer');
const feedback = document.getElementById('feedback');

let currentCell = null;
let currentQ = null;

function cellClick(e) {
  if (e.target.classList.contains('used')) return;
  currentCell = e.target;
  const col = +currentCell.dataset.col;
  const row = +currentCell.dataset.row;
  currentQ = data.questions[col][row];
  modalQuestion.textContent = currentQ.question;
  modalAnswer.value = '';
  feedback.textContent = '';
  modal.style.display = 'block';
  modalAnswer.focus();
}

closeBtn.onclick = () => {
  modal.style.display = 'none';
};

submitBtn.onclick = () => {
  const userAnswer = modalAnswer.value.trim();
  if (userAnswer === "") {
    feedback.textContent = "Please enter an answer!";
    return;
  }
  if (userAnswer.toLowerCase() === currentQ.answer.toLowerCase()) {
    feedback.textContent = "Correct!";
    currentCell.classList.add('used');
    setTimeout(() => modal.style.display = 'none', 900);
  } else {
    feedback.textContent = `Incorrect! The answer was: ${currentQ.answer}.`;
    currentCell.classList.add('used');
    setTimeout(() => modal.style.display = 'none', 1700);
  }
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};