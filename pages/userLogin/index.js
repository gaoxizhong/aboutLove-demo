const common = require('../../common/common');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    meb_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let meb_id = wx.getStorageSync('meb_id');
    if(meb_id){
      that.setData({
        meb_id,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 微信授权
  getUserProfile(){
    let that = this;
    wx.login({
      success: (data) => {
        console.log(data.code)
        that.setData({
          code: data.code,
        })
      }
    })
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别', 
      success: (res) => {
        console.log(res)
        wx.setStorageSync('user_info', res.userInfo);
        let pameas = {
          code: that.data.code,
          encryptedData: res.encryptedData,
          iv: res.iv,
        }
        if(that.data.meb_id){
          pameas.member_id = that.data.meb_id
        }
        common.post('/wechat/wxlogin',pameas).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            app.globalData.is_code = '2';
            wx.showToast({
              title: "授权成功",
              icon: 'none',
              duration: 2000,
            })
            wx.setStorageSync('member_id', res.data.data.member_id);
            wx.setStorageSync('meb_id', '');
            that.setData({
              meb_id:''
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              })
            },1000)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }).catch(e => {
          wx.showToast({
            title: "数据异常"+ e.errMsg,
            icon:'none',
            duration:3000
          })
          console.log(e)
        })
        
      }
    })
  },
  cancelLogin(){
    console.log('取消授权')
    app.globalData.is_code = '2';
    wx.navigateBack({
      delta: 1,
    })
  },
})