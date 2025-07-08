// calculator.js
const readline = require("readline");
// Step 2: Basic Calculator Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

// Step 3: Command Line Interface Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Step 4: User Interface Functions
function displayWelcome() {
  console.log("Welcome to Node.js Calculator!");
}

function showMenu() {
  console.log(`\nSelect operation:
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit`);
}

function getNumber(promptText) {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      const number = parseFloat(input);
      if (isNaN(number)) {
        console.log("Invalid input. Please enter a valid number.");
        resolve(getNumber(promptText));
      } else {
        resolve(number);
      }
    });
  });
}

function getChoice() {
  return new Promise((resolve) => {
    rl.question("Enter choice (1-5): ", (input) => {
      const choice = parseInt(input);
      if (choice >= 1 && choice <= 5) {
        resolve(choice);
      } else {
        console.log("Invalid choice. Please enter a number between 1 and 5.");
        resolve(getChoice());
      }
    });
  });
}

// Step 7: Main Logic with Error Handling
async function main() {
  try {
    displayWelcome();
    let running = true;

    while (running) {
      showMenu();
      const choice = await getChoice();

      if (choice === 5) {
        console.log("Exiting calculator. Goodbye!");
        running = false;
        rl.close();
        break;
      }

      const num1 = await getNumber("Enter first number: ");
      const num2 = await getNumber("Enter second number: ");

      let result;
      switch (choice) {
        case 1:
          result = add(num1, num2);
          break;
        case 2:
          result = subtract(num1, num2);
          break;
        case 3:
          result = multiply(num1, num2);
          break;
        case 4:
          result = divide(num1, num2);
          break;
      }

      console.log(`Result: ${result}`);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error.message);
    rl.close();
  }
}

main();
