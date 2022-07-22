// components/rwj-tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageActive: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarHeight: "100",
    active: 0
  },

  // 在组件实例进入页面节点树时执行
  attached: function () {
    this.setData({
      active: this.data.pageActive
    })
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
      let url = e.currentTarget.dataset.url;
      wx.switchTab({
        url: url,
      })
    },

  }
})
