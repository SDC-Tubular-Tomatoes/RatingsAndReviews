/*
create temporary table temp_product (
  id integer,
  name varchar(320),
  slogan varchar(320),
  description varchar(2000),
  category varchar(320),
  default_price integer
);

COPY temp_product (id,name,slogan,description,category,default_price)
FROM '/Users/juliek/HackReactor/rfp2303/__PROJECTS/SDC/RatingsAndReviews-J/CSV/product.csv'
DELIMITER ','
CSV HEADER;

insert into product(product_id)
select id
from temp_product;

drop table temp_product;

CREATE temporary TABLE temp_Reviews (
  Review_id serial PRIMARY KEY,
  Product_id INTEGER NULL DEFAULT NULL,
  rating INT NOT NULL,
  summary VARCHAR(120),
  body VARCHAR(1000) NOT NULL,
  recommend BOOL NOT NULL,
  response VARCHAR(1000),
  date bigint NOT NULL,
  reviewer_name VARCHAR(120) NOT NULL,
  reviewer_email VARCHAR(120) NOT NULL,
  helpfulness INT,
  reported boolean
);

COPY temp_Reviews (Review_id, Product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/juliek/HackReactor/rfp2303/__PROJECTS/SDC/RatingsAndReviews-J/CSV/reviews.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO Reviews (Review_id, Product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SELECT Review_id, Product_id, rating, to_timestamp(date/1000.00), summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM temp_Reviews;

drop table temp_Reviews;



COPY Characteristics (Characteristics_id, Product_id, characteristic_name)
FROM '/Users/juliek/HackReactor/rfp2303/__PROJECTS/SDC/RatingsAndReviews-J/CSV/characteristics.csv'
DELIMITER ','
CSV HEADER;


COPY ReviewCharacteristics (ReviewCharacteristic_ID, Characteristics_id, Review_id, characteristic_value)
FROM '/Users/juliek/HackReactor/rfp2303/__PROJECTS/SDC/RatingsAndReviews-J/CSV/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;


COPY ReviewPhotos (ReviewPhoto_id, Review_id, reviewPhoto_url)
FROM '/Users/juliek/HackReactor/rfp2303/__PROJECTS/SDC/RatingsAndReviews-J/CSV/reviews_photos.csv'
DELIMITER ','
CSV HEADER;


*/