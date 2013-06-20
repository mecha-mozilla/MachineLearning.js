/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

var mozml = mozml || {};
mozml.debug = mozml.debug || {};

///Algs///
mozml.debug.print = function(id,data){
    document.getElementById(id).innerHTML = data;
}
//入力データを1行出力する関数
mozml.debug.printl = function(id,data){
    document.getElementById(id).innerHTML = data + "<br>";
}

//行列を出力する関数
mozml.debug.printm = function(id,data){
	document.getElementById(id).innerHTML = data.join('<br>');
}
