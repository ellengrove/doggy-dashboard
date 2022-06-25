// define the URL Link
// REMEMBER CHANGE THE URL AND THE VAR ELEMENTS NOT TO PULL FROM THE API LINK!!!!!

url = `https://api.thedogapi.com/v1/breeds`

d3.json(url).then(function(data) {
  // height
  var height = data[1].height.imperial;
  // breed group
  var breedGroup = data[1].breed_group;
  // weight
  var weight = data[1].weight.imperial;
  // life span
  var lifeSpan = data[1].life_span;
  // dog name
  var names = data[1].name;

  // *****DROP DOWN*******
  for (let i = 0; i < names.length; i++) {
    let options = d3.select("#selDataset")
    options.append("option").text(names[i]).attr("value", names[i]);
  }

  // ***BAR PLOT***
  // Created a chart for weight vs breed group
  let trace1 = {
    x: breedGroup,
    y: weight,
    type: "bar",
  };

  // Data trace array
  let traceData = [trace1];

  // Apply title to the layout
  let layout = {
    title: "Breed Group vs Height",
    width: 500,
    height: 500,
  };

  // Render the plot
  Plotly.newPlot("avg-heigth", traceData, layout);


  // ***SCATTER PLOT***
  let trace2 = {
    x: lifeSpan,
    y: height,
    type: "scatter",
  };

  // Data trace array
  let traceData2 = [trace2];

  // Apply title to the layout
  let layout2 = {
    title: "Life Expectancy vs Hight",
    width: 500,
    height: 500,
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
    value: weight,
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
        range: [0, 9]
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
      type: 'rangeBar'
    },
    plotOptions: {
          bar: {
            horizontal: true
          }
           },
    series: [{
      data: [{
          x: "Cairn Terrier",
          y: [10, 15]
        },
      ]
    }]
  }

  var chart = new ApexCharts(document.querySelector("#weight-range"), options);

  chart.render();

});

// Change function for the drop down NEEDS WORK
function optionChanged(dropChange) {
  d3.json(url).then(function(data) {
    var metadata = data.temperament
    let array = metadata.filter(i => i.id == dropChange);
    let keys = Object.keys(array[0]);
    let values = Object.values(array[0]);
    for (let i = 0; i < keys.length; i++) {
      let dropdownMenu = d3.select("#Personality");
      dropdownMenu.append("p").text(`${keys[i]} : ${values[i]}`)
    }
  });
}

// // *****PERSONALITY INFO*******
//
let para = d3.select("#Personality")
para.append("option").text(names[i]).attr("value", names[i]);
