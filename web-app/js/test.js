var testDrawStackedBarChartByFlot = function() {
	var stackedBarChart = new TURFINSIGHT.Chart.StackedBarChart();
	
	stackedBarChart.setTargetDiv("graph1")
//	stackedBarChart.setTargetDiv(targetdiv)
	
	stackedBarChart.setLabel(['Item1','Item2'])

//	stackedBarChart.setData(eval(data))
	stackedBarChart.setData([
	                  [2,4,5,'w'],
	                  [3,'w',5,13,7], 
	                  [6,7,2,8,16], 
	                  [16,4,12,4,9] 
	                  ]);
	stackedBarChart.setLegend(['Legend1'])

	
//	stackedBarChart.setOptions(eval(options)[0])
	stackedBarChart.setOptions({
		stack: 0,
		lines: {show: false, steps: false },
		bars : {
			show : true,
			barWidth: .4,
		    align: "center",
		    horizontal: false
		}
	   })
	
	stackedBarChart.draw()
}

var testDrawBarChartByFlot = function() {
	var barChart = new TURFINSIGHT.Chart.BarChart();
	
	barChart.setTargetDiv("graph1")

//	barChart.setTargetDiv(targetdiv);

	barChart.setLabel(['Item1'])
	
	barChart.setData([
	                  [9,7,8,3,6],
	                  [3,8,5,13,7],
	                  [13,4,'a',5,9]
	                  ]);
	
//	barChart.setData(eval(data));
	barChart.setLegend(['Legend'])
	
//	barChart.setOptions(eval(options)[0]);
	
	barChart.setOptions({
		bars : {
			show : true,
			barWidth: 0.8,
		    align: "center",
		    horizontal: false
		}
	   })
	
	barChart.draw()
}


var testDrawPieChartByFlot = function(targetdiv,data,options) {
	var pieChart = new TURFINSIGHT.Chart.PieChart();

//	pieChart.setTargetDiv("graph1")
	pieChart.setTargetDiv(targetdiv)

	//pieChart.setLegendAndValues([ "Series1","Series2","Series3","Series4","Series5","Series6"],[ 10, 30, 90, 70, 80, 110])
	
	
	pieChart.setData(eval(data));
//	pieChart.setData([
//	        [ "Series1","Series2","Series3","Series4","Series5","Series6"],
//	        [ 10, 30, 90, 70, 80, 110] 
//	        //[ 23 ,34, 56, 67, 87, 90]
//	        ]);
   
	pieChart.setOptions(eval(options)[0]);
//	pieChart.setOptions({
//		radius :1,
//		legend : true,
//		hoverable: true,
//	    clickable: true,
//		label: {
//             show: true,
//             radius: 0.8,
//             color: '#999'
//		}
//	})

		
	pieChart.draw()
}

var testDrawLineChartByFlot = function(targetdiv,data,options) {
	var lineChart = new TURFINSIGHT.Chart.LineChart();

//	lineChart.setTargetDiv("graph1")
	lineChart.setTargetDiv(targetdiv)
	lineChart.setLegend(['a1'])
	/*
	lineChart.setLabelsAndValues([ 'a', 30, 90, 'd', 'e', 110],[
            [ 100, 30, 90, 10, 50, 110],
			[ 23 ,34, 56, 67, 87, 90],
	        [ 2 ,15, 20, 50, 85, 150]
			])
	*/
	lineChart.setData(eval(data));
//	lineChart.setData([
//	        [ 'a', 30, 90, 'd', 'e', 110],
//	        [ 23 ,34, 56, 67, 87, 90],
//	        [ 2 ,15, 20, 50, 85, 150]
//	        ]);
   
	lineChart.setOptions(eval(options)[0]);
//	lineChart.setOptions({
//		legend : true,
//		hoverable: true,
//	    clickable: true,
//	    //color: "rgb(30, 180, 20)",
//        //threshold: { below: 50, color: "rgb(200, 20, 30)" },
//	    type:{ 
//	    	   interactive:true,
//	           //points:true,
//	           fill:false,
//	           steps:false
//	    }  
//	
//	})

		
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


<<<<<<< HEAD
=======
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

var testDrawBarChartByFlot = function() {
	var barChart = new TURFINSIGHT.Chart.BarChart();
	barChart.setTargetDiv("graph1")
	barChart.setLabel([ 'Item1' ])
	barChart.setData([
	        [ 9, 7, 8, 3, 6 ],
	        [ 3, 8, 5, 13, 7 ],
			[ 13, 4, 'a', 5, 9 ]
	        ]);
	barChart.setLegend(['Legend'])

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

>>>>>>> a650f6c33beca871ca428c651b86a32966c5516b
<<<<<<< HEAD

=======
var testDrawStackedBarChartByFlot = function() {
	var stackedBarChart = new TURFINSIGHT.Chart.StackedBarChart();

	stackedBarChart.setTargetDiv("graph1")
	stackedBarChart.setLabel([ 'Item1', 'Item2' ])
	stackedBarChart.setData([ 
	        [ 2, 4, 5, 'w' ],
	        [ 3, 'w', 5, 13, 7 ],
			[ 6, 7, 2, 8, 16 ],
			[ 16, 4, 12, 4, 9 ]
	        ]);
	stackedBarChart.setLegend(['Legend1'])
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
>>>>>>> a650f6c33beca871ca428c651b86a32966c5516b
