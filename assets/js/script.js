// Get references to the #generate element
const generateBtn = document.querySelector("#generate");
const passwordContainer = document.querySelector('#password');

let password = '';

let charSet = [];

let promptLength;

const lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
const lowerCharSet = lowerCaseString.split('');

const upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const upperCharSet = upperCaseString.split('');

const numbersString = "0123456789";
const numbersSet = numbersString.split('');

let { confirmLowerCase, confirmUpperCase, confirmIncludeNumbers, confirmIncludeSpecChar } = false;

// using String.fromCharCode to grab array of special characters
const charArrayLowToHigh = function(low, high) {
  const array = [];
  for (let i = low; i < high; i++) {
    array.push(String.fromCharCode(i));
  }
  return array;
}

let specCharSetArray = charArrayLowToHigh(33, 48) 
  .concat(charArrayLowToHigh(58, 65))
  .concat(charArrayLowToHigh(91, 97))
  .concat(charArrayLowToHigh(123, 127));


////////////////////// Prompt functions ////////////////////////////

const passLength = function() {
  promptLength = parseInt(window.prompt("How many characters would you like your password to be? Choose a number between 8 and 128."));
  charSet = [];
  if (!promptLength || promptLength < 8 || promptLength > 128) {
    window.alert("You must enter an answer with the proper criteria.");
    return passLength();
  }
  return promptLength;
};

const passLower = function() {
  confirmLowerCase = window.confirm("Include lowercase letters?");
  if (confirmLowerCase) {
    charSet = charSet.concat(lowerCharSet);
    return charSet;
  } else {
    return confirmLowerCase;
  }
}

const passUpper = function() {
  confirmUpperCase = window.confirm("Include uppercase letters?");
  if (confirmUpperCase) {
    charSet = charSet.concat(upperCharSet);
    return charSet; 
  } else {
    return confirmUpperCase;
  }
}

const passNum = function() {
  confirmIncludeNumbers = window.confirm("Include numbers?");
  if (confirmIncludeNumbers) {
    charSet = charSet.concat(numbersSet);
    return charSet;
  } else {
    return confirmIncludeNumbers;
  }
}

const passSpecChar = function() {
  confirmIncludeSpecChar = window.confirm("And would you like to include special characters?");
  if (confirmIncludeSpecChar) {
    charSet = charSet.concat(specCharSetArray);
    return charSet;
  } else {
    return confirmIncludeSpecChar;
  }
}

//////////// Validate & Make Password Functions ////////////////

function validatePassword() {
  if (!confirmLowerCase && !confirmUpperCase && !confirmIncludeNumbers && !confirmIncludeSpecChar) {
    window.alert("You must choose at least one type of character!");
    return generatePassword();
  }
}

function makePassword() {
  let passArray = [];
  password = '';
  for (let i = 0; i < promptLength; i++) {
    let characters = charSet[Math.floor(Math.random() * charSet.length)];
    passArray.push(characters);
  }
  let passString = "";
  for (let i = 0; i < passArray.length; i++) {
    passString += passArray[i];
  }
  password += passString;
  return password;
}

// Write password to the #password input
function writePassword() {
  passwordContainer.value = password;
}

/// Main Function Call ///

function generatePassword() {
  // 1. Prompt the user for password criteria
  passLength();
  passLower();
  passUpper();
  passNum();
  passSpecChar();
  // 2. Validate for at least one character choices
  validatePassword();
  // 3. Generate password based on the seleted criteria
  makePassword();
  // 4. Display generated password to the page
  writePassword();
}

generateBtn.addEventListener("click", generatePassword);