CREATE TABLE customer (
    customer_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    gender CHAR(1) DEFAULT NULL,
    role ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    password VARCHAR(255) NOT NULL,
    status ENUM('REGISTERED', 'VERIFIED') DEFAULT 'REGISTERED',
    PRIMARY KEY (customer_id)
);

CREATE TABLE address (
    address_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    flat_no INT DEFAULT NULL,
    building_name VARCHAR(255) DEFAULT NULL,
    locality VARCHAR(255) DEFAULT NULL,
    area VARCHAR(255) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    district VARCHAR(100) DEFAULT NULL,
    pincode VARCHAR(20) DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    KEY (city),
    KEY (pincode)
);


CREATE TABLE email_verification (
    id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    KEY (customer_id)
);
