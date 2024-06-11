const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user_email = usernameInput.value;
    const user_password = passwordInput.value;

    clearErrorMessages();

    if (!user_email || !user_password) {
        if (!user_email) displayErrorMessage(usernameInput, 'Please fill in this field');
        if (!user_password) displayErrorMessage(passwordInput, 'Please fill in this field');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_email, user_password }),
        });
        if (response.ok) {
            localStorage.clear();
            localStorage.setItem('user_email', user_email);
            console.log('Local Storage:', localStorage); // Debugging statement
            window.location.href = './user/user.html';
        }
        else {
            const errorData = await response.json();
            displayErrorMessage(passwordInput, errorData.message || 'Invalid username or password');
        }
    } catch (error) {
        displayErrorMessage(passwordInput, 'An error occurred during login');
    }
});

function displayErrorMessage(inputElement: HTMLInputElement, message: string) {
    const parent = inputElement.parentElement as HTMLDivElement;
    const error = document.createElement('p');
    error.className = 'inputError';
    error.textContent = message;
    parent.appendChild(error);

    setTimeout(() => {
        if (error.parentElement === parent) {
            parent.removeChild(error);
        }
    }, 3000);
}

function clearErrorMessages() {
    const errors = document.querySelectorAll('.inputError');
    errors.forEach(error => error.remove());
}
