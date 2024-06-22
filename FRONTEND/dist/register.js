"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registerForm = document.getElementById('registerForm');
const registerBtn = document.getElementById('register');
const users = [];
registerBtn.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const nameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
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
        if (!name)
            displayError(nameInput, 'Please input this field');
        if (!email)
            displayError(emailInput, 'Please input this field');
        if (!password)
            displayError(passwordInput, 'Please input this field');
        if (!confirmPassword)
            displayError(confirmPasswordInput, 'Please input this field');
        return;
    }
    if (password !== confirmPassword) {
        displayError(passwordInput, 'Passwords do not match');
        displayError(confirmPasswordInput, 'Passwords do not match');
        return;
    }
    const url = 'http://localhost:5000/user/register';
    try {
        const response = yield fetch(url, {
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
        }
        else {
            // Show error message
            showErrorMessage('Email Already Exists');
        }
    }
    catch (error) {
        // Show error message
        showErrorMessage('Error: ' + error);
    }
}));
function displayError(inputElement, message) {
    const parent = inputElement.parentElement;
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
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.classList.add('slide-in');
    setTimeout(() => {
        successMessage.classList.remove('slide-in');
    }, 3000);
}
function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.add('slide-in');
    setTimeout(() => {
        errorMessage.classList.remove('slide-in');
    }, 3000);
}
