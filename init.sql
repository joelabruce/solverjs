CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS Purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL UNIQUE,
  customer_key NVARCHAR(255) NOT NULL,
  customer_machine_id VARCHAR(255) NOT NULL DEFAULT 'Unspecified',
  purchase_date DATETIME NOT NULL,
  registration_date DATETIME NULL
);

DELIMITER $$

CREATE PROCEDURE AttemptLoginOrRegister(IN email NVARCHAR(255), IN machine_id NVARCHAR(255))
BEGIN
    DECLARE matching_email INT;
    DECLARE registered_email NVARCHAR(255);

    SELECT COUNT(*) INTO matching_email
    FROM Purchases
    WHERE customer_email = email;

    IF matching_email = 0 THEN
    -- Email not found, need to purchase on website
        SELECT 'Email not found, need to purchase first!';
    ELSE
    -- Email found, see if machine id found
        SELECT COUNT(*) INTO registered_email
        FROM Purchases
        WHERE customer_email = email AND customer_machine_id = machine_id;

        If registered_email > 0 THEN
        -- Login success!
            SELECT registered_email;
        ELSE
        -- Login not successful, register machine_id
            CALL RegisterEmailWithMachineId(email, machine_id);
            SELECT 'Registered new machine!';
        END IF;
    END IF;
END $$

CREATE PROCEDURE Purchase(IN email NVARCHAR(255), IN purchase_key NVARCHAR(255))
BEGIN
    INSERT INTO Purchases (customer_email, customer_key, purchase_date)
    VALUES (email, purchase_key, NOW());

    SELECT 'Purchase successful!' + purchase_key;
END $$

CREATE PROCEDURE RegisterEmailWithMachineId(IN email NVARCHAR(255), IN machine_id NVARCHAR(255))
BEGIN
   UPDATE Purchases 
   SET customer_machine_id = machine_id, registration_date = NOW()
   WHERE customer_email = email;
END $$

DELIMITER ;