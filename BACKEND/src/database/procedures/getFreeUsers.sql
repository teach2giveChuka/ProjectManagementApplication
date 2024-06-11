CREATE OR ALTER PROCEDURE getAllFreeUsers
AS
BEGIN
    -- Select desired user information (name, ID, email)
    SELECT id, name, email
    FROM Users
    WHERE status = 'free';  -- Filter by status = 'free'
END;
