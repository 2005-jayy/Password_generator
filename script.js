////All Input element selection
const btnGenerate = document.getElementById("generate");
const inputUppercase = document.getElementById("uppercase");
const inputLowercase = document.getElementById("lowercase");
const inputNumbers = document.getElementById("numbers");
const inputSymbols = document.getElementById("symbols");
const inputLength = document.getElementById("length");
//Display password element selection
const passwordDisplay = document.getElementById("result");

//Random character generator functions
const getRandomUppercase = function () {
  const charCode = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(charCode);
};
const getRandomLowercase = function () {
  const charCode = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(charCode);
};
const getRandomNumbers = function () {
  const charCode = Math.floor(Math.random() * 10) + 48;
  return String.fromCharCode(charCode);
};
const getSymbols = function () {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

//Event Listener for Generate Button

btnGenerate.addEventListener("click", function () {
  const useUppercase = inputUppercase.checked;
  const useLowercase = inputLowercase.checked;
  const useNumbers = inputNumbers.checked;
  const useSymbols = inputSymbols.checked;
  const length = +inputLength.value; // use + to convert string to number

  let password = "";
  const generators = [];
  //Whichevert Checked box selected will store in generator array
  if (useUppercase) generators.push(getRandomUppercase);
  if (useLowercase) generators.push(getRandomLowercase);
  if (useNumbers) generators.push(getRandomNumbers);
  if (useSymbols) generators.push(getSymbols);
  //now for loop will work based on length we given for password
  //and generator which stores check boxes in array
  //will now be randomly decide to add in password
  //eg generator has[getRandomUppercase,getRandomNumbers]
  //math.random has number between 0 and 1
  //math.random=0.6 * genrator.length(eg.2)
  //Math.floor converts it to an integer index (removes decimal)
  //math.floor(1.2)=1
  //generator[1]--- this will pick random value from generator[getRandomNumbers]
  //randomfunc=getRandomNumbers
  //password+=randomfunc();

  if (generators.length === 0) {
    passwordDisplay.textContent = "Please select at least one option!";
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomfunc =
      generators[Math.floor(Math.random() * generators.length)];
    password += randomfunc();
  }
  passwordDisplay.textContent = password;
  //for no check boxes selected
});
const btnCopy = document.getElementById("copyBtn");
const originalIcon = btnCopy.src;
const checkIcon = "https://cdn-icons-png.flaticon.com/512/190/190411.png";

//copy button implementation
btnCopy.addEventListener("click", function () {
  //Adding clipboas api to copy
  navigator.clipboard.writeText(passwordDisplay.textContent);
  alert("Copied");
  //changing icon after copy button is click
  btnCopy.src = checkIcon;
  setTimeout(() => {
    btnCopy.src = originalIcon;
  }, 1000); //change back after 1sec
});
