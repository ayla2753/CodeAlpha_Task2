// Get DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button[data-value]");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("toggle-theme");

let expression = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    expression += button.dataset.value;
    display.value = expression;
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  expression = "";
  display.value = "";
});

// Equals button
equalsBtn.addEventListener("click", evaluateExpression);

// Evaluate expression
function evaluateExpression() {
  try {
    const result = eval(expression);
    addToHistory(`${expression} = ${result}`);
    display.value = result;
    expression = result.toString();
  } catch {
    display.value = "Error";
    expression = "";
  }
}

// Add to history
function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.".includes(e.key)) {
    expression += e.key;
    display.value = expression;
  } else if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission if any
    evaluateExpression();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (e.key === "Escape") {
    expression = "";
    display.value = "";
  }
});

// Dark mode toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
