CREATE OR ALTER PROCEDURE getUserProjects
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Projects
    WHERE id = @user_id;
END;
