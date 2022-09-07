// pages/home/index.js
import common from "../../common/common";
import multiArray from "../../js/multiArray";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_status: 1, // 页面状态
    objectMultiArray:multiArray.objectMultiArray,
    multiIndex: [0, 0],
    multiArray: [
        ['北京市', '安徽省', "福建省", "甘肃省", "广东省", "广西省", "贵州省", "海南省", "河北省", "河南省", "黑龙江省", "湖北省", "湖南省", "吉林省", "江苏省", "江西省", "辽宁省", "内蒙古自治区", "宁夏回族自治区", "青海省", "山东省", "山西省", "陕西省", "上海市", "四川省", "天津省", "西藏自治区", "新疆维吾尔自治区", "云南省", "浙江省", "重庆市", "香港", "澳门", "台湾"],
        ["北京市"]
    ],
    address:'',  // 选中的地址
    poster_tabs:[],
    photos:[], // 精彩推荐列表
    pagesIndex: 1,// 精彩推荐列表分页
    swiper_index:0,
//  ===========  ↓ 留一张弹窗数据  ========
    is_lay:false,
    checkeditems: [
      {value: '1', name: '男'},
      {value: '2', name: '女'},
    ],
    gender:'', // 性别
    wx_account:'', // 微信号
    lay_age:'', // 年龄
    select_type: '1', // 选择类型状态 1、默认，2、一直抽
    constellation:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'], // 星座
    sel_constellation:'', // 选择的星座
    lay_introduce:'', // 介绍
