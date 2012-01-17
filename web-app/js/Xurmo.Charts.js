var TURFINSIGHT = TURFINSIGHT || {}
TURFINSIGHT.Chart = TURFINSIGHT.Chart || {}
var jsMap = new TURF.Util.KeyValueStore();

TURFINSIGHT.Chart.Flot = function() {
	this.type = 'Flot'
	this.plotMethod = $.plot

	this.drawPieChart = function(chart){
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
			label: chart.options.label,
			innerRadius: chart.options.innerRadius,
		}
		},
		legend : {
			show:chart.options.legend
		},
		grid : {
			clickable:chart.options.clickable,
			hoverable:chart.options.hoverable
			}
	   }
		
		formattedOptions.series.pie.label.formatter = function(label, series){
            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
        }
		
		this.plotMethod(targetDiv, formattedData, formattedOptions);

	}
	
	this.drawLineChart = function(chart){
		var formattedData = []
		var targetDiv = $('#' + chart.targetDiv)
		var formattedOptions
		
		if(chart.legend==undefined){
			chart.legend = []
			for(i=0;i<chart.data.length-1;i++){
				chart.legend[i] = "Series" + (i+1)
			}
		}
		
		for (i = 1; i < chart.data.length;i++){
			var eachData = []
		for (j = 0; j < chart.data[0].length; j++) {
		    eachData[j] = [chart.data[0][j],chart.data[i][j]]
		 }
		    formattedData[i-1] = {
				label : chart.legend[i-1],
				data : eachData
			}
		}   
	   
		
		formattedOptions = {
		series : {
			lines: { show: true },
            points: { show: true }
		},
		legend : {
			show:chart.options.legend
		},
		grid : {
			clickable:chart.options.clickable,
			hoverable:chart.options.hoverable
			}
	   }
		
		this.plotMethod(targetDiv, formattedData, formattedOptions);

	}

}

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

TURFINSIGHT.Chart.ChartFactory = function() {

}

TURFINSIGHT.Chart.ChartFactory.getInstance = function() {
	if (!TURFINSIGHT.Chart.ChartFactory.instance) {
		var library = 'flot'
		switch (library) {
		case 'flot':
			TURFINSIGHT.Chart.ChartFactory.instance = new TURFINSIGHT.Chart.Flot();
			break;
		case 'jqPlot':
			TURFINSIGHT.Chart.ChartFactory.instance = new TURFINSIGHT.Chart.JqPlot();
			break;
		}this
	}
	return TURFINSIGHT.Chart.ChartFactory.instance;
}

TURFINSIGHT.Chart.isAllNumbers = function(list){
	var result = true
	for(i=0;i<list.length;i++){
		if(isNaN(list[i])){
			result = false
			break
		}
	}
	return result
}

TURFINSIGHT.Chart.isAllText = function(list){
	var result = true
	for(i=0;i<list.length;i++){
		if(!isNaN(list[i])){
			result = false
			break
		}
	}
	return result
}

TURFINSIGHT.Chart.getFrequencyOfColoumnElements = function(list){
	jsMap.clear()
	for(i=0;i<list.length;i++){
		 if(jsMap.get(list[i])!=null){
			 jsMap.push(list[i],parseInt(jsMap.get(list[i]))+1)
		 } else {
			 jsMap.push(list[i],1)
		 }
	   }
	return jsMap
}

TURFINSIGHT.Chart.mergeSingleDimArrays = function(array1,array2){
	var mergedArray = []
	mergedArray.push(array1)
	mergedArray.push(array2)
	return mergedArray
}

TURFINSIGHT.Chart.PieChart = function() {

	this.success = true;
	this.data = []
	
	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setData = function(data) {
		this.data = null
		if(data.length==1){
		this.data = processDataWithOneColoumn(data[0])	
		} else if(data.length>=2){
		this.data = processDataWithMultipleColoumns(data[0],data[1])
		} 
	}

	var processDataWithOneColoumn = function(coloumn){
		var resultData = []
		var isAllNumbers = TURFINSIGHT.Chart.isAllNumbers(coloumn)
		if(isAllNumbers==true){
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn,coloumn)
		} else {
			  var freqMap = TURFINSIGHT.Chart.getFrequencyOfColoumnElements(coloumn)
			  var freq = []
			  var legends = freqMap.keys()
			  $.each(legends,function(index,value){
				  freq.push(jsMap.get(value))
			  });
			  resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(legends,freq)
			}
		return resultData
	}
	
	var processDataWithMultipleColoumns = function(coloumn1,coloumn2){
		if(TURFINSIGHT.Chart.isAllNumbers(coloumn2)){
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn1,coloumn2)
		} else if(TURFINSIGHT.Chart.isAllNumbers(coloumn1)){
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn2,coloumn1)
		} else {
			return null
		}
	}
	this.setLegendAndValues = function(legend,values){
		this.data = TURFINSIGHT.Chart.mergeSingleDimArrays(legend,values)
		if(values.length!=legend.length){
		this.success = false; 
		}
		for(i=0;i<values.length;i++){
		  if(isNaN(values[i])){
		  this.success = false; 
		  }
		}
	}
	
	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv,data,options) {
		if(targetDiv!=undefined){
		this.setTargetDiv(targetDiv)	
		}
		if(data!=undefined){
			this.setData(data)	
		}
		if(options!=undefined){
			this.setOptions(options)	
		}
		if(this.targetDiv!=undefined && this.data!=undefined && this.options!=undefined){
		TURFINSIGHT.Chart.ChartFactory.getInstance().drawPieChart(this)
	  }
	}

}

