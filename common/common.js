import request from "./request.js";
module.exports ={
		// 本地
		apiHost:"",
		// 线上
		apiHost:"https://yzx.37huyu.cn/api",
		
    // getToken:function(){
		// 	var token = wx.getStorageSync("token") || '';
		// 	return token;
    // },
	get:function(url,data){
		return request({
			url: this.apiHost + url,
      data: data
		});
	},
	post:function(url,data){
		return request({
			url: this.apiHost + url,
			data,
			method: 'POST'
		});
	},
	// 转换时间
	formatTime2(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year,month, day].map(this.formatNumber).join('-')+ ' ' + [hour, minute, second].map(this.formatNumber).join(':')
	},
	formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}