//  ===========  ↓ 抽一张弹窗数据  ========
    is_smoke:false,
    somke_constellation:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'], // 星座
    somke_checkeditems: [ // 性别
      {value: '1', name: '男'},
      {value: '2', name: '女'},
    ],
    somke_typeitems: [   // 选择的类型数据
      {value: '1', name: '随机'},
      {value: '2', name: '有'},
    ],
    somke_gender:'', // 选中的性别
    somke_wx_account:'',// 微信号
    
    sel_somkeconstellation:'', // 选择的星座
    somke_type:'', // 选中的类型
    conditions_age_min:'', // 最小周岁
    conditions_age_min:'', // 最小周岁

    selTab:'1',  // 抽一张 普通/条件 选择
    type_box:'', // 选择的是哪个类型盒子 1、男生盒子， 2、女生盒子
    selagetab:'3', // 3、全部 1、只看男生； 2、只看女生
    is_p: false,
    wxtext: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    if(options.meb_id){
      wx.setStorageSync('meb_id', options.meb_id);
    }
    const accountInfo = wx.getAccountInfoSync();
    //release 正式服
    that.setData({
      page_status: accountInfo.miniProgram.envVersion === 'release' ? '1' : '1',
    })
    wx.setNavigationBarTitle({
      title: accountInfo.miniProgram.envVersion === 'release' ? '线上脱单盲盒' : '生活服务',
    })
    that.getposter_tabs();
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
    this.setData({
      selagetab:'3', // 3、全部 1、只看男生； 2、只看女生
      pagesIndex: 1,
      photos:[],
    })
    this.getphotos('3');
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
  clickLeave(e){
    let member_id = wx.getStorageSync('member_id');
    if(!member_id){
      this.getmember();
      return
    }
    this.setData({
      is_lay: true,
      type_box: e.currentTarget.dataset.type_box,
    })
  },
  clickLeaveBackdrop(){
    this.setData({
      is_lay: false,
      address:'',
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
    let select_type = that.data.select_type;
    if(select_type == '1'){
      that.setData({
        select_type: '2'
      })
    }else{
      that.setData({
        select_type: '1'
      })
    }

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
    let address = that.data.address; //省市区
    let constellation = that.data.sel_constellation;
    let params = {
      member_id: wx.getStorageSync('member_id'),
      address,
      gender: e.detail.value.gender, // 性别
      wx_account: e.detail.value.wx_account, // 微信号
      age: e.detail.value.age, // 年龄
      select_type: that.data.select_type, // 类型
      constellation, // 星座
      self_introduction: e.detail.value.lay_introduce,  // 介绍
      type: that.data.type_box, // 性别盒子
    }
    if(params.address == ''){
      wx.showToast({
        title: '请先选择位置！',
        icon:'none'
      })
      return
    }
    if(params.gender == ''){
      wx.showToast({
        title: '请先选择您的性别！',
        icon:'none'
      })
      return
    }
    if(params.wx_account == ''){
      wx.showToast({
        title: '请先填写微信号码！',
        icon:'none'
      })
      return
    }    
    if(params.age == ''){
      wx.showToast({
        title: '请输入年龄！',
        icon:'none'
      })
      return
    }
    if(params.constellation == ''){
      wx.showToast({
        title: '请选择您的星座！',
        icon:'none'
      })
      return
    }
    common.post('/PaperSlip/index',params).then( res =>{
      if (res.data.code == 0){
        var $config = res.data.data;
        if($config.length == 0){
          wx.showToast({
            title: '纸条留取成功！',
            duration: 1000,
            icon: 'success'
          })
          setTimeout(function(){
            that.setData({
              is_lay: false
            })
          },1500)
          return
        }
        wx.requestPayment({
          timeStamp: $config['timeStamp'], //注意 timeStamp 的格式
          nonceStr: $config['nonceStr'],
          package: $config['package'],
          signType: $config['signType'],
          paySign: $config['paySign'], // 支付签名
          success: function (res) {
            console.log(res)
            // 支付成功后的回调函数
            wx.setStorageSync('order_no', $config['order_no']);
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              icon: 'success'
            }) 
            setTimeout(function(){
              that.setData({
                is_lay: false
              })
            },1500)

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
          icon:'none'
        })
      }
    }).catch(e =>{
        console.log(e)
    })



  },
  // 点击抽1张
  clickSmoke(e){
    console.log(e)
    let that = this;
    let member_id = wx.getStorageSync('member_id');
    if(!member_id){
      that.getmember();
    }else{
      that.setData({
        is_smoke:true,
        type_box: e.currentTarget.dataset.type_box,
      })
    }

  },
  //  点击抽一张弹窗背景
  clickSmokeBackdrop(){
    this.setData({
      is_smoke:false,
      address:'',
      selTab: '1',
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
    let that = this;
    let type_box = that.data.type_box;
    let address = that.data.address;
    let gender = e.detail.value.somke_gender;
    let wx_account =  e.detail.value.wx_account;
    let parmas = {
      member_id: wx.getStorageSync('member_id'),
      type: type_box,
      address,
      gender,
      wx_account,
    }
    let selTab = that.data.selTab;
    if(selTab == '1'){
      // 普通盲盒
      parmas.takeout_type = 'ordinary';
    }else if(selTab == '2'){
      // 条件盲盒
      parmas.takeout_type = 'condition';
      parmas.constellation = that.data.sel_somkeconstellation;
      parmas.select_type = that.data.somke_type;
      parmas.min_age = e.detail.value.conditions_age_min;
      parmas.max_age = e.detail.value.conditions_age_max;
    }
    common.post('/PaperSlip/takeOutPaperSlip',parmas).then( res =>{
      console.log(res)
      if (res.data.code == 0){
        var $config = res.data.data;
        var order_no =  $config.order_no;
        wx.requestPayment({
          timeStamp: $config['timeStamp'], //注意 timeStamp 的格式
          nonceStr: $config['nonceStr'],
          package: $config['package'],
          signType: $config['signType'],
          paySign: $config['paySign'], // 支付签名
          success: function (res) {
            console.log(res)
            // 支付成功后的回调函数
            wx.setStorageSync('order_no', $config['order_no']);
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              icon: 'success'
            })
            setTimeout(function () {
              that.setData({
                is_smoke:false,
              })
              that.orderFormBtn(order_no);
            }, 1000)
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
          title: res.data.msg,
          icon:'none'
        })
      }
    }).catch(e =>{
        console.log(e)
    })
  },

  layModalTab(e){
    this.setData({    
      sel_somkeconstellation:'', // 选择的星座
      somke_type:'', // 选中的类型
      conditions_age_min:'', // 最小周岁
      conditions_age_min:'', // 最小周岁
      selTab:e.currentTarget.dataset.seltab,
    })
  },

  // 跳转常见问题
  gotoProblem(){
    wx.navigateTo({
      url: '/pages/commonProblem/index',
    })
  },
  // 选择位置
  bindMultiPickerChange(e) {
    let multiArray = this.data.multiArray;
    this.setData({
      address: multiArray[0][e.detail.value[0]] + multiArray[1][e.detail.value[1]],
    })
  },
  // 监听位置变化
  bindMultiPickerColumnChange(e) {
    let that = this;
    let multiIndex = that.data.multiIndex;
    let objectMultiArray = that.data.objectMultiArray;
    let multiArray = that.data.multiArray;
    switch (e.detail.column) {
      case 0:
        let list = []
        for (var i = 0; i < objectMultiArray.length; i++) {
            if (objectMultiArray[i].parid == objectMultiArray[e.detail.value].regid) {
              list.push(objectMultiArray[i].regname)
            }
        }
        multiArray[1] = list;
        multiIndex[0] = e.detail.value;
        multiIndex[1] = 0;
        that.setData({
          multiArray,
          multiIndex
        })
    }
  },
  getmember(){
    wx.showToast({
      title: '请先登录！',
      icon:'none'
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/userLogin/index',
      })
    },1000)
  },
  // 轮播图
  getposter_tabs(){
    let that = this;
    common.post('/banner/index',{}).then( res =>{
      if(res.data.code == 0){
        that.setData({
          poster_tabs: res.data.data.list,
          // page_status: res.data.data.status
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    }).catch(e =>{
      console.log(e)
    })
  },
  // 精彩推荐
  getphotos(g){
    let that = this;
    let gender = g;
    common.post('/index/photos',{
      member_id: wx.getStorageSync('member_id'),
      gender,
    }).then( res =>{
      if(res.data.code == 0){
        that.setData({
          photos: res.data.data,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    }).catch(e =>{
      console.log(e)
    })
  },
  selagetab (e){
    this.setData({
      selagetab: e.currentTarget.dataset.selagetab,
    })
    this.getphotos(e.currentTarget.dataset.selagetab);
  },
  // 点击头像支付
  clickavatar(e){
    let that = this;
    let avatar_member_id = e.currentTarget.dataset.avatar_id;
    let member_id =  wx.getStorageSync('member_id');
    if(!member_id){
      that.getmember();
      return
    }
    let parmas = {
      member_id,
      avatar_member_id,
    }
    common.post('/PaperSlip/getWxByClickAvatar',parmas).then( res =>{
      if (res.data.code == 0){
        var $config = res.data.data;
        var order_no =  $config.order_no;
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
              title: '获取成功！',
              duration: 1000,
              icon: 'success'
            })
            setTimeout(function () {
              that.orderFormBtn(order_no);
            }, 1000)
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
          title: res.data.msg,
          icon:'none'
        })
      }
    }).catch(e =>{
        console.log(e)
    })
  },

  // 复制
  fuzhi_wxText(e){
    let that = this;
    let S_info = e.currentTarget.dataset.wxtext;
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
  notice_btn(){
    let that = this;
    that.setData({
      is_p:false,
    })
  },
  // 订单号查询微信号
  orderFormBtn(d){
    let that = this;
    let order_no = d;
    common.get('/wechat/orderDetail', {
      order_no
    }).then(res => {
      if (res.data.code == 0) {
        that.setData({
          wxtext: res.data.data.get_wxaccount,
          is_p: true
        })
      }else{
        wx.showToast({
          title: res.data.code,
          icon:'none'
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },
  gotoProblem1(){
    wx.showToast({
      title: '敬请期待！',
      icon:'none'
    })
  }
})