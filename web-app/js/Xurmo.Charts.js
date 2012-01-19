var TURFINSIGHT = TURFINSIGHT || {}
TURFINSIGHT.Chart = TURFINSIGHT.Chart || {}
var jsMap = new TURF.Util.KeyValueStore();

// Flot Library Wrapper Object

TURFINSIGHT.Chart.Flot = function() {
	this.type = 'Flot'
	this.plotMethod = $.plot

	// Pie Chart Transformation and Plot Method
	
	this.drawPieChart = function(chart) {
		var formattedData = []
		var targetDiv = $('#' + chart.targetDiv)
		var formattedOptions

		for (i = 0; i < chart.data[0].length; i++) {
			formattedData[i] = {
				label : chart.data[0][i],
				data : chart.data[1][i]
			}
		}

		formattedOptions = {
			series : {
				pie : {
					show : true,
					radius : chart.options.radius,
					label : chart.options.label,
					innerRadius : chart.options.innerRadius,
				}
			},
			legend : {
				show : chart.options.legend
			},
			grid : {
				clickable : chart.options.clickable,
				hoverable : chart.options.hoverable
			}
		}

		formattedOptions.series.pie.label.formatter = function(label, series) {
			return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
					+ label + '<br/>' + Math.round(series.percent) + '%</div>';
		}

		this.plotMethod(targetDiv, formattedData, formattedOptions);

	}

	//Line Chart Transformation and Plot Method
	
	this.drawLineChart = function(chart) {
		var formattedData = []
		var targetDiv = $('#' + chart.targetDiv)
		var formattedOptions

		if (chart.legend == undefined) {
			chart.legend = []
			for (i = 0; i < chart.data.length - 1; i++) {
				chart.legend[i] = "Series" + (i + 1)
			}
		} else if (chart.legend.length != chart.data.length - 1) {
			var newLegends = []
			for (i = 0; i < chart.data.length - 1; i++) {
				if (chart.legend[i] == undefined) {
					newLegends[i] = "Series" + (i + 1)
				} else {
					newLegends[i] = chart.legend[i]
				}
			}
			chart.legend = newLegends
		}

		if(chart.labels == undefined) {
			chart.labels = []
			for (i = 0; i < chart.data[0].length; i++) {
				chart.labels[i] = "Label" + (i + 1)
			}
		}
		
		chart.ticks = []
		for (i = 0; i < chart.labels.length; i++) {
			var eachTick = []
			eachTick[0] = chart.data[0][i]
			eachTick[1] = chart.labels[i]
			chart.ticks[i] = eachTick
		}

		for (i = 1; i < chart.data.length; i++) {
			var eachData = []
			for (j = 0; j < chart.data[0].length; j++) {
				eachData[j] = [ chart.data[0][j], chart.data[i][j] ]
			}
			formattedData[i - 1] = {
				label : chart.legend[i - 1],
				data : eachData
			}
		}

		if(chart.options.type==undefined){
			chart.options.type = {}
		}
		
		chart.options.type.lines = true

		if (chart.options.type.interactive) {
			chart.options.type.points = true
			chart.options.type.lines = true
		} else if (chart.options.type.points) {
			chart.options.type.lines = false
		}

		formattedOptions = {
			series : {
				color : chart.options.color,
				threshold : chart.options.threshold,
				lines : {
					show : chart.options.type.lines,
					fill : chart.options.type.fill,
					steps : chart.options.type.steps
				},
				points : {
					show : chart.options.type.points
				}
			},
			xaxis : {
				ticks : chart.ticks
			},
			legend : {
				show : chart.options.legend
			},
			grid : {
				clickable : chart.options.clickable,
				hoverable : chart.options.hoverable
			}
		}

		this.plotMethod(targetDiv, formattedData, formattedOptions);

	}

	// Bar Chart Transformation and Plot Method
	
	this.drawBarChart = function(chart) {
		var formattedData = []
		var targetDiv = $('#' + chart.targetDiv)
		var formattedOptions
		var barData = []
		var seriesData = []

		if (chart.legends == undefined) {
			chart.legends = []
			for (i = 0; i < chart.data.length; i++) {
				chart.legends[i] = "Series" + (i + 1)
			}
		}

		if (chart.legends.length < chart.data.length) {
			for (i = 0; i < chart.data.length; i++) {
				if (chart.legends[i] == undefined) {
					chart.legends[i] = "Series" + (i + 1)
				}
			}
		}

		if (chart.labels == undefined) {
			chart.labels = []
			for (i = 0; i < chart.data[0].length; i++) {
				chart.labels[i] = "Label" + (i + 1)
			}
		}

		var barTicks = []
		for (i = 0; i < chart.labels.length; i++) {
			barTicks[i] = [ i + 1, chart.labels[i] ]
		}

		for (j = 0; j < chart.data.length - 1; j++) {
			var barData = []
			for (i = 0; i < chart.data[0].length; i++) {
				barData[i] = [ chart.data[0][i], chart.data[j + 1][i] ]
			}
			var ink = barData
			seriesData[j] = barData
		}

		for (i = 0; i < chart.legends.length - 1; i++) {
			formattedData[i] = {
				label : chart.legends[i],
				data : seriesData[i]
			}
		}

		formattedOptions = {
			series : {
				bars : {
					show : true,
					barWidth : chart.options.bars.barWidth,
					align : chart.options.bars.align,
					series_spread : true,
					horizontal : chart.options.bars.horizontal
				}
			},
			legend : {
				show : true
			},
			xaxis : {
				ticks : barTicks,
				autoscaleMargin : .10
			}
		}

		this.plotMethod(targetDiv, formattedData, formattedOptions);
	}

	//Stacked Chart Transformation and Plot Method
	
	this.drawStackedBarChart = function(chart) {
		var formattedData = []
		var targetDiv = $('#' + chart.targetDiv)
		var formattedOptions
		var seriesData = []

		if (chart.legends == undefined) {
			chart.legends = []
			for (i = 0; i < chart.data.length; i++) {
				chart.legends[i] = "Series" + (i + 1)
			}
		}

		if (chart.legends.length < chart.data.length) {
			for (i = 0; i < chart.data.length; i++) {
				if (chart.legends[i] == undefined) {
					chart.legends[i] = "Series" + (i + 1)
				}
			}
		}

		if (chart.labels == undefined) {
			chart.labels = []
			for (i = 0; i < chart.data[0].length; i++) {
				chart.labels[i] = "Label" + (i + 1)
			}
		}


		var stackedBarTicks = []
		for (i = 0; i < chart.labels.length; i++) {
			stackedBarTicks[i] = [ i + 1, chart.labels[i] ]
		}

		for (j = 0; j < chart.data.length - 1; j++) {
			var barData = []
			for (i = 0; i < chart.data[0].length; i++) {
				barData[i] = [ chart.data[0][i], chart.data[j + 1][i] ]
			}
			var ink = barData
			seriesData[j] = barData
		}

		for (i = 0; i < chart.legends.length; i++) {
			formattedData[i] = {
				label : chart.legends[i],
				data : seriesData[i]
			}
		}

		formattedOptions = {
			series : {
				stack : chart.options.stack,
				lines : chart.options.lines,
				bars : {
					show : true,
					barWidth : chart.options.bars.barWidth,
					align : chart.options.bars.align,
					horizontal : chart.options.bars.horizontal
				}
			},
			legend : {
				show : true
			},
			xaxis : {
				ticks : stackedBarTicks
			}
		}
		this.plotMethod(targetDiv, formattedData, formattedOptions);
	}
}

 //JqPlot Library Wrapper Object

