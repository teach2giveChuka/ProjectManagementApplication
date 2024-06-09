CREATE OR ALTER PROCEDURE createProject(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @start_date DATE,
    @end_date DATE,
    @status BIT
)
AS
BEGIN
    INSERT INTO Project(project_id, project_name, start_date, deadline, status, user_id)
    VALUES(@id, @name, @start_date, @end_date, @status, NULL)
END