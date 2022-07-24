// pages/home/index.js
import common from "../../common/common";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster_tabs:[
      {id:1,image:'https://huanbaobi.qingshanpai.com/banner/banner/banner1619681082_36611_.png'},
      {id:2,image:'https://huanbaobi.qingshanpai.com/banner/banner/banner1619681082_36611_.png'},
      {id:3,image:'https://huanbaobi.qingshanpai.com/banner/banner/banner1619681082_36611_.png'}
    ],
    swiper_index:0,
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
        active: 1,     //这里的数字设置当前页面在tabbar里对应的序列，从0开始
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
  moveServerProSwiper(e){
    this.setData({
      swiper_index:e.detail.current,
    })
  },
  getBannerUrls() { //轮播图地址
    let that = this
    common.get('', {}).then(res => {
      if (res.data.code == 200) {
        that.setData({
          poster_tabs: res.data.data.banner,
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },
})