CREATE TABLE Projects (
  project_id VARCHAR(255) PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  project_decription VARCHAR(255),
  start_date DATE NOT NULL,
  deadline DATE NOT NULL,
  status BIT NOT NULL,
  id VARCHAR(255) 
);