TURFINSIGHT.Chart.JqPlot = function() {
	this.type = 'JqPlot'
	this.plotMethod = jQuery.jqplot
	this.draw = function(chart) {
		var formattedData = [ chart.data ]
		var targetDiv = chart.targetDiv
		var formattedOptions = chart.options
		this.plotMethod(targetDiv, formattedData, formattedOptions);
	}

}

  //BootStrap Code

		(function() {
			TURFINSIGHT.Chart.ChartFactory = function() {
				this.library
				this.instance
			}
			TURFINSIGHT.Chart.ChartFactory.getInstance = function() {
				TURFINSIGHT.Chart.ChartFactory.library = 'flot' // This Will Be
																// Read as Part
																// Of
																// Configuration
				if (!TURFINSIGHT.Chart.ChartFactory.instance) {
					switch (TURFINSIGHT.Chart.ChartFactory.library) {
					case 'flot':
						TURFINSIGHT.Chart.ChartFactory.instance = new TURFINSIGHT.Chart.Flot();
						break;
					case 'jqPlot':
						TURFINSIGHT.Chart.ChartFactory.instance = new TURFINSIGHT.Chart.JqPlot();
						break;
					}
				}
				return TURFINSIGHT.Chart.ChartFactory.instance;
			}
			TURFINSIGHT.Chart.ChartLibrary = TURFINSIGHT.Chart.ChartFactory
					.getInstance()
		}());

 // Check if a List Contains all Numbers
		
