

CREATE view View_metaData_rating
AS
SELECT Product_Id, rating, COUNT(Review_Id) as count
FROM Reviews
GROUP BY Product_Id, rating;


CREATE view View_metaData_recommended
AS
SELECT Product_Id, recommend, COUNT(Review_Id) as count
FROM Reviews
GROUP BY Product_Id, recommend;


CREATE view View_metaData_characteristics
AS
SELECT Product_id, characteristic_name, c.Characteristics_id, AVG(characteristic_value) AS avg
FROM ReviewCharacteristics rc
JOIN Characteristics c ON rc.Characteristics_id=c.Characteristics_id
GROUP BY Product_id, characteristic_name, c.Characteristics_id

/*
CREATE INDEX index_matView_metaData_rating
ON matView_metaData_rating (Product_Id);

CREATE INDEX index_matView_metaData_recommended
ON matView_metaData_recommended (Product_Id);

CREATE INDEX index_matView_metaData_characteristics
ON matView_metaData_characteristics (Product_Id);
*/