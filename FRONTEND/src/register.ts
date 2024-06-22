interface User {
    name: string;
    email: string;
    password: string;
}

const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const registerBtn = document.getElementById('register') as HTMLButtonElement;

const users: User[] = [];

registerBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirm_password') as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Logging user inputs
    console.log('User Input - Name:', name);
    console.log('User Input - Email:', email);
    console.log('User Input - Password:', password);
    console.log('User Input - Confirm Password:', confirmPassword);

    clearErrorMessage();

    if (!name || !email || !password || !confirmPassword) {
        if (!name) displayError(nameInput, 'Please input this field');
        if (!email) displayError(emailInput, 'Please input this field');
        if (!password) displayError(passwordInput, 'Please input this field');
        if (!confirmPassword) displayError(confirmPasswordInput, 'Please input this field');
        return;
    }

    if (password !== confirmPassword) {
        displayError(passwordInput, 'Passwords do not match');
        displayError(confirmPasswordInput, 'Passwords do not match');
        return;
    }

    const url = 'http://localhost:5000/user/register';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: name,
                user_email: email,
                user_password: password
            })
        });

        if (response.ok) {
            // Show success message
            showSuccessMessage('User registered successfully');
        } else {
            // Show error message
            showErrorMessage('Email Already Exists');
        }
    } catch (error) {
        // Show error message
        showErrorMessage('Error: ' + error);
    }
});

function displayError(inputElement: HTMLInputElement, message: string) {
    const parent = inputElement.parentElement as HTMLDivElement;
    const error = document.createElement('p');
    error.className = 'inputError';
    error.textContent = message;
    parent.appendChild(error);

    setTimeout(() => {
        parent.removeChild(error);
    }, 3000);
}

function clearErrorMessage() {
    const errors = document.querySelectorAll('.inputError');
    errors.forEach((error) => {
        error.remove();
    });
}

function showSuccessMessage(message: string) {
    const successMessage = document.getElementById('successMessage') as HTMLDivElement;
    successMessage.textContent = message;
    successMessage.classList.add('slide-in');

    setTimeout(() => {
        successMessage.classList.remove('slide-in');
    }, 3000);
}

function showErrorMessage(message: string) {
    const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
    errorMessage.textContent = message;
    errorMessage.classList.add('slide-in');

    setTimeout(() => {
        errorMessage.classList.remove('slide-in');
    }, 3000);
}
