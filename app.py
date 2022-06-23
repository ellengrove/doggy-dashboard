#  Dependencies 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template  
import json 


#################################################
# Database Setup
#################################################
engine = create_engine("sqlurl")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Doggy = Base.classes."dog_table_name"

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
    results = session.query(Doggy.name, Doggy.breed_group, Doggy.avg_height, Doggy.avg_weight, Doggy.avg_life, Doggy.temperament).all()

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
        doggy_dict{"temperament"} = temperament
        all_dogs.append(doggy_dict)

    return jsonify(all_dogs)

@app.route("../data/top_dogs.json")
def ports();
    with open("./data/top_dogs.json") as file:
        json_decoded = json.load(file)

    return json_decoded


if __name__ == '__main__':
    app.run(debug=True)