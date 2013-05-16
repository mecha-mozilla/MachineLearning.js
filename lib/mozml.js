/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

var mozml = mozml || {};

mozml.matrix = mozml.matrix || {};
mozml.vector = mozml.vector || {};

mozml.MAXCT = 200;
mozml.EPS = 1.0e-10;

//ベクトルのノルムを求める関数
mozml.vector.norm = function(a){
  var leng = a.length;
  var sum = 0;
  for(var i = 0; i < leng; i++){
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);  
}

//ベクトルの内積を求める関数
mozml.vector.dot = function(a,b){
  var a_leng = a.length;
  var b_leng = b.length;
  if(a_leng != b_leng){
    return NULL;
  }
  var data = 0;
  for(var i = 0; i < a_leng; i++){
  data += a[i] * b[i];
  }
  return data;
}

//ベクトルの外積を求める関数
mozml.vector.cross = function(a,b){
  return "sorry not yet"+a+b;
}

mozml.argsort = function(data){
  var d_length = data.length;
  var i;
  var result = new Array(d_length);
  for(i = 0; i < d_length; i++){
  result[i] = data.indexOf(Math.max.apply(null,data));
  data[result[i]] = Math.min.apply(null, data)-1;
  }
  return result;
}

//ゼロ行列を作成する関数
mozml.matrix.zero = function(row,col){
  return mozml.matrix.const(row,col,0.0);
}

//定数行列を作成する関数
mozml.matrix.const = function(row,col,value){
  var data = new Array(row);
  for(var i = 0; i < row; i++){
    data[i] = new Array(col);
    for(var j = 0; j < col; j++){
      data[i][j] = value;
    }
  }
  return data;
}

//単位行列を作成する関数
mozml.matrix.identity = function(row){
  var data = new Array(row);
  for(var i = 0; i < row; i++){
    data[i] = new Array(row);
    for(var j = 0; j < row; j++){
      if(i == j){
        data[i][j] = 1;
      }else{
        data[i][j] = 0;
      }
    }
  }
  return data;
}

//ランダムな行列を作成する関数
//row = 行数
//col = 列数
//max = 最大値
//min = 最小値
mozml.matrix.random = function(row,col,max,min){
  var data = new Array(row);
  for(var i = 0; i < row; i++){
    data[i] = new Array(col);
    for(var j = 0; j < col; j++){
      data[i][j] = Math.round(Math.random() * (max - min) + min);
    }
  }
  return data;
}

//ベクトルの距離を求める関数
mozml.vector.distance = function(ar_a, ar_b){
  var leng = ar_a.length;
  if(leng != ar_b.length){
    return -1;
  }
  var sum = 0;
  for(var i = 0; i < leng; i++){
    sum += (ar_a[i] - ar_b[i]) * (ar_a[i] - ar_b[i]);
  }
  return Math.sqrt(sum);
}

//各行の距離行列を求める関数
mozml.matrix.distance = function(a){
  var leng = a.length;
  var dist = new Array(leng);
  for(var i = 0; i < leng; i++){
    dist[i] = new Array(leng);
    for(var j = 0; j < leng; j++){
      dist[i][j] = v_distance(a[i], a[j]);
    }
  }
  
  return dist;
}

//ベクトルをコピーする関数
mozml.vector.copy = function(a){
  var a_row = a.length;
  var i;
  var b = new Array(a_row);
  for(i = 0; i < a_row; i++){
  b[i] = a[i];
  }
  return b;
}

//行列をコピーする関数
mozml.matrix.copy = function(a){
  var a_row = a.length;
  var i;
  var b = new Array(a_row);
  for(i = 0; i < a_row; i++){
    b[i] = mozml.vector.copy(a[i]);
  }
  return b;
}

//行列の要素積を求める
mozml.matrix.multi = function(a,b){
  var a_row = a.length;
  var b_row = b.length;
  var a_col = a[0].length;
  var b_col = b[0].length;
  if(a_row != b_row || a_col != b_col){
    return -1;
  }
  var data = new Array(a_row);
  for(var i = 0; i < a_row; i++){
    data[i] = new Array(a_col);
    for(var j = 0; j < a_col; j++){
      data[i][j] = a[i][j] * b[i][j];
    }
  }
  return data;
}

