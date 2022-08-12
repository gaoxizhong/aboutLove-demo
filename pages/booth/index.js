import common from "../../common/common";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_matchmaker: false,
    member_id:'',
    user_info:{},
    personData:{}
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
    let that = this;
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
        active: 2,     //这里的数字设置当前页面在tabbar里对应的序列，从0开始
        show:true
      })
    }
    let member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      return
    } else {
      that.setData({
        member_id: wx.getStorageSync('member_id'),
        user_info: wx.getStorageSync('user_info'),
      })
      // 获取数据
    that.getData();
    }
  },
  getData() {
    let that = this;
    that.getPersonInfo();
  },
  //获取个人信息
  getPersonInfo() {
    let that = this;
    common.get('/Users/index', {
      member_id: that.data.member_id
    }).then(res => {
      if (res.data.code == 0) {
        that.setData({
          personData: res.data.data
        });

      }

    })
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
  gotouserLogin(){
    let that = this;
    wx.navigateTo({
      url: '/pages/userLogin/index',
    })
},
})