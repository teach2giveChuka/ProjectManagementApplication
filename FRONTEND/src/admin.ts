const formDiv = document.querySelector('.formNew') as HTMLElement;
const buttonAddNew = document.querySelector('.addNew') as HTMLElement;
const buttonExit = document.querySelector('.ion-exit') as HTMLElement;

const form = document.getElementById("projectForm") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const startDateInput = document.getElementById("startDate") as HTMLInputElement;
const deadlineInput = document.getElementById("deadline") as HTMLInputElement;
const navToggle = document.querySelector('.showNav') as HTMLElement;
const navShow = document.querySelector('.innerLeft') as HTMLElement;
const logout = document.querySelector('.logout') as HTMLElement

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
        const createButton = document.getElementById("createButton") as HTMLButtonElement;

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
    navShow.style.background = '#222831'
});

logout.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '/FRONTEND/index.html';
})



async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5000/user/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data.users; // Assuming the response structure has users array
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function populateUserTable(users: Array<{ id: string, name: string, email: string, role: string, dateJoined: string }>) {
    const tableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;

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

document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetchUsers();
    if (users) {
        populateUserTable(users);
    }
});


// Function to fetch projects from the server// Function to fetch projects from the server
// Function to fetch projects from the server
async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:5000/project/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched projects:', data); // Log the fetched data
        return data; // Assuming the response is the projects array itself
    } catch (error) {
        console.error('Error fetching projects:', error);
        return null; // Return null in case of an error
    }
}

// Function to populate the project table with fetched projects
function populateProjectTable(projects: Array<{ project_id: string, project_name: string, project_decription: string, start_date: string, deadline: string }>) {
    const tableBody = document.getElementById('ProjectsTableBody') as HTMLTableSectionElement;

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
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    
    // Fetch and populate users
    const users = await fetchUsers();
    if (users) {
        populateUserTable(users);
    }

    // Fetch and populate projects
    const projects = await fetchProjects();
    if (projects && projects.length > 0) {
        populateProjectTable(projects);
    } else {
        console.log('No projects found or failed to fetch projects');
    }
});

//buttons events
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    
    // Fetch and populate users
    const users = await fetchUsers();
    if (users) {
        populateUserTable(users);
    }

    // Fetch and populate projects
    const projects = await fetchProjects();
    if (projects && projects.length > 0) {
        populateProjectTable(projects);
        addProjectButtonListeners(projects);
    } else {
        console.log('No projects found or failed to fetch projects');
    }
});
function addProjectButtonListeners(projects: Array<{ project_id: string }>) {
    projects.forEach(project => {
        const assignButton = document.getElementById(`assignButton${project.project_id}`);
        // Other button elements omitted for brevity
        
        if (assignButton) {
            assignButton.addEventListener('click', async (event) => {
                console.log(`Assign button clicked for project ID: ${project.project_id}`);
        
                // Fetch free users
                const response = await fetch('http://localhost:5000/project/free-users');
                const freeUsers = await response.json();
        
                // Populate the dropdown with user data
                const dropdown = document.getElementById('freeUsersDropdown') as HTMLSelectElement;
                if (dropdown) {
                    dropdown.innerHTML = ''; // Clear previous content
                    freeUsers.forEach((user: { id: string, name: string, email: string }) => { // Assume user has an id field
                        const option = document.createElement('option');
                        option.value = user.id; // Set the value to the user's id
                        option.textContent = `${user.name} - ${user.email}`;
                        dropdown.appendChild(option);
                    });
        
                    // Show the dropdown
                    dropdown.style.display = 'block';

                    // Add change event listener to dropdown
                    dropdown.addEventListener('change', async () => {
                        const userId = dropdown.value; // Get selected user id
                        if (userId) {
                            try {
                                const response = await fetch('http://localhost:5000/project/assign/', {
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
                                } else {
                                    console.error('Failed to assign project.');
                                }
                            } catch (error) {
                                console.error('Error assigning project:', error);
                            }
                        }
                    });
                }
            });
        }
        
        // Delete button listener
        const deleteButton = document.getElementById(`deleteButton${project.project_id}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', async (event) => {
                console.log(`Delete button clicked for project ID: ${project.project_id}`);
                const confirmed = confirm("Are you sure you want to delete this project?");
                if (confirmed) {
                    try {
                        // Send a DELETE request to the specified endpoint with the project ID
                        const response = await fetch(`http://localhost:5000/project/delete/${project.project_id}`, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            // Optionally, update the UI to reflect the deletion
                            const row = deleteButton.closest('tr');
                            if (row) {
                                row.remove(); // Remove the row from the table
                            }
                            console.log('Project deleted successfully');
                        } else {
                            console.error('Failed to delete project');
                        }
                    } catch (error) {
                        console.error('Error deleting project:', error);
                    }
                }
            });
        }
        // Add event listeners for other buttons
    });
}



