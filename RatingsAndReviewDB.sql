DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
  Product_id serial PRIMARY KEY
);


DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews (
  Review_id serial PRIMARY KEY,
  Product_id INTEGER NULL DEFAULT NULL,
  rating INT NOT NULL,
  summary VARCHAR(120),
  body VARCHAR(1000) NOT NULL,
  recommend BOOL NOT NULL,
  response VARCHAR(1000),
  date TIMESTAMP NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  helpfulness INT,
  reported boolean,
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


CREATE INDEX index_Reviews_ProductId ON Reviews (Product_Id, rating, recommend);
-- CREATE INDEX index_Reviews_date ON Reviews (date);
-- CREATE INDEX index_Reviews_helpfulness ON Reviews (helpfulness);
-- CREATE INDEX index_Reviews_date_helpfulness ON Reviews (helpfulness, date);
CREATE INDEX index_ReviewPhotos_ReviewId ON ReviewPhotos (Review_id);


CREATE INDEX index_Characteristics_ProductId ON Characteristics (Product_Id, characteristic_name);
CREATE INDEX index_ReviewCharacteristics_CharacteristicsId ON ReviewCharacteristics (Characteristics_id, characteristic_value);
-- CREATE INDEX index_ReviewCharacteristics_ReviewId ON ReviewCharacteristics (Review_Id);
