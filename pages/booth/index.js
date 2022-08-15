import common from "../../common/common";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_tixian: false, // 提现弹窗
    is_matchmaker: false,
    member_id:'',
    user_info:{},
    personData:{},
    wx_account:'',
    name:'',
    mobile:'',
    debug_submit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      wx.showToast({
        title: '请先登录！',
        icon:'none'
      })
      that.gotouserLogin();
    }
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
    let that = this;
    let member_id = wx.getStorageSync('member_id');
    if(!member_id){
      wx.showToast({
        title: '请先登录！',
        icon:'none'
      })
      return
    }
    that.setData({
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
    common.post('/PaperSlip/applyForPartner',parmas).then( res =>{
      console.log(res)
      if (res.data.code == 0){
        var $config = res.data.data;
        wx.requestPayment({
          timeStamp: $config['timeStamp'], //注意 timeStamp 的格式
          nonceStr: $config['nonceStr'],
          package: $config['package'],
          signType: $config['signType'],
          paySign: $config['paySign'], // 支付签名
          success: function (res) {
            console.log(res)
            // 支付成功后的回调函数
            wx.showToast({
              title: '支付成功！',
              duration: 1500,
              icon: 'success'
            })
            setTimeout(function () {
              that.setData({
                is_matchmaker:false,
              })
              that.getPersonInfo();
            }, 1500)
          },
          fail: function (e) {
            console.log(e)
            wx.showToast({
              title: '支付失败！',
              duration: 1000,
              icon: 'none'
            })
            return;
          }
        });

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
  // 点击立即提现
  clicktxian(){
    this.setData({
      is_tixian: true
    })
  },
  //  点击提现弹窗 --- 退出
  tixian_exit(){
    this.setData({
      is_tixian: false
    })
  },

  //提现按钮
  tixianSub(e) {
    console.log(e)
    let that = this;
    let withdrw_money = Number(e.detail.value.withdrw_money);
    let debug_submit = that.data.debug_submit;

    if (withdrw_money < 100 ) {
      wx.showToast({
        title: '提现金额最低限制100起！',
        icon: 'none'
      })
      return
    }
    
    if( !debug_submit ){
      return
    }
    that.setData({
      debug_submit:false
    })
    wx.showModal({
      title: '提现提醒',
      content: '审核通过后1-2个工作日到账',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#d3d3d3',
      confirmText: '确认',
      confirmColor: '#65B532',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '提现中...',
          })
          common.post('/Users/WithdrwApply', {
            member_id: wx.getStorageSync('member_id'),
            withdrw_money,
          }).then(res => {
            if (res.data.code == 0) {
              wx.hideLoading();
              wx.showToast({
                title: '提交审核成功！',
                icon: 'none',
                duration: 1500,
              })
              setTimeout(function(){
                that.setData({
                  is_tixian: false
                })
                that.getPersonInfo();
              },1500)

            } else {
              wx.hideLoading();
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
              that.setData({
                debug_submit:true
              })
            }
          }).catch(e => {
            wx.hideLoading();
            that.setData({
              debug_submit:true
            })
            console.log(e)
          })
        }
        if (res.cancel) {
          wx.hideLoading()
          that.setData({
            debug_submit:true,
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
})