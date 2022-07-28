// pages/home/index.js
import common from "../../common/common";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster_tabs:[
      {id:1,image:'/images/banner-1.jpg'},
      {id:2,image:'/images/banner-2.png'},
      {id:3,image:'/images/banner-3.jpg'},
      {id:3,image:'/images/banner-4.jpg'}
    ],
    swiper_index:0,
//  ===========  ↓ 留一张弹窗数据  ========
    is_lay:false,
    region:['北京','北京市','东城区'],
    garden:'',
    checkeditems: [
      {value: '1', name: '男'},
      {value: '2', name: '女'},
    ],
    gender:'', // 性别
    weChatNumber:'', // 微信号
    lay_age:'', // 年龄
    is_checkboxType:false, // 选择类型状态
    constellation:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'], // 星座
    sel_constellation:'', // 选择的星座
    lay_introduce:'', // 介绍
//  ===========  ↓ 抽一张弹窗数据  ========
    is_smoke:false,
    smoke_region:['北京','北京市','东城区'],
    somke_garden:'',
    somke_checkeditems: [ // 性别
      {value: '1', name: '男'},
      {value: '2', name: '女'},
    ],
    somke_gender:'', // 选中的性别
    somke_weChatNumber:'',// 微信号
    somke_constellation:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'], // 星座
    sel_somkeconstellation:'', // 选择的星座
    somke_typeitems: [   // 选择类型
      {value: '1', name: '随机'},
      {value: '2', name: '有'},
    ],
    somke_type:'', // 选中的类型

    selTab:'1',
    conditions_age_min:'', // 最小周岁
    conditions_age_min:'', // 最小周岁
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
  clickLeave(){
    this.setData({
      is_lay: true
    })
  },
  clickLeaveBackdrop(){
    this.setData({
      is_lay: false
    })
  },
  // 选择位置
  saveGarden(e) {
    console.log(e)
    this.setData({
      garden: (e.detail.value[0] + e.detail.value[1] + e.detail.value[2])
    })
  },
  //  选择性别
  radioChangeGender(e) {
    this.setData({
      gender: e.detail.value,
    })
  },
  // 选择类型
  checkboxType(){
    let that = this;
    that.setData({
      is_checkboxType: !that.data.is_checkboxType
    })
  },
  // 选择星座
  constellation(e){
    let that = this;
    let index = e.detail.value;
    let constellation = that.data.constellation;
    this.setData({
      sel_constellation: constellation[index],
    })
  },
  // 留1张提交
  laySub(e){
    let that = this;
    let garden = that.data.garden;
    let constellation = that.data.sel_constellation;
    let params = {
      garden,   //  位置
      gender: e.detail.value.gender, // 性别
      weChatNumber: e.detail.value.weChatNumber, // 微信号
      age: e.detail.value.age, // 年龄
      type: that.data.is_checkboxType?'1':'2', // 类型
      constellation, // 星座
      introduce: e.detail.value.lay_introduce  // 介绍
    }



  },


  // 点击抽1张
  clickSmoke(){
    this.setData({
      is_smoke:true,
    })
  },
  //  点击抽一张弹窗背景
  clickSmokeBackdrop(){
    this.setData({
      is_smoke:false,
    })
  },
  // 选择意向位置
  saveSomkeGarden(e) {
    this.setData({
      somke_garden: (e.detail.value[0] + e.detail.value[1] + e.detail.value[2])
    })
  },
  //  选择意向性别
  radioChangeSomkeGender(e) {
    this.setData({
      somke_gender: e.detail.value,
    })
  },
  // 选择星座
  somke_constellation(e){
    let that = this;
    let index = e.detail.value;
    let constellation = that.data.somke_constellation;
    this.setData({
      sel_somkeconstellation: constellation[index],
    })
  },
  // 选择类型
  radioChangeSomkeType(e){
    this.setData({
      somke_type: e.detail.value,
    })
  },
  // 抽1张立即提交
  smokeSub(e){
    console.log(e)
  },




  layModalTab(e){
    this.setData({
      selTab:e.currentTarget.dataset.seltab,
    })
  }
})