TURFINSIGHT.Chart.isAllNumbers = function(list) {
	var result = true
	for (i = 0; i < list.length; i++) {
		if (isNaN(list[i])) {
			result = false
			break
		}
	}
	return result
}

//Check if a list contain all Text

TURFINSIGHT.Chart.isAllText = function(list) {
	var result = true
	for (i = 0; i < list.length; i++) {
		if (!isNaN(list[i])) {
			result = false
			break
		}
	}
	return result
}

//Get Frequency Map of a List

TURFINSIGHT.Chart.getFrequencyOfColoumnElements = function(list) {
	jsMap.clear()
	for (i = 0; i < list.length; i++) {
		if (jsMap.get(list[i]) != null) {
			jsMap.push(list[i], parseInt(jsMap.get(list[i])) + 1)
		} else {
			jsMap.push(list[i], 1)
		}
	}
	return jsMap
}

// Merge 2 Arrays into Single Array

TURFINSIGHT.Chart.mergeSingleDimArrays = function(array1, array2) {
	var mergedArray = []
	mergedArray.push(array1)
	mergedArray.push(array2)
	return mergedArray
}

//Pie Chart Wrapper Object

TURFINSIGHT.Chart.PieChart = function() {

	this.success = true;
	this.data = []

	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setData = function(data) {
		this.data = null
		if (data.length == 1) {
			this.data = processDataWithOneColoumn(data[0])
		} else if (data.length >= 2) {
			this.data = processDataWithMultipleColoumns(data[0], data[1])
		}
	}

	var processDataWithOneColoumn = function(coloumn) {
		var resultData = []
		var isAllNumbers = TURFINSIGHT.Chart.isAllNumbers(coloumn)
		if (isAllNumbers == true) {
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn,
					coloumn)
		} else {
			var freqMap = TURFINSIGHT.Chart
					.getFrequencyOfColoumnElements(coloumn)
			var freq = []
			var legends = freqMap.keys()
			$.each(legends, function(index, value) {
				freq.push(jsMap.get(value))
			});
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(legends, freq)
		}
		return resultData
	}

	var processDataWithMultipleColoumns = function(coloumn1, coloumn2) {
		if (TURFINSIGHT.Chart.isAllNumbers(coloumn2)) {
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn1, coloumn2)
		} else if (TURFINSIGHT.Chart.isAllNumbers(coloumn1)) {
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn2, coloumn1)
		} else {
			return null
		}
	}
	this.setLegendAndValues = function(legend, values) {
		this.data = TURFINSIGHT.Chart.mergeSingleDimArrays(legend, values)
		if (values.length != legend.length) {
			this.success = false;
		}
		for (i = 0; i < values.length; i++) {
			if (isNaN(values[i])) {
				this.success = false;
			}
		}
	}

	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv, data, options) {
		if (targetDiv != undefined) {
			this.setTargetDiv(targetDiv)
		}
		if (data != undefined) {
			this.setData(data)
		}
		if (options != undefined) {
			this.setOptions(options)
		}
		if (this.targetDiv != undefined && this.data != undefined
				&& this.options != undefined) {
			TURFINSIGHT.Chart.ChartLibrary.drawPieChart(this)
		}
	}

}

// Line Chart Wrapper Object

