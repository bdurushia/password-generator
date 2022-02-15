// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

let password = '';

let charSet = [];

let promptLength;

const lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
const lowerCharSet = lowerCaseString.split('');

const upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const upperCharSet = upperCaseString.split('');

const numbersString = "0123456789";
const numbersSet = numbersString.split('');

// using String.fromCharCode to grab array of special ascii characters
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

const passLength = function() {
  promptLength = parseInt(window.prompt("How many characters would you like your password to be? Choose a number between 8 and 128."));
  if (!promptLength || promptLength < 8 || promptLength > 128) {
    window.alert("You must enter an answer with the proper criteria.");
    return passLength();
  }
  return promptLength;
};
  

const passLower = function() {
  const confirmLowerCase = window.confirm("Include lowercase letters?");
  if (confirmLowerCase) {
    charSet = charSet.concat(lowerCharSet);
    return charSet;
  } else {
    return charSet;
  }
}

const passUpper = function() {
  const confirmUpperCase = window.confirm("Include uppercase letters?");
  if (confirmUpperCase) {
    charSet = charSet.concat(upperCharSet);
    return charSet; 
  } else {
    return charSet;
  }
}

const passNum = function() {
  const confirmIncludeNumbers = window.confirm("Include numbers?");
  if (confirmIncludeNumbers) {
    charSet = charSet.concat(numbersSet);
    return charSet;
  }
}

const passSpecChar = function() {
  const confirmIncludeSpecChar = window.confirm("And would you like to include special characters?");
  if (confirmIncludeSpecChar) {
    charSet = charSet.concat(specCharSetArray);
    return charSet;
  }
}

function makePassword() {
  let passArray = [];
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

function generatePassword(event) {
  // 1. Prompt the user for password criteria
  passLength();
  passLower();
  passUpper();
  passNum();
  passSpecChar();
  // 2. Generate password based on the seleted criteria
  makePassword();
  // 3. Display generated password to the page

  return password;
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



// Assignment code here

// const passInfo = {
//   length: passLength(),
//   lower: passLower(),
//   upper: passUpper(),
//   numbers: passNum(),
//   specialChar: passSpecChar()
// }