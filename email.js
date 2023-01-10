/**
* 生成邮箱
*/

var lowerCase = "abcdefghijklmnopqrstuvwxyz"
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var numeric = "0123456789"
var email_suffix = ["@gmail.com", "@yahoo.com", "@msn.com", "@hotmail.com", 
"@aol.com", "@ask.com","@live.com", "@qq.com", "@163.com", 
"@163.net", "@yeah.net", "@126.com", "@sina.com",
"@sohu.com"]

function generatorEmail(){
	
	var opt = numeric + lowerCase + upperCase
  var res = randomSequence( randomInt(4, 10), opt) + randomSequence(1,email_suffix);
	$("#email").val(res);
}

//随机生成(min,max)范围的数字
function randomInt(min, max) {
	return min + Math.floor(Math.random() * (max-min+1))
}

//随机从list取值生成一段长度为len字符序列
function randomSequence(len, list) {
	if (len <= 1) { 
			len = 1; 
	}
	var s = "";
	var n = list.length;
	if (typeof list === "string") {
			while (len-- > 0 ){      
					s += list.charAt(Math.random() * n)
			}
	} else if (list instanceof Array) {
			while (len-- > 0 ){      
					s += list[ Math.floor(Math.random() * n) ]
			}
	}
	return s;
}
