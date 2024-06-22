CREATE OR ALTER PROCEDURE createProject(
    @project_id VARCHAR(255),
    @project_name VARCHAR(255),
    @project_description VARCHAR(255),
    @start_date DATE,
    @deadline DATE,
    @status BIT
)
AS
BEGIN
    INSERT INTO Projects(project_id, project_name, project_decription, start_date, deadline, status, id)
    VALUES(@project_id, @project_name, @project_description, @start_date, @deadline, @status, NULL);
END
