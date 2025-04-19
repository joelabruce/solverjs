CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS Purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_email NVARCHAR(320) NOT NULL UNIQUE,
  customer_key NVARCHAR(255) NOT NULL,
  customer_machine_id VARCHAR(255) NOT NULL DEFAULT 'Unspecified',
  purchase_date DATETIME NOT NULL,
  registration_date DATETIME NULL
);

DELIMITER $$

CREATE PROCEDURE AttemptLoginOrRegister(IN email NVARCHAR(320), IN machine_id NVARCHAR(255))
BEGIN
    DECLARE matching_email INT;
    DECLARE registered_email NVARCHAR(320);

    SELECT COUNT(*) INTO matching_email
    FROM Purchases
    WHERE customer_email = email;

    IF matching_email = 0 THEN
    -- Email not found, need to purchase on website
        SELECT 0 as success, '0. Email not found, need to purchase first!' as prompt;
    ELSE
    -- Email found, see if machine id found
        SELECT COUNT(*) INTO registered_email
        FROM Purchases
        WHERE customer_email = email AND customer_machine_id = machine_id;

        If registered_email > 0 THEN
        -- Login success!
            SELECT 1 as success, '2. Login success!' as prompt;
        ELSE
        -- Login not successful, register machine_id
            CALL RegisterEmailWithMachineId(email, machine_id);
            SELECT 1 as success, '1. Registered new machine, login success!' as prompt;
        END IF;
    END IF;
END $$

CREATE PROCEDURE Purchase(IN email NVARCHAR(320), IN purchase_key NVARCHAR(255))
BEGIN
    INSERT INTO Purchases (customer_email, customer_key, purchase_date)
    VALUES (email, purchase_key, NOW());

    SELECT purchase_key;
END $$

CREATE PROCEDURE RegisterEmailWithMachineId(IN email NVARCHAR(320), IN machine_id NVARCHAR(255))
BEGIN
   UPDATE Purchases 
   SET customer_machine_id = machine_id, registration_date = NOW()
   WHERE customer_email = email;
END $$

DELIMITER ;