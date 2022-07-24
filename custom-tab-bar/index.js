// components/rwj-tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarHeight: "100",
    show: false,
    active: 1,
    color: '#000',
    selectedColor: '#ff0000',
    list: [
      {
        'pagePath': '/pages/order/index',
        'iconPath':'/images/tabs_icon_00.png',
        'selectedIconPath':'/images/tabs_icon_show_00.png',
        'text': '订单'
      },
      {
        'pagePath': '/pages/home/index',
        'iconPath': '/images/icon_cost.png',
        'selectedIconPath':'/images/icon_cost_sel.png',
        'text': '主页'
      },
      {
        'pagePath': '/pages/booth/index',
        'iconPath': '/images/tabs_icon_02.png',
        'selectedIconPath':'/images/tabs_icon_show_02.png',
        'text': '摆摊'
      }
    ]
  },

  // 在组件实例进入页面节点树时执行
  attached: function () {
  },

  // 在组件实例被从页面节点树移除时执行
  detached: function () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    //页面跳转
    switchJump: function(e){
      console.log(e)
      let url = e.currentTarget.dataset.url;
      wx.switchTab({
        url: url,
      })
    },

  }
})
