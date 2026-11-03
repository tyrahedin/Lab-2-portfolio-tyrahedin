"use strict";

// GET HTML ELEMENTS AND SET VARIABLES //

const clearButton = document.querySelector(".clear-button");

const contactform = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

const messageField = document.querySelector("#message");
const characterCounter = document.querySelector("#message-counter");
const characterCount = document.querySelector("#character-count");

const minimumCharacters = 15;

const nameField = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const emailField = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const subjectField = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const messageError = document.querySelector("#message-error");

const websiteField = document.querySelector("#website");
const websiteError = document.querySelector("#website-error");

function clearValidationState() {
    const fields = [
        nameField,
        emailField,
        subjectField,
        websiteField,
        messageField
    ];

    const errorMessages = [
        nameError,
        emailError,
        subjectError,
        websiteError,
        messageError
    ];

    fields.forEach((field) => {
        field.classList.remove("is-error", "is-valid");
        field.setAttribute("aria-invalid", "false");
    });

    errorMessages.forEach((errorMessage) => {
        errorMessage.textContent = "";
    });

    updateCharacterCounter();
}

// CHARACTER COUNTER //

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

// FORM VALIDATION //
//Checks that the name contains at least 2 characters//

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

// Checks that the email address is not empty and has a valid format //

function validateEmail() {
    const email = emailField.value.trim();

    if (email === "") {
        emailError.textContent = "Please enter your email address";
        emailField.classList.add("is-error");
        emailField.classList.remove("is-valid");
        emailField.setAttribute("aria-invalid", "true"); 
        
        return false;
    }

    if (!emailField.validity.valid) {
        emailError.textContent = "Please enter a valid email address";
        emailField.classList.add("is-error");
        emailField.classList.remove("is-valid");
        emailField.setAttribute("aria-invalid", "true");  

        return false;
    }

    emailError.textContent = "";
    emailField.classList.add("is-valid");
    emailField.classList.remove("is-error");
    emailField.setAttribute("aria-invalid", "false"); 

        return true;

     }

     // Checks that the user has selected a subject //

     function validateSubject(){
        if (subjectField.value ==="") {
            subjectError.textContent = "Please choose a topic";
            subjectField.classList.add("is-error");
            subjectField.classList.remove("is-valid");
            subjectField.setAttribute("aria-invalid", "true");  
    
            return false;
        }

            subjectError.textContent = "";
            subjectField.classList.remove("is-error");
            subjectField.classList.add("is-valid");
            subjectField.setAttribute("aria-invalid", "false");  

            return true;
    }

    // Checks that hte message containd at least 15 characters //

    function validateMessage(){
        const message = messageField.value.trim();
    
        if (message.length < minimumCharacters) {
            messageError.textContent =
             "Please write at least 15 characters";
            messageField.classList.add("is-error");
            messageField.classList.remove("is-valid");
            messageField.setAttribute("aria-invalid", "true");
    
            return false;
        }
    
        messageError.textContent= "";
        messageField.classList.remove("is-error");
        messageField.classList.add("is-valid");
        messageField.setAttribute("aria-invalid", "false");
    
            return true;
    }

    // Checks that the website URL is valid if a value has been entered //

    function validateWebsite() {
        const website = websiteField.value.trim();

    if (website === "") {
        websiteError.textContent = "";
        websiteField.classList.remove("is-error", "is-valid") ;
        websiteField.setAttribute("aria-invalid", "false"); 
        
        return true;
    }

    if (!websiteField.validity.valid) {
        websiteError.textContent = "Please enter a valid website address, for example https://example.com.";
        websiteField.classList.add("is-error");
        websiteField.classList.remove("is-valid");
        websiteField.setAttribute("aria-invalid", "true");  

        return false;
    }

    websiteError.textContent = "";
    websiteField.classList.remove("is-error");
    websiteField.classList.add("is-valid");
    websiteField.setAttribute("aria-invalid", "false"); 

        return true;

     }

    //   EVENT LISTENERS   //
    // Updates the character counter whenever the user types //

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

    subjectField.addEventListener("blur", validateSubject);

    subjectField.addEventListener("change", validateSubject);

    messageField.addEventListener("blur", validateMessage);

    messageField.addEventListener("input", () => {
        if(messageField.classList.contains("is-error")){
            validateMessage();
        }
    });

    websiteField.addEventListener("blur", validateWebsite);

    websiteField.addEventListener("input", () => {
        if(websiteField.classList.contains("is-error")) {
            validateWebsite();
        }
    });

    // FORM SUBMISSION //

contactform.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const subjectIsValid = validateSubject();
    const websiteIsValid = validateWebsite();
    const messageIsValid = validateMessage();

    // Check if all form fields are valid //
    const formIsValid =
        nameIsValid &&
        emailIsValid &&
        subjectIsValid &&
        websiteIsValid &&
        messageIsValid;

    // Display an error message if any field is invalid //
    if (!formIsValid) {
        formMessage.textContent =
        "Please correct the highlighted fields before sending.";

        formMessage.classList.remove("success-message");
        formMessage.classList.add("form-message-error");

        return;
    }

    const firstName = nameField.value.trim().split(" ")[0];

    formMessage.classList.remove("form-message-error");
    formMessage.classList.add("success-message");

    // Display a personalized success message //
    formMessage.textContent =
    `Thanks for your feedback, ${firstName}!`;

   
    // Reset the form and clear validation messages after 4 seconds //
    window.setTimeout(() => {
        contactform.reset();
        clearValidationState();
        formMessage.textContent = "";
        formMessage.classList.remove("success-message");
    }, 4000);
});

    // FORM RESET AND CLEAR BUTTON //

contactform.addEventListener("reset", () => {
    window.setTimeout(() => {
        clearValidationState();


    }, 0);
});

clearButton.addEventListener("click", () => {
    formMessage.textContent = "";
    formMessage.classList.remove(
        "success-message",
        "form-message-error"
    );
});