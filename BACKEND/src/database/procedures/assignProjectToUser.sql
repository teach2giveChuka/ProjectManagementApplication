CREATE OR ALTER PROCEDURE assignProjectToUser
    @project_id VARCHAR(255),
    @user_id VARCHAR(255)
AS
BEGIN
    UPDATE Project
    SET user_id = @user_id
    WHERE project_id = @project_id;
END;