//Line Chart

TURFINSIGHT.Chart.LineChart = function() {

	this.success = true;
	this.data = []
	
	this.setTargetDiv = function(targetDiv) {
		this.targetDiv = targetDiv;
	}

	this.setLegend = function(legend){
		this.legend = legend
	}
	
	this.setData = function(data) {
		this.data = null
		if(data.length==1){
		this.data = processDataWithOneColoumn(data[0])	
		} else if(data.length>=2){
		this.data = processDataWithMultipleColoumns(data)
		} 
	}

	var processDataWithOneColoumn = function(yAxis){
		var resultData = null
		var isAllText = TURFINSIGHT.Chart.isAllText(yAxis)
		if(isAllText==false){
			resultData = []
			var xAxis = []
			for(i=0;i<yAxis.length;i++){
				xAxis[i] = i+1
				if(isNaN(yAxis[i])){
				yAxis[i] = 0	
				}
			}
			resultData = TURFINSIGHT.Chart.mergeSingleDimArrays(yAxis,xAxis)
		} 
		return resultData
	}
	
	var processDataWithMultipleColoumns = function(coloumns){
		
		var largestColoumnLength = 0;
		var xAxis = []
		var resultData = []
		for(i=0;i<coloumns.length;i++){
			if(coloumns[i].length > largestColoumnLength){
				largestColoumnLength = coloumns[i].length 
			}
		}
		for(i=0;i<largestColoumnLength;i++){
			xAxis[i] = i+1
		}
		resultData[0] = xAxis
		for(i=0;i<coloumns.length;i++){
			resultData[i+1] = []
			for(j=0;j<largestColoumnLength;j++){
				if(coloumns[i][j]!=undefined && !isNaN(coloumns[i][j])){
					resultData[i+1][j] = coloumns[i][j]		
				}else{
					resultData[i+1][j] = 0
				}
			}
		}
		
		return resultData
	}
	
	this.setLegendAndValues = function(legend,values){
		this.legend = legend
		if(values.length!=legend.length){
		this.success = false; 
		}
		this.setData(values)
	}
	
	this.setOptions = function(options) {
		this.options = options;
	}

	this.draw = function(targetDiv,data,options) {
		if(targetDiv!=undefined){
		this.setTargetDiv(targetDiv)	
		}
		if(data!=undefined){
			this.setData(data)	
		}
		if(options!=undefined){
			this.setOptions(options)	
		}
		if(this.targetDiv!=undefined && this.data!=undefined && this.options!=undefined){
		TURFINSIGHT.Chart.ChartFactory.getInstance().drawLineChart(this)
	  }
	}

}


var testDrawPieChartByFlot = function() {
	var pieChart = new TURFINSIGHT.Chart.PieChart();

	pieChart.setTargetDiv("graph1")

	//pieChart.setLegendAndValues([ "Series1","Series2","Series3","Series4","Series5","Series6"],[ 10, 30, 90, 70, 80, 110])
	
	
	pieChart.setData([
	        [ "Series1","Series2","Series3","Series4","Series5","Series6"],
	        [ 10, 30, 90, 70, 80, 110] 
	        //[ 23 ,34, 56, 67, 87, 90]
	        ]);
   
	pieChart.setOptions({
		radius :1,
		legend : true,
		hoverable: true,
	    clickable: true,
		label: {
             show: true,
             radius: 0.8,
             color: '#999'
		}
	})

		
	pieChart.draw()
}

var testDrawLineChartByFlot = function() {
	var lineChart = new TURFINSIGHT.Chart.LineChart();

	lineChart.setTargetDiv("graph1")
	lineChart.setLegend(['a','b','c'])
	lineChart.setData([
	        [ 10, 30, 90, 70, 80, 110], 
	        [ 23 ,34, 56, 67, 87, 90],
	        [ 2 ,15, 20, 50, 85, 150]
	        ]);
   
	lineChart.setOptions({
		legend : true,
		hoverable: true,
	    clickable: true
	})

		
	lineChart.draw()
}

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
