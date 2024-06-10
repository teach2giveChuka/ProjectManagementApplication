CREATE OR ALTER PROCEDURE deleteProject
    @project_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Projects
    WHERE project_id = @project_id;
END;
