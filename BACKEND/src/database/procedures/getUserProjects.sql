CREATE OR ALTER PROCEDURE getUserProjects
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Project
    WHERE user_id = @user_id;
END;
