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
var _a;
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
const logout = document.querySelector('.logout');
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
navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navShow.style.display = 'flex';
    navShow.style.background = '#222831';
});
logout.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/FRONTEND/index.html';
});
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:5000/user/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = yield response.json();
            return data.users; // Assuming the response structure has users array
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
function populateUserTable(users) {
    const tableBody = document.getElementById('userTableBody');
    users.forEach(user => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.name;
        row.appendChild(usernameCell);
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);
        const roleCell = document.createElement('td');
        roleCell.textContent = user.role;
        row.appendChild(roleCell);
        const dateJoinedCell = document.createElement('td');
        dateJoinedCell.textContent = user.dateJoined;
        row.appendChild(dateJoinedCell);
        tableBody.appendChild(row);
    });
}
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield fetchUsers();
    if (users) {
        populateUserTable(users);
    }
}));
// Function to fetch projects from the server// Function to fetch projects from the server
// Function to fetch projects from the server
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:5000/project/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            console.log('Fetched projects:', data); // Log the fetched data
            return data; // Assuming the response is the projects array itself
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            return null; // Return null in case of an error
        }
    });
}
// Function to populate the project table with fetched projects
function populateProjectTable(projects) {
    const tableBody = document.getElementById('ProjectsTableBody');
    if (!tableBody) {
        console.error('ProjectsTableBody element not found');
        return;
    }
    tableBody.innerHTML = ''; // Clear any existing content
    projects.forEach(project => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = project.project_name;
        row.appendChild(nameCell);
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = project.project_decription;
        row.appendChild(descriptionCell);
        const startDateCell = document.createElement('td');
        startDateCell.textContent = new Date(project.start_date).toLocaleDateString();
        row.appendChild(startDateCell);
        const deadlineCell = document.createElement('td');
        deadlineCell.textContent = new Date(project.deadline).toLocaleDateString();
        row.appendChild(deadlineCell);
        // If you need controls for each row, you can add them here
        const controlsCell = document.createElement('td');
        controlsCell.className = 'tablebtn';
        const formButtonAssign = document.createElement('div');
        formButtonAssign.className = 'formButton';
        formButtonAssign.innerHTML = `
          <button id="assignButton${project.project_id}" class="btnAssign">Assign</button>
          <div class="dropdown" id="dropdown${project.project_id}">
            <a href="#">User 1</a>
            <a href="#">User 2</a>
            <a href="#">User 3</a>
          </div>
        `;
        const formButtonUpdate = document.createElement('div');
        formButtonUpdate.className = 'formButton';
        formButtonUpdate.innerHTML = `
          <button id="updateButton${project.project_id}" class="btnUpdate">Update</button>
        `;
        const formButtonDelete = document.createElement('div');
        formButtonDelete.className = 'formButton';
        formButtonDelete.innerHTML = `
          <button id="deleteButton${project.project_id}" class="btnDelete">Delete</button>
        `;
        controlsCell.appendChild(formButtonAssign);
        controlsCell.appendChild(formButtonUpdate);
        controlsCell.appendChild(formButtonDelete);
        row.appendChild(controlsCell);
        tableBody.appendChild(row);
    });
}
// Fetch and populate projects on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DOM fully loaded and parsed');
    // Fetch and populate users
    const users = yield fetchUsers();
    if (users) {
        populateUserTable(users);
    }
    // Fetch and populate projects
    const projects = yield fetchProjects();
    if (projects && projects.length > 0) {
        populateProjectTable(projects);
    }
    else {
        console.log('No projects found or failed to fetch projects');
    }
}));
//buttons events
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DOM fully loaded and parsed');
    // Fetch and populate users
    const users = yield fetchUsers();
    if (users) {
        populateUserTable(users);
    }
    // Fetch and populate projects
    const projects = yield fetchProjects();
    if (projects && projects.length > 0) {
        populateProjectTable(projects);
        addProjectButtonListeners(projects);
    }
    else {
        console.log('No projects found or failed to fetch projects');
    }
}));
function addProjectButtonListeners(projects) {
    projects.forEach(project => {
        const assignButton = document.getElementById(`assignButton${project.project_id}`);
        // Other button elements omitted for brevity
        if (assignButton) {
            assignButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log(`Assign button clicked for project ID: ${project.project_id}`);
                // Fetch free users
                const response = yield fetch('http://localhost:5000/project/free-users');
                const freeUsers = yield response.json();
                // Populate the dropdown with user data
                const dropdown = document.getElementById('freeUsersDropdown');
                if (dropdown) {
                    dropdown.innerHTML = ''; // Clear previous content
                    freeUsers.forEach((user) => {
                        const option = document.createElement('option');
                        option.value = user.id; // Set the value to the user's id
                        option.textContent = `${user.name} - ${user.email}`;
                        dropdown.appendChild(option);
                    });
                    // Show the dropdown
                    dropdown.style.display = 'block';
                    // Add change event listener to dropdown
                    dropdown.addEventListener('change', () => __awaiter(this, void 0, void 0, function* () {
                        const userId = dropdown.value; // Get selected user id
                        if (userId) {
                            try {
                                const response = yield fetch('http://localhost:5000/project/assign/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        project_id: project.project_id,
                                        user_id: userId,
                                    }),
                                });
                                if (response.ok) {
                                    console.log('Project assigned successfully.');
                                    // Optionally, hide the dropdown again
                                    dropdown.style.display = 'none';
                                }
                                else {
                                    console.error('Failed to assign project.');
                                }
                            }
                            catch (error) {
                                console.error('Error assigning project:', error);
                            }
                        }
                    }));
                }
            }));
        }
        // Delete button listener
        const deleteButton = document.getElementById(`deleteButton${project.project_id}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log(`Delete button clicked for project ID: ${project.project_id}`);
                const confirmed = confirm("Are you sure you want to delete this project?");
                if (confirmed) {
                    try {
                        // Send a DELETE request to the specified endpoint with the project ID
                        const response = yield fetch(`http://localhost:5000/project/delete/${project.project_id}`, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            // Optionally, update the UI to reflect the deletion
                            const row = deleteButton.closest('tr');
                            if (row) {
                                row.remove(); // Remove the row from the table
                            }
                            console.log('Project deleted successfully');
                        }
                        else {
                            console.error('Failed to delete project');
                        }
                    }
                    catch (error) {
                        console.error('Error deleting project:', error);
                    }
                }
            }));
        }
        // Add event listeners for other buttons
    });
}
// Add an event listener to the project form's submit button
(_a = document.getElementById('createButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // Prevent the default form submission behavior
    // Gather form data
    const projectNameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const startDateInput = document.getElementById('startDate');
    const deadlineInput = document.getElementById('deadline');
    const projectData = {
        project_name: projectNameInput.value,
        project_description: descriptionInput.value,
        start_date: startDateInput.value,
        deadline: deadlineInput.value,
        status: true
    };
    try {
        // Send a POST request to create the project
        const response = yield fetch('http://localhost:5000/project/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });
        if (response.ok) {
            console.log('Project created successfully');
            // Optionally, you can update the UI to reflect the new project
        }
        else {
            console.error('Failed to create project');
        }
    }
    catch (error) {
        console.error('Error creating project:', error);
    }
}));
// Function to add listeners to project buttons
function addProjectbuttonListeners(projects) {
    projects.forEach(project => {
        const assignButton = document.getElementById(`assignButton${project.project_id}`);
        const deleteButton = document.getElementById(`deleteButton${project.project_id}`);
        if (assignButton) {
            assignButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Assign button clicked for project ID: ${project.project_id}`);
                // Fetch free users
                const response = yield fetch('http://localhost:5000/project/free-users');
                const freeUsers = yield response.json();
                // Populate the dropdown with user data
                const dropdown = document.getElementById('freeUsersDropdown');
                if (dropdown) {
                    dropdown.innerHTML = ''; // Clear previous content
                    freeUsers.forEach((user) => {
                        const option = document.createElement('option');
                        option.value = user.user_id; // Set the user ID as the value
                        option.textContent = `${user.name} - ${user.email}`;
                        dropdown.appendChild(option);
                    });
                    // Show the dropdown
                    dropdown.style.display = 'block';
                    // Add event listener to the dropdown to handle user selection
                    dropdown.addEventListener('change', () => __awaiter(this, void 0, void 0, function* () {
                        const selectedUserId = dropdown.value;
                        if (selectedUserId) {
                            try {
                                // Send a POST request to assign the user to the project
                                const assignResponse = yield fetch('http://localhost:5000/project/assign', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ project_id: project.project_id, user_id: selectedUserId }),
                                });
                                if (assignResponse.ok) {
                                    console.log(`User assigned to project ID: ${project.project_id}`);
                                    // Hide the dropdown after selection
                                    dropdown.style.display = 'none';
                                }
                                else {
                                    console.error('Failed to assign user');
                                }
                            }
                            catch (error) {
                                console.error('Error assigning user:', error);
                            }
                        }
                    }));
                }
            }));
        }
        if (deleteButton) {
            deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Delete button clicked for project ID: ${project.project_id}`);
                const confirmed = confirm("Are you sure you want to delete this project?");
                if (confirmed) {
                    try {
                        // Send a DELETE request to delete the project
                        const response = yield fetch(`http://localhost:5000/project/delete/${project.project_id}`, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            console.log('Project deleted successfully');
                            // Remove the project row from the table
                            const row = deleteButton.closest('tr');
                            if (row) {
                                row.remove();
                            }
                        }
                        else {
                            console.error('Failed to delete project');
                        }
                    }
                    catch (error) {
                        console.error('Error deleting project:', error);
                    }
                }
            }));
        }
    });
}
