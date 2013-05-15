///Algs///
function print(data){
    document.write(data);
}
//入力データを1行出力する関数
function printl(data){
    document.write(data);
    document.write("<br>");
}

//行列を出力する関数
function printm(data){
    printl(data.join('<br>'));
}

//インデックスをソートする関数
function argsort(data){
	var d_length = data.length;
	var i;
	var result = new Array(d_length);
	for(i = 0; i < d_length; i++){
		result[i] = data.indexOf(Math.max.apply(null,data));
		data[result[i]] = Math.min.apply(null, data)-1;
	}
	return result;
}

//ソート関数（昇順）
function ascending_sort(a, b) {
	return a - b;
}
//ソート関数（降順）
function discending_sort(a, b){
	return b - a;
}

//ゼロ行列を作成する関数
function zero_matrix(row,col){
    return const_matrix(row,col,0.0);
}

//行列をコピーする関数
function m_copy(a){
	var a_row = a.length;
	var a_col = a[0].length;
	var i,j;
	var b = new Array(a_row);
	for(i = 0; i < a_row; i++){
		b[i] = new Array(a_col);
		for(j = 0; j < a_col; j++){
			b[i][j] = a[i][j];
		}
	}
	return b;
}

//定数行列を作成する関数
function const_matrix(row,col,value){
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
function identity_matrix(row,col){
    var data = new Array(row);
    for(var i = 0; i < row; i++){
        data[i] = new Array(col);
        for(var j = 0; j < col; j++){
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
function random_matrix(row,col,max,min){
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
function v_distance(ar_a, ar_b){
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

//距離行列を求める関数
function m_distance(a){
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

//ベクトルのノルムを求める関数
function v_norm(a){
    var leng = a.length;
    var sum = 0;
    for(var i = 0; i < leng; i++){
        sum += a[i] * a[i];
    }
    return Math.sqrt(sum);
}

//ベクトルの内積を求める関数
function v_dot(a,b){
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
function v_cross(a,b){

}

//行列の要素積を求める
function m_multi_c(a,b){
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
function m_multi(a,b){
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
//転置行列積 ABt(A)
function m_multi_t(a,b){
    var l = m_multi(a,b);
    var data = m_multi(l,m_t(a));
    return data;
}


//行列のスカラー積を求める関数
// a 行列要素
// b スカラー値
function m_times(a,b){
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
function m_add(a,b){
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
function m_diff(a,b){
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
function m_t(a){
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
function m_trace(a){
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

function m_triangle(a,ud){
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
function det_2(a){
    var a_row = a.length;
    var a_col = a[0].length;
    var sum;
    var temp_array;
    var tc_i; //tempcount_i
    var i,j,k;
    if(a_row != a_col){
        return 0;
    }
    if(a_row == 2 && a_col == 2){
        return a[0][0]*a[1][1] - a[0][1]*a[1][0];
    }
    sum = 0;
    sign = 1;
    temp_array = new Array(a_row-1);
    for(i = 0; i < a_row-1; i++){
        temp_array[i] = new Array(a_col-1);
    }
    for(i = 0; i < a_row; i++){
        tc_i = 0;
        for(j = 0; j < a_row; j++){
            if(j == i){
                continue;
            }
            for(k = 1; k < a_col; k++){
                temp_array[tc_i][k-1] = a[j][k];
            }
            tc_i++;
        }
        sum = sum + sign * a[i][0] * det(temp_array);
        sign = -sign;
    }
    return sum;
}

function m_det(a){
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
function m_inv(a){
    var a_row = a.length;
    var a_col = a[0].length;
    var i,j,k;
    var inv_a = identity_matrix(a_row,a_col);
    
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
function m_std(a, axis=0){
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

//ヤコビ法
//ct: 最大繰り返し回数
//eps: 収束判定条件
//A: 対象の行列
//return = [固有値,固有ベクトル行列]
//参考
//http://www.sist.ac.jp/~suganuma/kougi/other_lecture/SE/num/Jacobi/Java/Jacobi_j.txt
function eigen_jacobi(ct, eps, A){
    var a_row = A.length;
    var a_col = A[0].length;
    var A_one = m_copy(A), A_two = zero_matrix(a_row,a_col);
    var X_one = identity_matrix(a_row,a_col), X_two = zero_matrix(a_row,a_col);
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
			X_one = m_copy(X_two);
			A_one = m_copy(A_two);
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

//多次元尺度構成法を行う
//行数次元×列数要素の行列を入力とする
//a,縦時間、横次元数
//dist,0:距離行列に変換する,それ以外:距離行列を入力している
//dim,次元削減後の次元数
//std,0:rawデータ,それ以外:分散を1にする
//http://ibisforest.org/index.php?%E5%A4%9A%E6%AC%A1%E5%85%83%E5%B0%BA%E5%BA%A6%E6%A7%8B%E6%88%90%E6%B3%95
//http://satomacoto.blogspot.jp/2012/01/python.html
function mds(a,dist=0,dim=2,std=1){
    a_row = a.length;
    a_col = a[0].length;
	if(a_row < dim){
		return -1;
	}
	var i;
	if(dist == 0){
		//距離行列の作成
		var a_dist = m_distance(a);
	}else{
		//距離行列だった場合
		if(a_row != a_col){
			return -1;
		}
		var a_dist = a;
	}
    //距離行列の二乗を作成
    var D = m_multi_c(a_dist,a_dist);
    //k次元空間の点
    var X = a;
    //単位行列から
    var J = m_diff(identity_matrix(a_row,a_row), const_matrix(a_row,a_row,1/a_row));
    //ヤングハウスホルダー変換
    var P = m_times(m_multi_t(J,D),(-1.0/2));
	var eps = 1.0e-10;
	var temp_eigen = eigen_jacobi(200, eps, P);
	if(temp_eigen == -1){
		printl("収束失敗");
		return -1;
	}
	var w = temp_eigen[0];
	var v = m_copy(temp_eigen[1]);
	var ind = argsort(w);
	var s = m_std(P,axis=0);
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

function main(){
    var d1 = [
        [1.0,0.0,-1.0],
        [0.0,1.0,-1.0],
        [-1.0,-1.0,2.0]
        ];
    var d3 = [
        [1.0,0.0,-1.0,1.0],
        [0.0,1.0,-1.0,1.0],
        [-1.0,-1.0,2.0,1.0]
        ];
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
		[543,597,1494,1220,2300,923,205,2442,2329,0]]
		
		printm(mds(d,1,2,1));
}
