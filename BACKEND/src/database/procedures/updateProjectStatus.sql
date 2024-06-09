CREATE OR ALTER PROCEDURE updateProjectStatus
    @project_id VARCHAR(255),
    @project_status BIT
AS
BEGIN
    UPDATE Project
    SET status = @project_status
    WHERE project_id = @project_id;
END;
