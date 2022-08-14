import common from "../../common/common";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_matchmaker: false,
    member_id:'',
    user_info:{},
    personData:{},
    wx_account:'',
    name:'',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 禁止右上角转发
    wx.hideShareMenu();
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
          personData: res.data.data,
          status: res.data.data.status
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
  onShareAppMessage: function (e) {
    console.log(e)
    let meb_id = wx.getStorageSync('member_id');
    if(e.from == 'button'){
      return {
        title:'快来恋爱吧，脱单盲盒来啦！',
        path:'/pages/home/index?meb_id=' + meb_id,
        imageUrl:'https://yzx.37huyu.cn/uploads/20220813/29fe5bc49c2df4e1d19ac98813d396a5.jpg'
      }
    }
  },
  gotouserLogin(){
    let that = this;
    wx.navigateTo({
      url: '/pages/userLogin/index',
    })
  },
  // 跳转常见问题
  gotoProblem(){
    wx.navigateTo({
      url: '/pages/commonProblem/index',
    })
  },
  // 点击开通分销
  openDistribution(){
    this.setData({
      is_matchmaker: true
    })
  },
  // 点击分销弹窗--- 退出
  matchmake_exit(){
    this.setData({
      is_matchmaker: false
    })
  },
  // 开通分销
  smokeSub(e){
    console.log(e)
    let that = this;
    let name =  e.detail.value.name;
    let mobile =  e.detail.value.mobile;
    let wx_account =  e.detail.value.wx_account;
    let parmas = {
      member_id: wx.getStorageSync('member_id'),
      name,
      mobile,
      wx_account,
    }
    common.post('/users/applyForPartner',parmas).then( res =>{
      console.log(res)
      if (res.data.code == 0){
        wx.showToast({
          title: '提交成功，审核中...',
          duration: 1000,
          icon: 'success'
        })
        setTimeout(function () {
          that.setData({
            is_matchmaker:false,
          })
          that.getPersonInfo();
        }, 1000)
      }else{
        wx.showToast({
          title: res.data.data,
          icon: 'none',
        })
      }
    }).catch(e =>{
        console.log(e)
    })
  },
})