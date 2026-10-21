"use strict";

const messageField = document.querySelector("#message");
const characterCounter = document.querySelector("#message-counter");
const characterCount = document.querySelector("#character-count");

const minimumCharacters = 15;

const nameField = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const emailField = document.querySelector("#email");
const emailError = document.querySelector("#email-error");



function updateCharacterCounter() {
    const numberOfCharacters = messageField.value.trim().length;
    const charactersRemaining = minimumCharacters - numberOfCharacters;

    characterCount.textContent = numberOfCharacters;

    characterCounter.classList.remove("is-too-short", "is-valid");

    if (numberOfCharacters >= minimumCharacters) {
        characterCounter.classList.add("is-valid");
        characterCounter.lastChild.textContent = ' / 15 characters- requirement met.';
    } else if (numberOfCharacters > 0) {
        characterCounter.classList.add("is-too-short");

        characterCounter.lastChild.textContent = 
        "/ 15 characters - " + charactersRemaining + " more required." ;
    } else {
        characterCounter.lastChild.textContent = 
        '/ 15 characters- minimum 15 characters required.' ;
         }
    }

function validateName(){
    const name = nameField.value.trim();

    if (name.length < 2) {
        nameError.textContent = "Please enter at least 2 characters";
        nameField.classList.add("is-error");
        nameField.classList.remove("is-valid");
        nameField.setAttribute("aria-invalid", "true");

        return false;
    }

    nameError.textContent= "";
    nameField.classList.remove("is-error");
    nameField.classList.add("is-valid");
    nameField.setAttribute("aria-invalid", "false");

        return true;
}

function validateEmail() {
    const name = emailField.value.trim();

    if (email === "") {
        emailError.textContent = "Please enter your email adress";
        emailField.classList.add("is-error");
        emailField.classList.remove("is-valid");
        emailField.setAttribute("aria-invalid", "true"); 
        
        return false;
    }

    if (!emailFieldvalidity.valid) {
        emailError.textContent = "Please enter a valid email adress";
        emailField.classList.add("is-error");
        emailField.classList.remove("is-valid");
        emailField.setAttribute("aria-invalid", "true");  

        return false;
    }

    emailError.textContent = "";
    emailField.classList.add("is-error");
    emailField.classList.remove("is-valid");
    emailField.setAttribute("aria-invalid", "false"); 

        return true;

     }




















    messageField.addEventListener("input", updateCharacterCounter);

    updateCharacterCounter();

    nameField.addEventListener("blur", validateName);

    nameField.addEventListener("input", () => {
        if(nameField.classList.contains("is-error")){
            validateName();
        }
    });

    emailField.addEventListener("blur", validateEmail);

    emailField.addEventListener("input", () => {
        if(emailField.classList.contains("is-error")){
            validateEmail();
        }
    });