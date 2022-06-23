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
Passenger = Base.classes.passenger

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


## Create routes for the different data needed
@app.route("/")
def welcome();
    """List API routes"""
    return render_template('index.html')

@app.route()
def 