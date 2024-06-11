CREATE OR ALTER PROCEDURE assignProjectToUser
    @project_id VARCHAR(255),
    @id VARCHAR(255)
AS
BEGIN
    UPDATE Projects
    SET id = @id
    WHERE project_id = @project_id;

    SELECT * FROM Projects WHERE project_id = @project_id

END;
