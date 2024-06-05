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
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
loginForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    clearErrorMessages();
    if (!username || !password) {
        if (!username)
            displayErrorMessage(usernameInput, 'Please fill in this field');
        if (!password)
            displayErrorMessage(passwordInput, 'Please fill in this field');
        return;
    }
    try {
        const response = yield fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/dashboard.html';
        }
        else {
            const errorData = yield response.json();
            displayErrorMessage(passwordInput, errorData.message || 'Invalid username or password');
        }
    }
    catch (error) {
        displayErrorMessage(passwordInput, 'An error occurred during login');
    }
}));
function displayErrorMessage(inputElement, message) {
    const parent = inputElement.parentElement;
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
