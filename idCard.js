 $('#birthday').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayBtn:  true,
         minView: 'month'

      });

      /**生成身份证号**/
      function generateId(){
        toastr.options.positionClass = 'toast-center-center';
        toastr.options.timeOut = 1000;
       
        var province =$('#province').val();
        var city =$('#city').val();
        var county =$('#county').val();
        var birthday = $('#birthday').val();
        var sex= $('input[name="sex"]:checked').val();
        var flag =true;
        if(province =='-1'){
          toastr.warning('请选择省份!');
          flag =false;
        }
        if(city =='-1'){
          toastr.warning('请选择城市!');
          flag =false;
        }
        if(county =='-1'){
          toastr.warning('请选择区县!');
          flag =false;
        }
        if(birthday ==''){
          toastr.warning('请选择时间!');
          flag =false;
        }
       if(sex ==undefined || sex ==''){
          toastr.warning('请选择性别!');
          flag =false;
        }
        if(!flag){
            return;
        }   
        var IDcard;
        var bd =birthday.replace(/\-/g,"");  
        var Rand = Math.floor(100+Math.random()*(999-100));
        if(sex =='1'){
          if(Rand%2==0){
            Rand+=1;
          }
        }else if(sex =='2'){
         if(Rand%2!=0){
            Rand+=1;
          }
        }
        IDcard = county+bd+Rand;
        var verify = getVerifyCode(IDcard);
        IDcard = IDcard+verify;
        $('#IDCard').val(IDcard);
      }

      /**
        获得身份证校验位
      **/
      var getVerifyCode=function(IDcard){
        var ValCodeArr = ["1", "0", "X", "9", "8", "7", "6", "5", "4","3","2"];
        var Wi = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7","9", "10", "5", "8", "4", "2"];
        var tmp=0;
        for (var i =0; i <Wi.length; i++) {
              tmp +=IDcard.charAt(i)*Wi[i];
        }
        var modValue = tmp % 11;
        var strVerifyCode = ValCodeArr[modValue];
        return strVerifyCode;
      }

    /**
     * 检查输入的身份证号格式是否正确 
     * 输入:
     * str 字符串 
     */
    function checkCard() {
      toastr.options.positionClass = 'toast-center-center';
      toastr.options.timeOut = 1000;

      var str = $('#IDCard').val();
      if(str ==''){
        toastr.warning('请生成身份证号码!');
        return;
      }
      // 15位数身份证正则表达式
      var arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
      // 18位数身份证正则表达式
      var arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[xX])$/;
      if (str.match(arg1) == null && str.match(arg2) == null) {
          toastr.warning('证件号码格式错误!');
        return;
      } else{
         toastr.info('正确格式身份证号码');
      }
   }

   // 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) { 
  return Math.floor(Math.random() * max + (base ? base : 0));
}

// 根据前17位生成末位
// 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) { 
  return Math.floor(Math.random() * max + (base ? base : 0));
}

// 根据前17位生成末位
function cnNewID(idcard) {
  var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
  var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
  var sum = 0, idx;
  for (var j = 0; j < 17; j++) {
    // 对前17位数字与权值乘积求和
    sum += parseInt(idcard[j], 10) * arrExp[j];
  }
  return arrValid[sum % 11];
}

// 生成身份证号
function getIdcard() {
  var idcard = '';
  for(var i = 0; i < 18; i++) {
      if(i < 6) {
          idcard += getRandom(10)
      }else if(i == 6) {
          idcard += getRandom(2, 1) //年份第一位仅支持1和2
      }else if(i == 7) { 
          idcard += idcard[6] == '1' ? 9 : 0;//两位年份规则，仅支持19和20
      }else if(i == 8) {
          idcard += idcard[6] == '1' ? getRandom(7, 3) : getRandom(2); //三位年份规则，仅支持193-199、200、201这些值
      }else if(i == 9) {
          idcard += getRandom(10) //四位年份规则,0-9
      }else if(i == 10) {
          idcard += getRandom(2);//首位月份规则
      }else if(i == 11) {
          idcard += idcard[10] == '0' ? getRandom(9, 1) : getRandom(3);//末位月份规则
      }else if(i == 12) {
          var maxDays = new Date(idcard.substr(6, 4), idcard.substr(10, 2), 0).getDate(); // 获取当月最大天数
          var day = getRandom(maxDays, 1)
          idcard += day < 10 ? ('0' + day) : day;
          i++
      }else if(i > 13 && i < 17) {
          idcard += getRandom(10)
      }else if(i == 17) {
          idcard += cnNewID(idcard);
      }
  }
  $('#IDCard').val(idcard);
}