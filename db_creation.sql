CREATE TABLE breeds (
breed_group VARCHAR,
weight_upper DEC,
description VARCHAR,
name VARCHAR,
id INT PRIMARY KEY,
image_url VARCHAR,
life_span_upper DEC,
height_upper DEC,
bred_for VARCHAR,
temperament VARCHAR,
life_span_lower DEC,
weight_lower DEC,
height_lower DEC);

CREATE TABLE origins (
index INT,
rank VARCHAR,
origin VARCHAR,
lat_unadj DEC,
lng_unadj DEC,
lat DEC,
lng DEC, 
name VARCHAR,
id INT,
FOREIGN KEY (id) REFERENCES breeds(id));

SELECT * FROM breeds;

SELECT * FROM origins;
