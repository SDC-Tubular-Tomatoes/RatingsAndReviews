DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
  Product_id serial PRIMARY KEY
);


DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews (
  Review_id serial PRIMARY KEY,
  Product_id INTEGER NULL DEFAULT NULL,
  rating INT NOT NULL,
  summary VARCHAR(60),
  body VARCHAR(1000) NOT NULL,
  recommend BOOL NOT NULL,
  response VARCHAR(1000),
  date TIMESTAMP NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  helpfulness INT,
  reported INT DEFAULT 0,
  FOREIGN KEY (Product_id)
    REFERENCES Product (Product_id)
);


DROP TABLE IF EXISTS Characteristics;
CREATE TABLE Characteristics (
  Characteristics_id serial PRIMARY KEY,
  Product_id INT NOT NULL,
  characteristic_name VARCHAR(60) NOT NULL,
  FOREIGN KEY (Product_id)
    REFERENCES Product (Product_id)
);

DROP TABLE IF EXISTS ReviewCharacteristics;
CREATE TABLE ReviewCharacteristics (
  ReviewCharacteristic_ID serial PRIMARY KEY,
  Review_id INT NOT NULL,
  Characteristics_id INT NOT NULL,
  characteristic_value INT NOT NULL,
  FOREIGN KEY (Review_id)
    REFERENCES Reviews (Review_id),
  FOREIGN KEY (Characteristics_id)
    REFERENCES Characteristics (Characteristics_id)
);


DROP TABLE IF EXISTS ReviewPhotos;
CREATE TABLE ReviewPhotos (
  ReviewPhoto_id serial PRIMARY KEY,
  Review_id INT NOT NULL,
  reviewPhoto_url VARCHAR(1000),
  FOREIGN KEY (Review_id)
    REFERENCES Reviews (Review_id)
);




-- Test Data
-- ---

-- INSERT INTO Reviews (Review_ID,Product_ID,rating,summary,body,recommend,response,date,reviewer_name,reviewer_email,helpfulness,reported) VALUES
-- (,,,,,,,,,,,);
-- INSERT INTO ReviewCharacteristics (ReviewCharacteristic_ID,Review_ID,characteristic_id,characteristic_value) VALUES
-- (,,,);
-- INSERT INTO ProductsCharacteristics (characteristic_id,Product_ID,characteristic_name) VALUES
-- (,,);
-- INSERT INTO ReviewPhotos (ReviewPhoto_ID,Review_ID,reviewPhoto_url) VALUES
-- (,,);
-- INSERT INTO Product (Product_ID) VALUES
-- ();