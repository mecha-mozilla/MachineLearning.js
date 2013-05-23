/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

function plot(){
	//表示領域に関する部分
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	//x軸のスケール
	var x = d3.scale.linear()
		.range([0, width]);

	//y軸のスケール
	var y = d3.scale.linear()
		.range([height, 0]);

	//色のカテゴリ付
	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	//tsvの取り込み？
	d3.tsv("data.tsv", function(error, data) {
		data.forEach(function(d) {
			d.sepalLength = +d.sepalLength;
			d.sepalWidth = +d.sepalWidth;
		});
		x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
		y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
		
	//x軸
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Sepal Width (cm)");

	//y軸
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Sepal Length (cm)")

	svg.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) { return x(d.sepalWidth); })
		.attr("cy", function(d) { return y(d.sepalLength); })
		.style("fill", function(d) { return color(d.species); });

	//legendを書く奴
	var legend = svg.selectAll(".legend")
		.data(color.domain())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; });
	});	
}

function main(){
  var d1 = [
    [1.0,0.0,-1.0],
    [0.0,1.0,-1.0],
    [-1.0,-1.0,2.0]
	];
	/*
  var d3 = [
    [1.0,0.0,-1.0,1.0],
    [0.0,1.0,-1.0,1.0],
    [-1.0,-1.0,2.0,1.0]
	];
	*/
  var d4 = [[ 0.01,  0.01,  0.02,  0.04,  0.03],
     [ 0.  ,  0.02,  0.02,  0.03,  0.02],
     [ 0.01,  0.02,  0.02,  0.03,  0.02],
     [ 0.01,  0.  ,  0.01,  0.05,  0.03]];
  var d2 = [
    [2],
    [3],
    [4]
    ];
  var d = [[0,587,1212,701,1936,604,748,2139,2182,543],
      [587,0,920,940,1745,1188,713,1858,1737,597],
      [1212,920,0,879,831,1726,1631,949,1021,1494],
      [701,940,879,0,1374,968,1420,1645,1891,1220],
      [1936,1745,831,1374,0,2339,2451,347,959,2300],
      [604,1188,1726,968,2339,0,1092,2594,2734,923],
      [748,713,1631,1420,2451,1092,0,2571,2408,205],
      [2139,1858,949,1645,347,2594,2571,0,678,2442],
      [2182,1737,1021,1891,959,2734,2408,678,0,2329],
	  [543,597,1494,1220,2300,923,205,2442,2329,0]];
	  
  var iris = [[5.1,3.5,1.4,0.2,"Iris-setosa"],
      [4.9,3.0,1.4,0.2,"Iris-setosa"],
      [4.7,3.2,1.3,0.2,"Iris-setosa"],
      [4.6,3.1,1.5,0.2,"Iris-setosa"],
      [5.0,3.6,1.4,0.2,"Iris-setosa"],
      [5.4,3.9,1.7,0.4,"Iris-setosa"],
      [4.6,3.4,1.4,0.3,"Iris-setosa"],
      [5.0,3.4,1.5,0.2,"Iris-setosa"],
      [4.4,2.9,1.4,0.2,"Iris-setosa"],
      [4.9,3.1,1.5,0.1,"Iris-setosa"],
      [5.4,3.7,1.5,0.2,"Iris-setosa"],
      [4.8,3.4,1.6,0.2,"Iris-setosa"],
      [4.8,3.0,1.4,0.1,"Iris-setosa"],
      [4.3,3.0,1.1,0.1,"Iris-setosa"],
      [5.8,4.0,1.2,0.2,"Iris-setosa"],
      [5.7,4.4,1.5,0.4,"Iris-setosa"],
      [5.4,3.9,1.3,0.4,"Iris-setosa"],
      [5.1,3.5,1.4,0.3,"Iris-setosa"],
      [5.7,3.8,1.7,0.3,"Iris-setosa"],
      [5.1,3.8,1.5,0.3,"Iris-setosa"],
      [5.4,3.4,1.7,0.2,"Iris-setosa"],
      [5.1,3.7,1.5,0.4,"Iris-setosa"],
      [4.6,3.6,1.0,0.2,"Iris-setosa"],
      [5.1,3.3,1.7,0.5,"Iris-setosa"],
      [4.8,3.4,1.9,0.2,"Iris-setosa"],
      [5.0,3.0,1.6,0.2,"Iris-setosa"],
      [5.0,3.4,1.6,0.4,"Iris-setosa"],
      [5.2,3.5,1.5,0.2,"Iris-setosa"],
      [5.2,3.4,1.4,0.2,"Iris-setosa"],
      [4.7,3.2,1.6,0.2,"Iris-setosa"],
      [4.8,3.1,1.6,0.2,"Iris-setosa"],
      [5.4,3.4,1.5,0.4,"Iris-setosa"],
      [5.2,4.1,1.5,0.1,"Iris-setosa"],
      [5.5,4.2,1.4,0.2,"Iris-setosa"],
      [4.9,3.1,1.5,0.1,"Iris-setosa"],
      [5.0,3.2,1.2,0.2,"Iris-setosa"],
      [5.5,3.5,1.3,0.2,"Iris-setosa"],
      [4.9,3.1,1.5,0.1,"Iris-setosa"],
      [4.4,3.0,1.3,0.2,"Iris-setosa"],
      [5.1,3.4,1.5,0.2,"Iris-setosa"],
      [5.0,3.5,1.3,0.3,"Iris-setosa"],
      [4.5,2.3,1.3,0.3,"Iris-setosa"],
      [4.4,3.2,1.3,0.2,"Iris-setosa"],
      [5.0,3.5,1.6,0.6,"Iris-setosa"],
      [5.1,3.8,1.9,0.4,"Iris-setosa"],
      [4.8,3.0,1.4,0.3,"Iris-setosa"],
      [5.1,3.8,1.6,0.2,"Iris-setosa"],
      [4.6,3.2,1.4,0.2,"Iris-setosa"],
      [5.3,3.7,1.5,0.2,"Iris-setosa"],
      [5.0,3.3,1.4,0.2,"Iris-setosa"],
      [7.0,3.2,4.7,1.4,"Iris-versicolor"],
      [6.4,3.2,4.5,1.5,"Iris-versicolor"],
      [6.9,3.1,4.9,1.5,"Iris-versicolor"],
      [5.5,2.3,4.0,1.3,"Iris-versicolor"],
      [6.5,2.8,4.6,1.5,"Iris-versicolor"],
      [5.7,2.8,4.5,1.3,"Iris-versicolor"],
      [6.3,3.3,4.7,1.6,"Iris-versicolor"],
      [4.9,2.4,3.3,1.0,"Iris-versicolor"],
      [6.6,2.9,4.6,1.3,"Iris-versicolor"],
      [5.2,2.7,3.9,1.4,"Iris-versicolor"],
      [5.0,2.0,3.5,1.0,"Iris-versicolor"],
      [5.9,3.0,4.2,1.5,"Iris-versicolor"],
      [6.0,2.2,4.0,1.0,"Iris-versicolor"],
      [6.1,2.9,4.7,1.4,"Iris-versicolor"],
      [5.6,2.9,3.6,1.3,"Iris-versicolor"],
      [6.7,3.1,4.4,1.4,"Iris-versicolor"],
      [5.6,3.0,4.5,1.5,"Iris-versicolor"],
      [5.8,2.7,4.1,1.0,"Iris-versicolor"],
      [6.2,2.2,4.5,1.5,"Iris-versicolor"],
      [5.6,2.5,3.9,1.1,"Iris-versicolor"],
      [5.9,3.2,4.8,1.8,"Iris-versicolor"],
      [6.1,2.8,4.0,1.3,"Iris-versicolor"],
      [6.3,2.5,4.9,1.5,"Iris-versicolor"],
      [6.1,2.8,4.7,1.2,"Iris-versicolor"],
      [6.4,2.9,4.3,1.3,"Iris-versicolor"],
      [6.6,3.0,4.4,1.4,"Iris-versicolor"],
      [6.8,2.8,4.8,1.4,"Iris-versicolor"],
      [6.7,3.0,5.0,1.7,"Iris-versicolor"],
      [6.0,2.9,4.5,1.5,"Iris-versicolor"],
      [5.7,2.6,3.5,1.0,"Iris-versicolor"],
      [5.5,2.4,3.8,1.1,"Iris-versicolor"],
      [5.5,2.4,3.7,1.0,"Iris-versicolor"],
      [5.8,2.7,3.9,1.2,"Iris-versicolor"],
      [6.0,2.7,5.1,1.6,"Iris-versicolor"],
      [5.4,3.0,4.5,1.5,"Iris-versicolor"],
      [6.0,3.4,4.5,1.6,"Iris-versicolor"],
      [6.7,3.1,4.7,1.5,"Iris-versicolor"],
      [6.3,2.3,4.4,1.3,"Iris-versicolor"],
      [5.6,3.0,4.1,1.3,"Iris-versicolor"],
      [5.5,2.5,4.0,1.3,"Iris-versicolor"],
      [5.5,2.6,4.4,1.2,"Iris-versicolor"],
      [6.1,3.0,4.6,1.4,"Iris-versicolor"],
      [5.8,2.6,4.0,1.2,"Iris-versicolor"],
      [5.0,2.3,3.3,1.0,"Iris-versicolor"],
      [5.6,2.7,4.2,1.3,"Iris-versicolor"],
      [5.7,3.0,4.2,1.2,"Iris-versicolor"],
      [5.7,2.9,4.2,1.3,"Iris-versicolor"],
      [6.2,2.9,4.3,1.3,"Iris-versicolor"],
      [5.1,2.5,3.0,1.1,"Iris-versicolor"],
      [5.7,2.8,4.1,1.3,"Iris-versicolor"],
      [6.3,3.3,6.0,2.5,"Iris-virginica"],
      [5.8,2.7,5.1,1.9,"Iris-virginica"],
      [7.1,3.0,5.9,2.1,"Iris-virginica"],
      [6.3,2.9,5.6,1.8,"Iris-virginica"],
      [6.5,3.0,5.8,2.2,"Iris-virginica"],
      [7.6,3.0,6.6,2.1,"Iris-virginica"],
      [4.9,2.5,4.5,1.7,"Iris-virginica"],
      [7.3,2.9,6.3,1.8,"Iris-virginica"],
      [6.7,2.5,5.8,1.8,"Iris-virginica"],
      [7.2,3.6,6.1,2.5,"Iris-virginica"],
      [6.5,3.2,5.1,2.0,"Iris-virginica"],
      [6.4,2.7,5.3,1.9,"Iris-virginica"],
      [6.8,3.0,5.5,2.1,"Iris-virginica"],
      [5.7,2.5,5.0,2.0,"Iris-virginica"],
      [5.8,2.8,5.1,2.4,"Iris-virginica"],
      [6.4,3.2,5.3,2.3,"Iris-virginica"],
      [6.5,3.0,5.5,1.8,"Iris-virginica"],
      [7.7,3.8,6.7,2.2,"Iris-virginica"],
      [7.7,2.6,6.9,2.3,"Iris-virginica"],
      [6.0,2.2,5.0,1.5,"Iris-virginica"],
      [6.9,3.2,5.7,2.3,"Iris-virginica"],
      [5.6,2.8,4.9,2.0,"Iris-virginica"],
      [7.7,2.8,6.7,2.0,"Iris-virginica"],
      [6.3,2.7,4.9,1.8,"Iris-virginica"],
      [6.7,3.3,5.7,2.1,"Iris-virginica"],
      [7.2,3.2,6.0,1.8,"Iris-virginica"],
      [6.2,2.8,4.8,1.8,"Iris-virginica"],
      [6.1,3.0,4.9,1.8,"Iris-virginica"],
      [6.4,2.8,5.6,2.1,"Iris-virginica"],
      [7.2,3.0,5.8,1.6,"Iris-virginica"],
      [7.4,2.8,6.1,1.9,"Iris-virginica"],
      [7.9,3.8,6.4,2.0,"Iris-virginica"],
      [6.4,2.8,5.6,2.2,"Iris-virginica"],
      [6.3,2.8,5.1,1.5,"Iris-virginica"],
      [6.1,2.6,5.6,1.4,"Iris-virginica"],
      [7.7,3.0,6.1,2.3,"Iris-virginica"],
      [6.3,3.4,5.6,2.4,"Iris-virginica"],
      [6.4,3.1,5.5,1.8,"Iris-virginica"],
      [6.0,3.0,4.8,1.8,"Iris-virginica"],
      [6.9,3.1,5.4,2.1,"Iris-virginica"],
      [6.7,3.1,5.6,2.4,"Iris-virginica"],
      [6.9,3.1,5.1,2.3,"Iris-virginica"],
      [5.8,2.7,5.1,1.9,"Iris-virginica"],
      [6.8,3.2,5.9,2.3,"Iris-virginica"],
      [6.7,3.3,5.7,2.5,"Iris-virginica"],
      [6.7,3.0,5.2,2.3,"Iris-virginica"],
      [6.3,2.5,5.0,1.9,"Iris-virginica"],
      [6.5,3.0,5.2,2.0,"Iris-virginica"],
      [6.2,3.4,5.4,2.3,"Iris-virginica"],
      [5.9,3.0,5.1,1.8,"Iris-virginica"]];
    var pca = mozml.pca(d,2,1);
	mozml.debug.printm("debug",pca[1]);
	
}
