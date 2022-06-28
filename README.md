# Doggy-Dashboard



## Background:

Dogs are known as man's best friend.   


## Project Goal:


## Technologies:

Python, Jupyter Notebook, HTML, Javascript, CSS, Petfinder Data 


## Contributors:

Zach Meader, Anne Pizzini, Joshua Yesufu, Ellen Grove

## Data Source

## Table of Contents:



### 1. Pull and Clean Data

### 2. Postgres Database

### 3. Flask Application

Once the Postgres database was created on each local machine, a connection needed to be made between the doggy_db and JavaScript. To do this, we created an application using Flask to create a connection to the database and save each table through `automap_base()`. Additionally, multiple routes were created for our html files along with transforming the data from a table format into Json. This was completed by querying the proper data via `session.query` and then appending each element to a list which becomes available from the route strings, `/api/doggy_dash` and `/api/top_breeds`.

![Flask_API](/static/Images/apppy.png)

### 4. Doggy Dashboard/HTML

To create the dashboard, we had to design the layout of each element which was completed through bootstrap. A navigation bar was created to access the map along with a hero banner to display the lovely group photo of dogs. Beneath that, a carousel was added to add more photos of dogs and their ranking by the team. Lastly, rows and columns were created for each graph to have a specific position among the dashboard along with a drop down that allows the user to access the facts for each type of breed. 

![Group_Dog](/static/Images/Banner.jpg)

![Carousel](/static/Images/Carousel.jpg)

### 5. Doggy Dashboard/JS

Once the flask application is active, the data is accessed via D3. The first step we took to incorporate a user active interface was through a drop-down menu which was created by setting up a ‘for loop’ and appending each name from the data. Once the drop-down options have been pushed, an `optionChanged` function was created for each graph / visualization to update once the user has selected a new dog. One of the charts created is a Plotly bar plot that highlights the current dog and compares the height to different breed groups. Additionally, a scatter plot was created to also highlight the current dog vs. other breeds based on their life expectancy vs. their height. Furthermore, there is a gauge chart showing the average weight for that specific dog. Lastly, there is also a chart, using the ApexCharts library, that displays the weight range of the dog. The ApexCharts library was used to add more visualization options from which to work. 

![Dash_1](/static/Images/Dash_1.png)

![Dash_2](/static/Images/Dash_2.png)

### 6. Doggy Map

The idea behind the map was to help the user visualize where on earth do most dog breeds come from. By utilizing the leaflet maps library, we were able to access the google maps API to pull proper latitude and longitude numbers that correspond to the city where the dog breed originated. After each marker was added to the map, through a for loop, the label was updated with a dog print via a saved picture. 

![Map](/static/Images/Doggy_world.png)

## Conclusion

The premise of this project was to allow the user to better understand information by providing an interface from which they can interact. Once we found the dog data and uploaded to the Postgres database, we were able to utilize JavaScript to enhance each visualization and have them react to which dog breed is selected in the drop down. This way, hopefully, the user can gain a better understanding of each dog breed and have further detail into their background to eventually purchase the perfect dog!