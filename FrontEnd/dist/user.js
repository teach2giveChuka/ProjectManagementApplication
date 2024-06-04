"use strict";
let profile = document.querySelector(".profile");
//  profile.addEventListener('click',displayProfile)
let profilediv = document.createElement('div');
profilediv.className = "profilediv";
let userName = document.createElement('p');
userName.id = "userName";
userName.textContent = "UserName";
let userEmail = document.createElement('p');
userEmail.textContent = 'user@example.com';
profile.appendChild(userName);
profile.appendChild(userEmail);
