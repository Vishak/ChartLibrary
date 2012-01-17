<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Flot Pie Examples</title>
	<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="../excanvas.min.js"></script><![endif]-->
    <script type="text/javascript" src="${resource(dir:'js', file:'jquery-1.6.2.min.js')}"></script>
	<script type="text/javascript" src="${resource(dir:'js', file:'jquery.flot.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js', file:'jquery.flot.pie.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js', file:'jquery.jqplot.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js', file:'jqplot.pieRenderer.js')}"></script>
	<script type="text/javascript" src="${resource(dir:'js', file:'KeyValueStore.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js', file:'Xurmo.Charts.js')}"></script>
<script type="text/javascript">
$(document).ready(function(){
testDrawLineChartByFlot();
//testDrawPieChartByFlot();
});
</script>
	<style type="text/css">
		* {
		  font-family: sans-serif;
		}
		
		body
		{
			padding: 0 1em 1em 1em;
		}
		
		div.graph
		{
			width: 400px;
			height: 300px;
			float: left;
			border: 1px dashed gainsboro;
		}
		
		label
		{
			display: block;
			margin-left: 400px;
			padding-left: 1em;
		}
		
		h2
		{
			padding-top: 1em;
			margin-bottom: 0;
			clear: both;
			color: #ccc;
		}
		
		code
		{
			display: block;
			background-color: #eee;
			border: 1px dashed #999;
			padding: 0.5em;
			margin: 0.5em;
			color: #666;
			font-size: 10pt;
		}
		
		code b
		{
			color: black;
		}
		
		ul
		{
			font-size: 10pt;
		}
		
		ul li
		{
			margin-bottom: 0.5em;
		}
		
		ul.options li
		{
			list-style: none;
			margin-bottom: 1em;
		}
		
		ul li i
		{
			color: #999;
		}
	</style>
 </head>
    <body>
    <h1>Flot Pie Examples</h1>

	<h2>Default without Legend</h2>
    <div id="graph1" class="graph"></div>

	<label for="graph1">
		Default pie graph when legend is disabled. Since the labels would normally be outside the container, the graph is resized to fit.
		<code>
$.plot($("#graph1"), data, <br/>
{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;series: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pie: { <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: true<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>legend: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: false<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</b><br/>
});<br/>
		</code>
	</label>
	
 </body>

</html>