//行列積を求める関数
mozml.matrix.matmulti = function(a,b){
  var a_row = a.length;
  var b_row = b.length;
  var a_col = a[0].length;
  var b_col = b[0].length;
  if(a_col != b_row){
    return -1;
  }
  var data = new Array(a_row);
  for(var i = 0; i < a_row; i++){
    data[i] = new Array(b_col);
    for(var j = 0; j < b_col; j++){
      data[i][j] = 0;
      for(var k = 0; k < a_col; k++){
        data[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return data;
}
//転置行列積 abt(a)
mozml.matrix.tramulti = function(a,b){
  var l = mozml.matrix.matmulti(a,b);
  var data = mozml.matrix.matmulti(l,mozml.matrix.t(a));
  return data;
}


//行列のスカラー積を求める関数
// a 行列要素
// b スカラー値
mozml.matrix.times = function(a,b){
  var a_row = a.length;
  var a_col = a[0].length;
  var data = new Array(a_row);
  for(var i = 0; i < a_row; i++){
    data[i] = new Array(a_col);
    for(var j = 0; j < a_col; j++){
      data[i][j] = a[i][j] * b;
    }
  }
  return data;
}

//行列和を求める関数
mozml.matrix.add = function(a,b){
  var a_row = a.length;
  var b_row = b.length;
  var a_col = a[0].length;
  var b_col = b[0].length;
  if(a_col != b_col || a_row != b_row){
    return -1;
  }
  var data = new Array(a_row);
  for(var i = 0; i < a_row; i++){
    data[i] = new Array(a_col);
    for(var j = 0; j < a_col; j++){
      data[i][j] = a[i][j] + b[i][j];
    }
  }
  return data;
}

//行列差を求める関数
// return a - b
mozml.matrix.diff = function(a,b){
  var a_row = a.length;
  var b_row = b.length;
  var a_col = a[0].length;
  var b_col = b[0].length;
  if(a_col != b_col || a_row != b_row){
    return -1;
  }
  var data = new Array(a_row);
  for(var i = 0; i < a_row; i++){
    data[i] = new Array(a_col);
    for(var j = 0; j < a_col; j++){
      data[i][j] = a[i][j] - b[i][j];
    }
  }
  return data;
}

//行列の転置
mozml.matrix.t = function(a){
  var a_row = a.length;
  var a_col = a[0].length;
  var data = new Array(a_col);
  for(var i = 0; i < a_col; i++){
    data[i] = new Array(a_row);
  }
  for(var i = 0; i < a_row; i++){
    for(var j = 0; j < a_col; j++){
      data[j][i] = a[i][j];
    }
  }
  return data;
}

//対角和を求める関数
mozml.matrix.trace = function(a){
  var a_row = a.length;
  var a_col = a[0].length;
  if(a_row != a_col){
    return NULL;
  }
  var data = 0;
  for(var i = 0; i < a_row; i++){
    data += a[i][i];
  }
  return data;
}

mozml.matrix.triangle = function(a,ud){
  var a_row = a.length;
  var a_col = a[0].length;
  if(a_row != a_col){
    return NULL;
  }
  //ud = 1 upside 
  if(ud == 1){
    for(var i = 0; i < a_row; i++){
      for(var j = 0; j < i; j++){
        a[i][j] = 0;
      }
    }
  }
  //ud = -1 downside
  else if(ud == -1){
    for(i = 0; i < a_row; i++){
      for(j = i+1; j < a_col; j++){
        a[i][j] = 0;
      }
    }
  }else{
    for(i = 0; i < a_row; i++){
      for(j = 0; j < a_col; j++){
        if(i != j){
          a[i][j] = 0;
        }
      }
    }
  }
  return a;
}

//行列式
mozml.matrix.det = function(a){
  var a_row = a.length;
  var a_col = a[0].length;
  var i,j,k;
  var det = 1.0;
  var buf;
  if(a_row != a_col){
    return NULL;
  }
  for(i = 0; i < a_row; i++){
    for(j = 0; j < a_row; j++){
      if(i < j){
        buf=a[j][i]/a[i][i];
        for(k = 0; k < a_row; k++){
          a[j][k] -= a[i][k]*buf;
        }
      }
    }
  }

  for(i = 0; i < a_row; i++){
    det *= a[i][i];
  }
  return det;
}

//逆行列
mozml.matrix.inv = function(a){
  var a_row = a.length;
  var a_col = a[0].length;
  var i,j,k;
  var inv_a = mozml.matrix.identity(a_row,a_col);
  
  for(i = 0; i < a_row; i++){
    buf = 1/a[i][i];
    for(j = 0; j < a_row; j++){
      a[i][j] *= buf;
      inv_a[i][j] *= buf;
    }
    for(j = 0; j < a_row; j++){
      if(i != j) {
        buf = a[j][i];
        for(k = 0; k < a_row; k++){
          a[j][k] -= a[i][k] * buf;
          inv_a[j][k] -= inv_a[i][k] * buf;
        }
      }
    }
  }
  return inv_a;
}

//標準偏差
//axis:0,列方向 1,行方向
mozml.matrix.std = function(a, axis=0){
  var a_row = a.length;
  var a_col = a[0].length;
  var sum = 0;
  var mean = 0;
  var temp;
  var a_std;
  var i,j;
  if(axis == 1){
  a_std = new Array(a_row)
  for(i = 0; i < a_row; i++){
    for(j = 0; j < a_col; j++){
    sum += a[i][j];
    }
    mean = sum / a_col;
    sum = 0;
    for(j = 0; j < a_col; j++){
    sum += (a[i][j]-mean)*(a[i][j]-mean);
    }
    a_std[i] = Math.sqrt(sum / a_col);
    sum = 0;
  }
  }else if(axis == 0){
  a_std = new Array(a_col)
  for(var i = 0; i < a_col; i++){
    for(var j = 0; j < a_row; j++){
    sum += a[j][i];
    }
    mean = sum / a_row;
    sum = 0;
    for(j = 0; j < a_row; j++){
    sum += (a[j][i]-mean)*(a[j][i]-mean);
    }
    a_std[i] = Math.sqrt(sum / a_row);
    sum = 0;
  }
  }else{
  return -1;
  }
  return a_std;
}

mozml.matrix.eigen = function(A,type = "jacobi", ct = mozml.MAXCT, eps = mozml.EPS){
  var temp_eigen;
  switch(type){
  case "jacobi":
    temp_eigen = mozml.matrix.eigen_jacobi(ct, eps, A);
    break;
  default:
    temp_eigen = mozml.matrix.eigen_jacobi(ct, eps, A);
    break;
  }
  return temp_eigen;
}

//ヤコビ法
//ct: 最大繰り返し回数
//eps: 収束判定条件
//A: 対象の行列
//return = [固有値,固有ベクトル行列]
//参考
//http://www.sist.ac.jp/~suganuma/kougi/other_lecture/SE/num/Jacobi/Java/Jacobi_j.txt
mozml.matrix.eigen_jacobi = function(ct, eps, A){
  var a_row = A.length;
  var a_col = A[0].length;
  var A_one = mozml.matrix.copy(A), A_two = mozml.matrix.zero(a_row,a_col);
  var X_one = mozml.matrix.identity(a_row,a_col), X_two = mozml.matrix.zero(a_row,a_col);
  var max, s, t, v, sn, cs;
  var i, j, k = 0, n, ind = 1, p = 0, q = 0;
  var eig_value = new Array(a_row);
  if(a_row != a_col){
    return 0;
  }else{
    n = a_row;
  }
  while (ind > 0 && k < ct){
    //最大要素探索
    max = 0.0;
    for (i = 0; i < n; i++){
      for (j = 0; j < n; j++){
        if(j != i){
          if(Math.abs(A_one[i][j]) > max){
            max = Math.abs(A_one[i][j]);
            p = i;
            q = j;
          }
        }
      }
    }
    //収束判定
    if(max < eps){
      ind = 0;
    }else{
      s = -A_one[p][q];
      t = 0.5 * (A_one[p][p] - A_one[q][q]);
      v = Math.abs(t) / Math.sqrt(s * s + t * t)
      sn = Math.sqrt(0.5 * (1.0 - v));
      if (s*t < 0.0){
        sn = -sn;
      }
      cs = Math.sqrt(1.0 - sn * sn);
      //Akの計算
      for (i = 0; i < n; i++){
        if( i == p ){
          for(j = 0; j < n; j++){
            if(j == p){
              A_two[p][p] = A_one[p][p] * cs * cs + A_one[q][q] * sn * sn - 2.0 * A_one[p][q] * sn * cs;
            }else if(j == q){
              A_two[p][q] = 0.0;
            }else{
              A_two[p][j] = A_one[p][j] * cs - A_one[q][j] * sn;
            }
          }
        }else if(i == q){
          for(j = 0; j < n; j++){
            if(j == q){
              A_two[q][q] = A_one[p][p] * sn * sn + A_one[q][q] * cs * cs + 2.0 * A_one[p][q] * sn * cs;
            }else if(j == p){
              A_two[q][p] = 0.0;
            }else{
              A_two[q][j] = A_one[q][j] * cs + A_one[p][j] * sn;
            }
          }
        }else{
          for (j = 0; j < n; j++){
            if(j == p){
              A_two[i][p] = A_one[i][p] * cs - A_one[i][q] * sn;
            }else if(j == q){
              A_two[i][q] = A_one[i][q] * cs + A_one[i][p] * sn;
            }else{
              A_two[i][j] = A_one[i][j];
            }
          }
        }
      }
      //Xkの計算
      for(i = 0; i < n; i++){
        for(j = 0; j < n; j++){
          if(j == p){
            X_two[i][p] = X_one[i][p] * cs - X_one[i][q] * sn;
          }else if(j == q){
            X_two[i][q] = X_one[i][q] * cs + X_one[i][p] * sn;
          }else{
            X_two[i][j] = 1.0 * X_one[i][j];
          }
        }
      }
    X_one = mozml.matrix.copy(X_two);
    A_one = mozml.matrix.copy(A_two);
      k++;
    }
  }
  if(ind == 0){
    for(i = 0; i < n; i++){
      eig_value[i] = A_one[i][i];
    }
    return [eig_value, X_one];
  }
  return -1;
}

//主成分分析
//X = 入力データ
//r = 分散（主成分）
//a = 係数
mozml.pca = function(X){
	var n = X.length;
	var p = X[0].length;
	var i,j,k;
	var C = mozml.matrix.zero(n,p);
	var a = mozml.matrix.zero(p,p);
	var r = new Array(p);
	var mean, s2;
	//データ標準化
	for(i = 0; i < p; i++){
		mean = 0;
		s2 = 0;
		for(j = 0; j < n; j++){
			mean += X[i][j];
			s2 += X[i][j] * X[i][j];
		}
		mean /= n;
		s2 /= n;
		s2 = n * (s2 - mean * mean) / (n - 1);
		s2 = Math.sqrt(s2);
		for(j = 0; j < n; j++){
			X[i][j] = (X[i][j] - mean) / s2;
		}
	}
	// 分散共分散行列の計算
	for(i = 0; i < p; i++){
		for(j = 0; j < p; j++){
			s2 = 0.0;
			for(k = 0; k < n; k++){
				s2 += X[i][k] * X[j][k];
				s2 /= (n - 1);
				C[i][j] = s2;
				if(i != j){
					C[j][i] = s2;
				}
			}
		}
	}
	// 固有値、固有ベクトルの計算(A1固有値 X1固有ベクトル)
	temp_eigen = mozml.matrix.eigen(C);
	var A1 = temp_eigen[0];
	var X1 = temp_eigen[1];
	if(temp_eigen == -1){
		return -1;
	}
	mozml.debug.printm(temp_eigen[0]);
	for(i = 0; i < p; i++){
		r[i] = A1[i][i];
		for(j = 0; j < p; j++){
			a[i][j] = X1[j][i];
		}
	}
	return [r,a];
}

//多次元尺度構成法
//行数次元×列数要素の行列を入力とする
//a,縦時間、横次元数
//dim,次元削減後の次元数
//std,0:rawデータ,それ以外:分散を1にする
//http://ibisforest.org/index.php?%E5%A4%9A%E6%AC%A1%E5%85%83%E5%B0%BA%E5%BA%A6%E6%A7%8B%E6%88%90%E6%B3%95
//http://satomacoto.blogspot.jp/2012/01/python.html
mozml.mds = function(a,dim=2,std=1){
  a_row = a.length;
  a_col = a[0].length;
  if(a_row < dim){
    return -1;
  }
  var i;
  if(a_row != a_col){
    return -1;
  }
  var a_dist = a;
  //距離行列の二乗を作成
  var D = mozml.matrix.multi(a_dist,a_dist);
  //k次元空間の点
  var X = a;
  //単位行列から
  var J = mozml.matrix.diff(mozml.matrix.identity(a_row,a_row), mozml.matrix.const(a_row,a_row,1/a_row));
  //ヤングハウスホルダー変換
  var P = mozml.matrix.times(mozml.matrix.tramulti(J,D),(-1.0/2));
  var eps = 1.0e-10;
  var temp_eigen = mozml.matrix.eigen(P);
  if(temp_eigen == -1){
    printl("収束失敗");
    return -1;
  }
  var w = temp_eigen[0];
  var v = mozml.matrix.copy(temp_eigen[1]);
  var ind = mozml.argsort(w);
  var s = mozml.matrix.std(P,axis=0);
  var x = new Array(dim);
  var wa = new Array(dim);
  for(i = 0; i < dim; i++){
    x[i] = ind[i];
    wa[i] = s[x[i]];
  }
  var result = new Array(a_row);
  for(i = 0; i < a_row; i++){
    result[i] = new Array(dim);
    for(j = 0; j < dim; j++){
      result[i][j] = wa[j]*v[i][x[j]];
    }
  }
  if(std == 0){
    return result;
  }
  var arr = new Array(a_row);
  var ar_max, ar_min, ar_diff;
  for(i = 0; i < dim; i++){
    for(j = 0; j < a_row; j++){
      arr[j] = result[j][i];
    }
    ar_max = Math.max.apply(null,arr);
    ar_min = Math.min.apply(null,arr);
    ar_diff = ar_max - ar_min;
    for(j = 0; j < a_row; j++){
      result[j][i] = result[j][i] / ar_diff;
    }
  }
  return result;
}
