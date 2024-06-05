const resetForm = document.getElementById('resetForm') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;

resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;

    if(!email) errorMessage(emailInput, 'Please enter a valid email')
});

function errorMessage(inputElement: HTMLInputElement, errorMessage: string){
    const parent = inputElement.parentElement as HTMLDivElement;
    const error = document.createElement('p');
    error.className = 'inputError';
    error.textContent = errorMessage;
    parent.appendChild(error);

    setTimeout(() => {
        parent.removeChild(error);
    },3000)
}