TURFINSIGHT.Chart.LineChart = function() {

	this.success = true;
	this.data = []

	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setLegend = function(legend) {
		this.legend = legend
	}

	this.setLabels = function(labels) {
		this.labels = labels
	}

	this.setData = function(data) {
		this.data = null
		if (data.length == 1) {
			this.data = processDataWithOneColoumn(data[0])
		} else if (data.length >= 2) {
			this.data = processDataWithMultipleColoumns.call(this, data)
		}
	}

	var processDataWithOneColoumn = function(yAxis) {
		var resultData = null
		var isAllText = TURFINSIGHT.Chart.isAllText(yAxis)
		if (isAllText == false) {
			resultData = []
			var xAxis = []
			for (i = 0; i < yAxis.length; i++) {
				xAxis[i] = i + 1
				if (isNaN(yAxis[i])) {
					yAxis[i] = 0
				}
			}
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(xAxis, yAxis)
		}
		return resultData
	}

	var processDataWithMultipleColoumns = function(coloumns) {

		var largestColoumnLength = 0;
		var xAxis = []
		var resultData = []
		var startColOfNumericdata = 0;
		for (i = 0; i < coloumns.length; i++) {
			if (coloumns[i].length > largestColoumnLength) {
				largestColoumnLength = coloumns[i].length
			}
		}

		if (TURFINSIGHT.Chart.isAllNumbers(coloumns[0])) {
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
			}
		} else {
			var labels = []
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
				if (coloumns[0][i] == undefined) {
					labels[i] = "Label " + i
				} else {
					labels[i] = coloumns[0][i]
				}
			}
			this.setLabels(labels)
			startColOfNumericdata = 1
		}
		resultData[0] = xAxis
		for (i = startColOfNumericdata; i < coloumns.length; i++) {
			resultData[i + 1 - startColOfNumericdata] = []
			for (j = 0; j < largestColoumnLength; j++) {
				if (coloumns[i][j] != undefined && !isNaN(coloumns[i][j])) {
					resultData[i + 1 - startColOfNumericdata][j] = coloumns[i][j]
				} else {
					resultData[i + 1 - startColOfNumericdata][j] = 0
				}
			}
		}
		return resultData
	}

	this.setLabelsAndValues = function(labels, values) {
		this.setLabels(labels)
		this.setData(values)
	}

	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv, data, options) {
		if (targetDiv != undefined) {
			this.setTargetDiv(targetDiv)
		}
		if (data != undefined) {
			this.setData(data)
		}
		if (options != undefined) {
			this.setOptions(options)
		}
		if (this.targetDiv != undefined && this.data != undefined
				&& this.options != undefined) {
			TURFINSIGHT.Chart.ChartLibrary.drawLineChart(this)
		}
	}

}

//Stacked Chart Wrapper Object

TURFINSIGHT.Chart.StackedBarChart = function() {

	this.success = 1;
	this.data = []

	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setLegend = function(legends) {
		this.legends = legends;
	}

	this.setLabel = function(labels) {
		this.labels = labels;
	}

	this.setData = function(data) {
		this.data = null
		if (data.length == 1) {
			this.data = processDataWithOneColoumn(data[0])
		} else if (data.length >= 2) {
			this.data = processDataWithMultipleColoumns.call(this, data)
		}
	}

	var processDataWithOneColoumn = function(yAxis) {
		var resultData = null
		var isAllText = TURFINSIGHT.Chart.isAllText(yAxis)
		if (isAllText == false) {
			resultData = []
			var xAxis = []
			for (i = 0; i < yAxis.length; i++) {
				xAxis[i] = i + 1
				if (isNaN(yAxis[i])) {
					yAxis[i] = 0
				}
			}
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(xAxis, yAxis)
		}
		return resultData
	}

	var processDataWithMultipleColoumns = function(coloumns) {

		var largestColoumnLength = 0;
		var xAxis = []
		var resultData = []
		var startColOfNumericdata = 0;
		for (i = 0; i < coloumns.length; i++) {
			if (coloumns[i].length > largestColoumnLength) {
				largestColoumnLength = coloumns[i].length
			}
		}

		if (TURFINSIGHT.Chart.isAllNumbers(coloumns[0])) {
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
			}
		} else {
			var labels = []
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
				if (coloumns[0][i] == undefined) {
					labels[i] = "Label " + i
				} else {
					labels[i] = coloumns[0][i]
				}
			}
			this.setLabel(labels)
			startColOfNumericdata = 1
		}
		resultData[0] = xAxis
		for (i = startColOfNumericdata; i < coloumns.length; i++) {
			resultData[i + 1 - startColOfNumericdata] = []
			for (j = 0; j < largestColoumnLength; j++) {
				if (coloumns[i][j] != undefined && !isNaN(coloumns[i][j])) {
					resultData[i + 1 - startColOfNumericdata][j] = coloumns[i][j]
				} else {
					resultData[i + 1 - startColOfNumericdata][j] = 0
				}
			}
		}
		return resultData
	}

	this.setLegendAndValues = function(legend, values) {
		this.legend = legend;
		this.values = values;
		this.data[0] = legend
		this.data[1] = values
		if (values.length != legend.length) {
			this.success = 0;
		}
		for (i = 0; i < values.length; i++) {
			if (isNaN(values[i])) {
				this.success = 0;
			}
		}
	}

	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv, data, options) {
		if (targetDiv != undefined) {
			this.setTargetDiv(targetDiv)
		}
		if (data != undefined) {
			this.setData(data)
		}
		if (options != undefined) {
			this.setOptions(options)
		}
		if (this.targetDiv != undefined && this.data != undefined
				&& this.options != undefined) {
			TURFINSIGHT.Chart.ChartLibrary.drawStackedBarChart(
					this)
		}
	}

}

