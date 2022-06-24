#  Dependencies 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import protocol, username, password, host, port
from flask import Flask, jsonify, render_template  
import json 


#################################################
# Database Setup
#################################################

database_name = 'doggy_db'

dog_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'

engine = create_engine(rds_connection_string)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Doggy = Base.classes.doggy_info

Breeds = Base.classes.origins

## can you create two base classes for two seperate tables?
## can you pull two seperate tables for one app.route?


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


## Create routes for the different data needed
@app.route("/")
def welcome();
    """List API routes"""
    return render_template('index.html')

@app.route(____)
def dog_data('____________');

    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Doggy.name, Doggy.breed_group, Doggy.avg_height, Doggy.avg_weight, Doggy.avg_life, Doggy.temperament, Doggy.weight_lower, Doggy.weight_upper, Doggy.height_lower, Doggy.height_upper, Doggy.life_span_lower, Doggy.life_span_upper).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_dogs = []
    for name, breed_group, avg_height, avg_weight, avg_life in results:
        doggy_dict = {}
        doggy_dict["name"] = name
        doggy_dict["breed_group"] = breed_group
        doggy_dict["avg_height"] = avg_height
        doggy_dict["avg_weight"] = avg_weight
        doggy_dict["avg_life"] = avg_life
        doggy_dict["temperament"] = temperament
        doggy_dict["weight_lower"] = weight_lower
        doggy_dict["weight_lower"] = weight_lower
        doggy_dict["height_lower"] = height_lower
        doggy_dict["height_upper"] = height_upper
        doggy_dict["life_span_lower"] = life_span_lower
        doggy_dict["life_span_upper"] = life_span_upper
        all_dogs.append(doggy_dict)

    return jsonify(all_dogs)

@app.route("../data/top_dogs.json")
def ports();
    
    session = Session(engine)

    results = session.query(Breeds.lat, Breeds.lng, Breeds.name, Breeds.origin)

    session.close()

    all_breeds = []
    for lat, lng, name, origin in results:
        breed_dict = {}
        breed_dict["lat"] = lat
        breed_dict["lng"] = lng
        breed_dcit["name"] = name
        breed_dict["origin"] = origin
        ## also need the image url from the Doggy table
        all_breeds.append(breed_dict)

    return jsonify(all_breeds)


if __name__ == '__main__':
    app.run(debug=True)