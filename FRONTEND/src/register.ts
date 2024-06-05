interface User{
    name: string;
    email: string;
    password: string;
}

const registerForm =  document.getElementById('registerForm') as HTMLFormElement;
const registerBtn = document.getElementById('register') as HTMLButtonElement;

const users: User[] = [];

registerBtn.addEventListener('click', (event) =>{
    event.preventDefault();

    const nameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirm_password') as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    clearErrorMessage();

    if(!name || !email || !password || !confirmPassword){
        if(!name) displayError(nameInput, 'Please input this field');
        if(!email) displayError(emailInput, 'Please input this field');
        if(!password) displayError(passwordInput, 'Please input this field');
        if(!confirmPassword) displayError(confirmPasswordInput, 'Please input this field');
        return;
    }

    if(password!== confirmPassword){
        displayError(passwordInput, 'Passwords do not match');
        displayError(confirmPasswordInput, 'Passwords do not match');
        return;
    }

    const newUser: User = {
        name,
        email,
        password
    }
    users.push(newUser);
})

function displayError(inputElement: HTMLInputElement, message: string){
    const parent = inputElement.parentElement as HTMLDivElement;
    const error = document.createElement('p');
    error.className = 'inputError';
    error.textContent = message;
    parent.appendChild(error);

    setTimeout(() => {
        parent.removeChild(error);
    },3000)
}

function clearErrorMessage() {
    const errors = document.querySelectorAll('.inputError');
    errors.forEach((error) => {
        error.remove();
    })
}