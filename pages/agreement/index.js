const common = require('../../common/common');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_use:'1',
    textData:'',
    nodes: [{
      name: 'view',
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      is_use: options.is_use,  // 1、协议 2、须知
    })
    if(options.is_use == '1'){
      wx.setNavigationBarTitle({
        title: '用户协议'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '用户须知'
      })
    }
    this.getUserAgreement();
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
  getUserAgreement(){
    let that = this;
    common.post('/index/UserAgreement',{}).then( res =>{
      if(res.data.code == 0){
        let is_use = that.data.is_use;
        let article = '';
        if(is_use == '1'){
          article = res.data.data.agreement_content;
        }else if(is_use == '2'){
          article = res.data.data.user_know;
        }
        WxParse.wxParse('article', 'html', article, that, 1);
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    }).catch( e =>{
      console.log(e)
    })
  }
})