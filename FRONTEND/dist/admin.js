"use strict";
let formDiv = document.querySelector('.formNew');
let buttonAddNew = document.querySelector('.addNew');
let buttonExit = document.querySelector('.ion-exit');
const form = document.getElementById("projectForm");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const startDateInput = document.getElementById("startDate");
const deadlineInput = document.getElementById("deadline");
formDiv.style.transition = 'opacity 0.5s';
buttonAddNew === null || buttonAddNew === void 0 ? void 0 : buttonAddNew.addEventListener('click', (e) => {
    e.preventDefault();
    formDiv.style.opacity = '0';
    formDiv.style.display = 'flex';
    setTimeout(() => {
        formDiv.style.opacity = '1';
    }, 50);
});
buttonExit.addEventListener('click', (e) => {
    e.preventDefault();
    formDiv.style.opacity = '1';
    setTimeout(() => {
        formDiv.style.opacity = '0';
        formDiv.style.display = 'none';
    }, 300);
});
document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("createButton");
    createButton.addEventListener("click", (event) => {
        event.preventDefault();
        removeErrorMessages();
        let hasError = false;
        if (nameInput.value.trim() === "") {
            displayError(nameInput, "This field cannot be empty");
            hasError = true;
        }
        if (descriptionInput.value.trim() === "") {
            displayError(descriptionInput, "This field cannot be empty");
            hasError = true;
        }
        if (startDateInput.value.trim() === "") {
            displayError(startDateInput, "This field cannot be empty");
            hasError = true;
        }
        if (deadlineInput.value.trim() === "") {
            displayError(deadlineInput, "This field cannot be empty");
            hasError = true;
        }
        if (!hasError) {
            form.submit();
        }
    });
    function displayError(input, message) {
        const errorSpan = document.createElement("span");
        errorSpan.className = "error";
        errorSpan.textContent = message;
        input.insertAdjacentElement("afterend", errorSpan);
        setTimeout(() => {
            errorSpan.remove();
        }, 3000); // Error message disappears after 3 seconds
    }
    function removeErrorMessages() {
        const errors = document.querySelectorAll(".error");
        errors.forEach(error => error.remove());
    }
});
