CREATE TABLE doggy_info (
id INT PRIMARY KEY,
breed_group VARCHAR,
name VARCHAR,
weight_lower DEC,
weight_upper DEC,
image_url VARCHAR,
height_lower DEC,
height_upper DEC,
bred_for TEXT,
temperament TEXT,
life_span_lower DEC,
life_span_upper DEC,
avg_height DEC,
avg_weight DEC,
avg_life DEC);

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
FOREIGN KEY (id) REFERENCES doggy_info(id));



SELECT * FROM doggy_info;

SELECT * FROM origins;