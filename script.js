  let display = document.getElementById("display");
  let equation = "";  
  let currentInput = "";
  let operator = null;
  let isPowerOff = false; 

  const updateDisplay = (value) => {
    if (!isPowerOff) {
      display.textContent = value.slice(0,32); //screen limit
    }
  };

  // Clear everything (yes this includes resetting the state of everything)
  const clear = () => {
    if (isPowerOff) {
      isPowerOff = false;
    }
    equation = "";
    currentInput = "";
    operator = null;
    display.style.color = "white";
    updateDisplay("0");
  };

  // E/valuate the equation and display result
  const calculate = () => {
    if (isPowerOff) return;  
    try {
      let result = eval(equation);  
      equation = result.toString();  
      updateDisplay(equation);
    } catch (error) {
      updateDisplay("Error");
      equation = "";
    }
  };

  // Handling number and decimal point buttons
  document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener("click", () => {
      if (isPowerOff || equation.length >= 32) return;  // Checks if input exceeds the screen
      if (currentInput.includes(".") && button.textContent === ".") return; // No double decimals allowed
      currentInput += button.textContent;
      equation += button.textContent;
      updateDisplay(equation);
    });
  });
  
  // Handling operator buttons
  document.querySelectorAll(".operator").forEach((button) => {
    button.addEventListener("click", () => {
      if (isPowerOff || equation.length >= 32) return;  // Checks if input exceeds the screen
      if (currentInput === "" && equation === "") return;  // Ignores the function if there is no number used
      if (/[+\-*/]$/.test(equation)) {
        // Replaces the last operator if there is already an operator being used
        equation = equation.slice(0, -1) + button.textContent;
      } else {
        equation += button.textContent;
      }
      currentInput = ""; // Clear current input after operator is added
      updateDisplay(equation);
    });
  });

  document.getElementById("equals").addEventListener("click", () => {
    if (isPowerOff) return;  
    calculate();
    currentInput = equation; // Store result in currentInput for further calculations
  });

  // All Clear and Turns on calculator (resets state as stated in line 13)
  document.getElementById("ac").addEventListener("click", clear);

  // Backspace 
  document.getElementById("backspace").addEventListener("click", () => {
    if (isPowerOff) return;  
    if (equation.length > 0) {
      equation = equation.slice(0, -1);
      currentInput = equation;
      updateDisplay(equation || "0");
    }
  });

  // hello button
  document.getElementById("hello").addEventListener("click", () => {
    if (isPowerOff) return;  
    const greetings = ["Hello", "Hola", "Kamusta", "Bonjour", "Ciao", "Olá"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    updateDisplay(randomGreeting);
    setTimeout(() => updateDisplay(equation || "0"), 2000);
  });

  // Off button
  document.getElementById("bye").addEventListener("click", () => {
    updateDisplay("Goodbye");
    isPowerOff = true;  // turn off calculator
    display.style.color = "gray";
    setTimeout(() => {
      display.textContent = " ";  // blank screen
    }, 2000);
  });

  // Good Night
  document.getElementById("Good_Night").addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=DiDUIfMk7go", "_blank"); // Replace the URL with your desired video link
  });