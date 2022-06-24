#  Dependencies 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import protocol, username, password, host, port
from flask import Flask, jsonify, render_template  
import simplejson as json
from decimal import Decimal


# json.dumps(Decimal('3.9'), use_decimal=True)
# print(s)

#################################################
# Database Setup
#################################################

database_name = 'doggy_db'

dog_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'

engine = create_engine(dog_connection_string)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# print(Base.classes.keys())
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
def welcome():
    """List API routes"""
    return render_template('index.html')

@app.route('/api/doggy_dash')
def dog_data():

    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Doggy.name, Doggy.breed_group, Doggy.avg_height, Doggy.avg_weight, Doggy.avg_life, Doggy.temperament, Doggy.weight_lower, Doggy.weight_upper, Doggy.height_lower, Doggy.height_upper, Doggy.life_span_lower, Doggy.life_span_upper).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_dogs = []
    for name, breed_group, avg_height, avg_weight, avg_life, temperament, weight_lower, weight_upper, height_lower, height_upper, life_span_lower, life_span_upper  in results:
        doggy_dict = {}
        doggy_dict["name"] = name
        doggy_dict["breed_group"] = breed_group
        doggy_dict["avg_height"] = json.dumps(Decimal(avg_height), use_decimal=True)
        doggy_dict["avg_weight"] = json.dumps(Decimal(avg_weight), use_decimal=True)
        doggy_dict["avg_life"] = json.dumps(Decimal(avg_life), use_decimal=True)
        doggy_dict["temperament"] = temperament
        doggy_dict["weight_lower"] = json.dumps(Decimal(weight_lower), use_decimal=True)
        doggy_dict["weight_upper"] =  json.dumps(Decimal(weight_upper), use_decimal=True)
        doggy_dict["height_lower"] =  json.dumps(Decimal(height_lower), use_decimal=True)
        doggy_dict["height_upper"] = json.dumps(Decimal(height_upper), use_decimal=True)
        doggy_dict["life_span_lower"] = json.dumps(Decimal(life_span_lower), use_decimal=True)
        doggy_dict["life_span_upper"] = json.dumps(Decimal(life_span_upper), use_decimal=True)
        all_dogs.append(doggy_dict)

    return jsonify(all_dogs)

@app.route("/api/top_breeds")
def map_data():
    
    session = Session(engine)

    results = session.query(Breeds.lat, Breeds.lng, Breeds.name, Breeds.origin)

    session.close()

    all_breeds = []
    for lat_unadj, lng_unadj, name, origin in results:
        breed_dict = {}
        breed_dict["lat"] = json.dumps(Decimal(lat), use_decimal=True)
        breed_dict["lng"] = json.dumps(Decimal(lng), use_decimal=True)
        breed_dict["name"] = name
        breed_dict["origin"] = origin
        ## also need the image url from the Doggy table
        all_breeds.append(breed_dict)

    return jsonify(all_breeds)


if __name__ == '__main__':
    app.run(debug=True)