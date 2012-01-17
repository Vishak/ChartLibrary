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
		this.data = []
		if(data.length==1){
		this.data = processDataWithOneColoumn(data[0])	
		} else if(data.length==2){
		this.data = processDataWithTwoColoumns(data[0],data[1])
		} else {
		this.data = data;
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
	
	var processDataWithTwoColoumns = function(coloumn1,coloumn2){
		if(TURFINSIGHT.Chart.isAllNumbers(coloumn2)){
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn1,coloumn2)
		} else if(TURFINSIGHT.Chart.isAllNumbers(coloumn1)){
			return TURFINSIGHT.Chart.mergeSingleDimArrays(coloumn2,coloumn1)
		} else {
			return null
		}
	}
	this.setLegendAndValues = function(legend,values){
		this.legend = legend;
		this.values = values;
		this.data[0] = legend
		this.data[1] = values
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

var testDrawPieChartByFlot = function() {
	var pieChart = new TURFINSIGHT.Chart.PieChart();

	pieChart.setTargetDiv("graph1")

	pieChart.setData([
	        //[ "Series1","Series2","Series3","Series4","Series5","Series6"]
	       [ 10, 30, 90, 70, 80, 110] 
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