//Bar Chart Wrapper Object

TURFINSIGHT.Chart.BarChart = function() {

	this.success = 1;
	this.data = []

	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setLegend = function(legends) {
		this.legends = legends;
	}

	this.setLabel = function(labels) {
		this.labels = labels;
	}

	this.setData = function(data) {
		this.data = null
		if (data.length == 1) {
			this.data = processDataWithOneColoumn(data[0])
		} else if (data.length >= 2) {
			this.data = processDataWithMultipleColoumns.call(this, data)
		}
	}

	var processDataWithOneColoumn = function(yAxis) {
		var resultData = null
		var isAllText = TURFINSIGHT.Chart.isAllText(yAxis)
		if (isAllText == false) {
			resultData = []
			var xAxis = []
			for (i = 0; i < yAxis.length; i++) {
				xAxis[i] = i + 1
				if (isNaN(yAxis[i])) {
					yAxis[i] = 0
				}
			}
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(xAxis, yAxis)
		}
		return resultData
	}

	var processDataWithMultipleColoumns = function(coloumns) {

		var largestColoumnLength = 0;
		var xAxis = []
		var resultData = []
		var startColOfNumericdata = 0;
		for (i = 0; i < coloumns.length; i++) {
			if (coloumns[i].length > largestColoumnLength) {
				largestColoumnLength = coloumns[i].length
			}
		}

		if (TURFINSIGHT.Chart.isAllNumbers(coloumns[0])) {
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
			}
		} else {
			var labels = []
			for (i = 0; i < largestColoumnLength; i++) {
				xAxis[i] = i + 1
				if (coloumns[0][i] == undefined) {
					labels[i] = "Label " + i
				} else {
					labels[i] = coloumns[0][i]
				}
			}
			this.setLabel(labels)
			startColOfNumericdata = 1
		}
		resultData[0] = xAxis
		for (i = startColOfNumericdata; i < coloumns.length; i++) {
			resultData[i + 1 - startColOfNumericdata] = []
			for (j = 0; j < largestColoumnLength; j++) {
				if (coloumns[i][j] != undefined && !isNaN(coloumns[i][j])) {
					resultData[i + 1 - startColOfNumericdata][j] = coloumns[i][j]
				} else {
					resultData[i + 1 - startColOfNumericdata][j] = 0
				}
			}
		}
		return resultData
	}

	this.setLegendAndValues = function(legend, values) {
		this.legend = legend;
		this.values = values;
		this.data[0] = legend
		this.data[1] = values
		if (values.length != legend.length) {
			this.success = 0;
		}
		for (i = 0; i < values.length; i++) {
			if (isNaN(values[i])) {
				this.success = 0;
			}
		}
	}

	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv, data, options) {
		if (targetDiv != undefined) {
			this.setTargetDiv(targetDiv)
		}
		if (data != undefined) {
			this.setData(data)
		}
		if (options != undefined) {
			this.setOptions(options)
		}
		if (this.targetDiv != undefined && this.data != undefined
				&& this.options != undefined) {
			TURFINSIGHT.Chart.ChartLibrary.drawBarChart(this)
		}
	}

}

/** Testing Functions  **/

/* Flot Library*/