// Add an event listener to the project form's submit button
document.getElementById('createButton')?.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Gather form data
  const projectNameInput = <HTMLInputElement>document.getElementById('name');
  const descriptionInput = <HTMLInputElement>document.getElementById('description');
  const startDateInput = <HTMLInputElement>document.getElementById('startDate');
  const deadlineInput = <HTMLInputElement>document.getElementById('deadline');

  const projectData = {
    project_name: projectNameInput.value,
    project_description: descriptionInput.value,
    start_date: startDateInput.value,
    deadline: deadlineInput.value,
    status: true
  };

  try {
    // Send a POST request to create the project
    const response = await fetch('http://localhost:5000/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      console.log('Project created successfully');
      // Optionally, you can update the UI to reflect the new project
    } else {
      console.error('Failed to create project');
    }
  } catch (error) {
    console.error('Error creating project:', error);
  }
});

// Function to add listeners to project buttons
function addProjectbuttonListeners(projects: Array<{ project_id: string }>) {
  projects.forEach(project => {
    const assignButton = document.getElementById(`assignButton${project.project_id}`);
    const deleteButton = document.getElementById(`deleteButton${project.project_id}`);

    if (assignButton) {
      assignButton.addEventListener('click', async () => {
        console.log(`Assign button clicked for project ID: ${project.project_id}`);

        // Fetch free users
        const response = await fetch('http://localhost:5000/project/free-users');
        const freeUsers = await response.json();

        // Populate the dropdown with user data
        const dropdown = <HTMLSelectElement>document.getElementById('freeUsersDropdown');
        if (dropdown) {
          dropdown.innerHTML = ''; // Clear previous content
          freeUsers.forEach((user: { user_id: string, name: string, email: string }) => {
            const option = document.createElement('option');
            option.value = user.user_id; // Set the user ID as the value
            option.textContent = `${user.name} - ${user.email}`;
            dropdown.appendChild(option);
          });

          // Show the dropdown
          dropdown.style.display = 'block';

          // Add event listener to the dropdown to handle user selection
          dropdown.addEventListener('change', async () => {
            const selectedUserId = dropdown.value;
            if (selectedUserId) {
              try {
                // Send a POST request to assign the user to the project
                const assignResponse = await fetch('http://localhost:5000/project/assign', {
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
                } else {
                  console.error('Failed to assign user');
                }
              } catch (error) {
                console.error('Error assigning user:', error);
              }
            }
          });
        }
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener('click', async () => {
        console.log(`Delete button clicked for project ID: ${project.project_id}`);
        const confirmed = confirm("Are you sure you want to delete this project?");
        if (confirmed) {
          try {
            // Send a DELETE request to delete the project
            const response = await fetch(`http://localhost:5000/project/delete/${project.project_id}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              console.log('Project deleted successfully');
              // Remove the project row from the table
              const row = deleteButton.closest('tr');
              if (row) {
                row.remove();
              }
            } else {
              console.error('Failed to delete project');
            }
          } catch (error) {
            console.error('Error deleting project:', error);
          }
        }
      });
    }
  });
}
