import common from "../../common/common";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_orderDetails:false,
    orderDetails:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(this.getTabBar())
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
        active: 0,     //这里的数字设置当前页面在tabbar里对应的序列，从0开始
        show:true
      })
    }
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
  orderFormBtn(e){
    console.log(e)
    let that = this;
    let order_no = e.detail.value.order_no;
    if(!order_no || order_no == ''){
      wx.showToast({
        title: '订单编号不能为空！',
        icon:'none'
      })
      return
    }
    common.get('/wechat/orderDetail', {
      order_no
    }).then(res => {
      if (res.data.code == 0) {
        that.setData({
          orderDetails: res.data.data,
          is_orderDetails: true
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },
  backdrop(){
    this.setData({
      is_orderDetails: false
    })
  },
  // 复制
  fuzhi_wxText(e){
    let that = this;
    console.log(e)
    let S_info = e.currentTarget.dataset.wxtext;
    console.log(S_info)
    wx.setClipboardData({
      data: S_info,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) 
            wx.showToast({
              title: '复制成功！',
            })
          }
        })
      }
    })
  },
})