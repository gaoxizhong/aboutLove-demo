var app = getApp();
const request = (options) => {

    return new Promise((resolve, reject) => {
        // wx.showLoading({
        //     title: options.titles || '加载中'
        // });
        options.success = function (res) {
            if (res.statusCode.toString()[0] != 2){
             reject(res)
             wx.showModal({
               title: '错误',
               content: res.statusCode
             })
           }else{
            //  if(res.data.code == 777){
            //   let is_code = app.globalData.is_code;
            //   if(is_code === '1'){
            //     return
            //   }
            //   app.globalData.is_code = '1';
            //   wx.showToast({
            //     title: '请先登录！',
            //     icon: 'none'
            //   })
            //    setTimeout(function(){
            //     wx.navigateTo({
            //       url: '/pages/userLogin/index',
            //     })
            //    },1500)
            //    return
            //  }else{
            //   resolve(res)
            //  }
              resolve(res)
            }
            return
        },
         options.fail = function (err) {
           reject(err)
         },
         options.complete = function(res) {
           wx.hideNavigationBarLoading();
           wx.hideLoading();
         }
        wx.request(options)

    });
}

export default request;
