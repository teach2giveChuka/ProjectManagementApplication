"use strict";
const formDiv = document.querySelector('.formNew');
const buttonAddNew = document.querySelector('.addNew');
const buttonExit = document.querySelector('.ion-exit');
const form = document.getElementById("projectForm");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const startDateInput = document.getElementById("startDate");
const deadlineInput = document.getElementById("deadline");
const navToggle = document.querySelector('.showNav');
const navShow = document.querySelector('.innerLeft');
if (formDiv && buttonAddNew && buttonExit && form && nameInput && descriptionInput && startDateInput && deadlineInput) {
    formDiv.style.transition = 'opacity 0.5s';
    buttonAddNew.addEventListener('click', (e) => {
        e.preventDefault();
        formDiv.style.opacity = '0';
        formDiv.style.display = 'flex';
        setTimeout(() => {
            formDiv.style.opacity = '1';
        }, 50);
    });
    if (buttonExit) {
        buttonExit.addEventListener('click', (e) => {
            e.preventDefault();
            formDiv.style.opacity = '1';
            setTimeout(() => {
                formDiv.style.opacity = '0';
                formDiv.style.display = 'none';
            }, 300);
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        const createButton = document.getElementById("createButton");
        if (createButton) {
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
                if (!hasError && form) {
                    console.log("Form submitted:");
                    console.log("Name:", nameInput.value);
                    console.log("Description:", descriptionInput.value);
                    console.log("Start Date:", startDateInput.value);
                    console.log("Deadline:", deadlineInput.value);
                    form.submit();
                    clearFormFields(); // Clear form fields after submission
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
            function clearFormFields() {
                nameInput.value = "";
                descriptionInput.value = "";
                startDateInput.value = "";
                deadlineInput.value = "";
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const assignButtons = document.querySelectorAll('.btnAssign');
    const dropdowns = document.querySelectorAll('.dropdown');
    assignButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const dropdown = dropdowns[index];
            if (dropdown && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
            else {
                dropdowns.forEach(d => d.style.display = 'none'); // Close other dropdowns
                if (dropdown) {
                    dropdown.style.display = 'block';
                }
            }
        });
    });
    document.addEventListener('click', function (e) {
        if (!e.target || !(e.target instanceof Element))
            return;
        if (!e.target.matches('.btnAssign')) {
            dropdowns.forEach(dropdown => {
                if (dropdown instanceof HTMLElement) {
                    dropdown.style.display = 'none';
                }
            });
        }
    });
});
navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navShow.style.display = 'flex';
    navShow.style.background = '#222831';
});
