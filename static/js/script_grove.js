// *****DROP DOWN MENU*******
d3.json('/api/doggy_dash').then(function(data) {

  var names = data.map(d => d.name);

  for (let i = 0; i < names.length; i++) {
    let options = d3.select("#selDataset")
    options.append("option").text(names[i]).attr("value", names[i]);
  }
});

// initialize data when page is opened
function init(breed) {
    breed = "Affenpinscher"
    optionChanged(breed);
}
init();

// PERSONALITY BOX UPDATE
function optionChanged(dropChange) {
    d3.json('/api/doggy_dash').then(function(data) {
    

        // clear all text in boxes displaying bred for/temperament info
        d3.selectAll('p').remove();
        
        let dog = data.filter(i => i.name === dropChange);
        var personality = dog[0].temperament.split(',')
        let temperamentBox = d3.select("#Personality");

        // populate temperament box
        for (let i = 0; i < personality.length;i++) {
            temperamentBox.append("p").text(`${personality[i]}`)
        } 

        var bred_for = dog[0].bred_for.split(',');
        let bredforBox = d3.select("#bred-for");

        var image_url = dog[0].image_url.split(',');
        let imageBox = d3.select("#image");  
        imageBox.selectAll('img').remove();

        // populate bred for box
        for (let i = 0; i < bred_for.length;i++) {
            bredforBox.append("p").text(`${bred_for[i]}`)
        }
    
        // collect all data of same breed group
        var subset = data.filter(b => b.breed_group === dog[0].breed_group)  

        // populate the image
        for (let i = 0; i < image_url.length;i++) {
            imageBox.append("img").attr('src', image_url[i]).attr('width', 500).attr('height', 400);
        }


      // ***BAR PLOT***

        // make colors array for bar chart
        var barColors = []
        for (let i = 0; i < subset.length;i++) {
            if (subset[i].name === dog[0].name) {
                barColors.push('#f1df22')
            }
            else barColors.push('#519dae')
        };

        let trace1 = {
        x: subset.map(d => d.name),
        y: subset.map(d => Number(d.avg_weight)),
        type: "bar",
        marker: {
            color : barColors
        }
        };

        // Data trace array
        let traceData = [trace1];

        // Apply title to the layout
        let layout = {
        title: "Height by Breed",
        width: 500,
        height: 500,
        xaxis: {
            tickangle: -45,
            showticklabels: false,
            title: {
                text : `Breed Group: ${dog[0].breed_group}`
            }
        }
        };

        // Render the plot
        Plotly.newPlot("avg-heigth", traceData, layout);

        // set color and size arrays for scatter plot
        var markerColors = []
        var markerSize = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == dog[0].name) {
                markerColors.push('#f1df22');
                markerSize.push(18)
            }
            else 
                markerColors.push('#519dae')
                markerSize.push(6)
        };
        // console.log(markerSize)

        // ***SCATTER PLOT***
        let trace2 = {
        x: data.map(d => Number(d.avg_life)),
        y: data.map(d => Number(d.avg_height)),
        type: "scatter",
        mode: "markers",
        marker: {
            size : markerSize,
            color : markerColors
        }
        };

        // Data trace array
        let traceData2 = [trace2];

        // Apply title to the layout
        let layout2 = {
        title: "Life Expectancy versus Heigth",
        width: 500,
        height: 500,
        xaxis: {
                range: [0, 20],
                title: {
                    text: "Life Span"
                }
            },
        yaxis: {
                range: [0, 35],
                title : {
                    text: "Avg. Height"
                }
            }
        };

        // Render the plot
        Plotly.newPlot("life-expec", traceData2, layout2);


        // ***GAUGE PLOT***
        var gaugeChart = [{
        domain: {
            'x': [0, 1],
            'y': [0, 1]
        },
        marker: {
            size: 28,
            color: '850000'
        },
        value: dog[0].avg_weight,
        mode: "gauge+number+delta",
        title: 'Average Weight',
        type: 'indicator',
        delta: {
            'reference': 380
        },
        mode: 'gauge+number',
        gauge: {
            bar: {
            color: 'green'
            },
            axis: {
            visible: true,
            range: [0, 200]
            }
        },
        steps: [{
            range: [0, 1],
            color: 'rgb(253, 162, 73)'
        }, ]
        }];
        var gaugeLayout = {
        width: 500,
        height: 500,
        line: {
            color: '60000'
        },
        };
        Plotly.newPlot('avg-weight', gaugeChart, gaugeLayout);


    // ***Weight Range APEXCHARTS***

    
    var options = {
        chart: {
          height: 600,
          width: 900,
          type: 'rangeBar',
          background: '#fff'
        },
        plotOptions: {
              bar: {
                horizontal: true
              }
               },
        series: [{
          data: [{
              x: dog[0].name,
              y: [dog[0].weight_lower, dog[0].weight_upper],
          }],
            yaxis: {
                min: 500,
                max: 200,
                },    
        }],
      };
      var chart = new ApexCharts(document.querySelector("#weight-range"), options);
      chart.render();
      chart.updateSeries([{
        data: [{
          x: dog[0].name,
          y: [dog[0].weight_lower, dog[0].weight_upper],
        }, 
    ]
      }])
  })
}