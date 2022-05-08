var submitBtn = document.getElementById("startBtn");
var container = document.getElementById("containerOfCharBoxes");
var addOneMoreChar = document.getElementById("addOneMoreChar");
var startingDiv = document.getElementById("startingDiv");
var messageContainer = document.getElementById("messageContainer");
var message;
var addBtn;
var deleteChar;
var numberOfChars;
var charBoxes = document.getElementsByClassName("charBox");

submitBtn.addEventListener("click", submitBtnClicked);

//app set up
function submitBtnClicked() {
  numberOfChars = document.getElementById("numberImput").value;
  let HtmlString = "";

  for (let index = 0; index < numberOfChars; index++) {
    HtmlString +=
      '<div class="boxContainer"><span class="delete">X</span><input type="text" class="charBox" maxlength="1" /> </div>';
  }

  startingDiv.innerHTML = "";
  container.innerHTML = HtmlString;
  addOneMoreChar.innerHTML = '<button id="addBtn">Add</button>';
  messageContainer.innerHTML = '<div class="message" id="message"><div>';

  message = document.getElementById("message");
  addBtn = document.getElementById("addBtn");
  deleteChar = document.getElementsByClassName("delete");
  addEventListeners();
  checkIfValid();
}
//adds event listeners
function addEventListeners() {
  for (let item of deleteChar) {
    item.addEventListener("click", removeChar);
  }
  charBoxes = document.getElementsByClassName("charBox");
  for (let item of charBoxes) {
    item.addEventListener("input", checkIfValid);
  }
  addBtn.addEventListener("click", addChar);
}
//adds a new box
function addChar() {
  let content =
    '<div class="boxContainer"><span class="delete">X</span><input type="text" class="charBox" maxlength="1" /> </div>';
  container.insertAdjacentHTML("beforeend", content);

  deleteChar[deleteChar.length - 1].addEventListener("click", removeChar);
  charBoxes[charBoxes.length - 1].addEventListener("input", checkIfValid);
  checkIfValid();
}
//removes the selected box
function removeChar() {
  event.target.parentElement.remove();
  checkIfValid();
}
//checks if the inputs are valid
function checkIfValid() {
  let enteredWord = "";
  var letters = /^[A-Za-z]+$/;
  for (let item of charBoxes) {
    if (item.value === "") {
      message.classList.remove("green");
      message.classList.add("red");
      message.innerHTML = "Dont Leave Empty Cells!";
      return;
    }

    if (item.value.match(letters)) {
      enteredWord += item.value;
      message.classList.remove("red");
      message.classList.add("green");
      message.innerHTML = "OK!";
    } else {
      message.classList.remove("green");
      message.classList.add("red");
      message.innerHTML = "Enter Valid Chars!";
      return;
    }
  }

  if (checkPalindrome(enteredWord)) {
    message.classList.remove("red");
    message.classList.add("green");
    message.innerHTML = "Its a Palyndrome";
  } else {
    message.innerHTML = "Not a Palyndrome";
    message.classList.remove("green");
    message.classList.add("red");
  }
}

//checks if the word is a palyndrome
function checkPalindrome(str) {
  return str == str.split("").reverse().join("");
}