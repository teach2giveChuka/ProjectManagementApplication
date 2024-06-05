let formDiv = document.querySelector('.formNew') as HTMLElement;
let buttonAddNew = document.querySelector('.addNew') as HTMLElement;
let buttonExit = document.querySelector('.ion-exit') as HTMLElement;

const form = document.getElementById("projectForm") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const startDateInput = document.getElementById("startDate") as HTMLInputElement;
const deadlineInput = document.getElementById("deadline") as HTMLInputElement;

formDiv.style.transition = 'opacity 0.5s';

buttonAddNew?.addEventListener('click', (e) => {
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
    const createButton = document.getElementById("createButton") as HTMLButtonElement;
  
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
  
    function displayError(input: HTMLInputElement, message: string) {
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
