CREATE TABLE Project (
    project_id VARCHAR(255) PRIMARY KEY NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    deadline DATE NOT NULL,
    status BIT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id),
    CONSTRAINT unique_user_project UNIQUE (user_id)
);