//Pie Chart Plotting Test

var testDrawPieChartByFlot = function() {
	var pieChart = new TURFINSIGHT.Chart.PieChart();
	pieChart.setTargetDiv("graph1")
	/*
	 pieChart.setLegendAndValues([
	 "Series1","Series2","Series3","Series4","Series5","Series6"],[ 10, 30,
	 90, 70, 80, 110])
    */
	pieChart
			.setData([
			 [ "Series1", "Series2", "Series3", "Series4", "Series5","Series6" ], 
			 [ 10, 30, 90, 70, 80, 110 ]
			 // [ 23 ,34, 56, 67, 87, 90]
			]);

	pieChart.setOptions({
		radius : 1,
		legend : true,
		hoverable : true,
		clickable : true,
		label : {
			show : true,
			radius : 0.8,
			color : '#999'
		}
	})

	pieChart.draw()
}

//Line Chart Plotting Test

var testDrawLineChartByFlot = function() {
	var lineChart = new TURFINSIGHT.Chart.LineChart();
	lineChart.setTargetDiv("graph1")
	lineChart.setLegend([ 'a1' ])
	/*
	  lineChart.setLabelsAndValues(
	  [ 'a', 30, 90, 'd', 'e', 110],[
	  [ 100, 30,90, 10, 50, 110],
	  [ 23 ,34, 56, 67, 87, 90],
	  [ 2 ,15, 20, 50, 85, 150]
	  ])
	 */
	lineChart.setData([
	        [ 'a', 30, 90, 'd', 'e', 110 ],
			[ 23, 34, 56, 67, 87, 90 ],
			[ 2, 15, 20, 50, 85, 150 ]
	        ]);
	lineChart.setOptions({
		legend : true,
		hoverable : true,
		clickable : true,
		// color: "rgb(30, 180, 20)",
		// threshold: { below: 50, color: "rgb(200, 20, 30)" },
		type : {
			interactive : true,
			// points:true,
			fill : false,
			steps : false
		}

	})

	lineChart.draw()
}

//Stacked Chart Plotting Test

var testDrawStackedBarChartByFlot = function() {
	var stackedBarChart = new TURFINSIGHT.Chart.StackedBarChart();

	stackedBarChart.setTargetDiv("graph1")
	stackedBarChart.setLegend(['Legend1'])
	stackedBarChart.setData([ 
	        [ 2, 4, 5, 'w', 'z'],
	        [ 3, 'w', 5, 13, 7 ],
			[ 6, 7, 2, 8, 16 ],
			[ 16, 4, 12, 4, 9 ]
	        ]);
	stackedBarChart.setOptions({
		stack : 0,
		lines : {
			show : false,
			steps : false
		},
		bars : {
			show : true,
			barWidth : .4,
			align : "center",
			horizontal : false
		}
	})

	stackedBarChart.draw()
}

//Bar Chart Plotting Test

var testDrawBarChartByFlot = function() {
	var barChart = new TURFINSIGHT.Chart.BarChart();
	barChart.setTargetDiv("graph1")
	barChart.setLegend(['Legend'])
	barChart.setData([
	        [ 9, 7, 8, 3, 6 ],
	        [ 3, 8, 5, 13, 7 ],
			[ 13, 4, 'a', 5, 9 ]
	        ]);

	barChart.setOptions({
		bars : {
			show : true,
			barWidth : 0.8,
			align : "center",
			horizontal : false
		}
	})

	barChart.draw()
}

/* JQPlot Library */

//Pie Chart Plotting Test

var testDrawPieChartByJqPlot = function() {
	var pieChart = new TURFINSIGHT.Chart.PieChart();
	pieChart.setTargetDiv("graph1")
	pieChart.setData([ 
	        [ 'Heavy Industry', 12 ],
	        [ 'Retail', 9 ],
			[ 'Light Industry', 14 ],
			[ 'Out of home', 16 ],
			[ 'Commuting', 7 ],
			[ 'Orientation', 9 ]
	        ]);

	pieChart.setOptions({
		seriesDefaults : {
			renderer : jQuery.jqplot.PieRenderer,
			rendererOptions : {
				showDataLabels : true
			}
		},
		legend : {
			show : true,
			location : 'e'
		}
	})

	pieChart.draw()
}

