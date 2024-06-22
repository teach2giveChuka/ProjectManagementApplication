CREATE OR ALTER PROCEDURE loginUser
    @email VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    SELECT email, password
    FROM Users
    WHERE email = @email;
END;
