"use strict";
let profile = document.querySelector(".profile");
let legout = document.querySelector('.legout');
//  profile.addEventListener('click',displayProfile)
console.log('User email stored in local storage:', localStorage.getItem('user_email'));
let profilediv = document.createElement('div');
profilediv.className = "profilediv";
let userName = document.createElement('p');
userName.id = "userName";
userName.textContent = "UserName";
let userEmail = document.createElement('p');
userEmail.textContent = localStorage.getItem('user_email');
profile.appendChild(userName);
profile.appendChild(userEmail);
legout.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/FRONTEND/index.html';
});
console.log('User email stored in local storage:', localStorage.getItem('user_email')); // Debugging statement
