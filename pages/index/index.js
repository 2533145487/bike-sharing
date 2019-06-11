Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.20,
    latitude: 36.12
  },
  bindcontroltap: function(e) {
    switch (e.controlId) {
      case 1:
        this.movetoCenter();
        break;
      case 2:
        wx.scanCode({
          success:()=>{
            wx.showLoading({
              title: '正在获取密码',
            })
            
            //扫码成功调用一个接口
            wx.request({
              url: 'https://www.easy-mock.com/mock/5cfe3c3ce3eb86379d795707/ofo/getpassword',
              success:(res)=>{
                wx.hideLoading();
                wx.redirectTo({
                  url: '../scanReasult/index?password='+res.data.data.password+'&number='+res.data.data.number,
                  success:()=>{
                    wx.showToast({
                      title: '获取密码成功',
                      duration:1000
                    })
                  }
                })
              }
            })
          },
          fail:()=>{

          }
        })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var self=this
    wx.getLocation({
        success: (res) => {
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
        },
      }),
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            controls: [{
                id: 1,
                iconPath: "/images/location.png",
                position: {
                  width: 50,
                  height: 50,
                  left: 20,
                  top: res.windowHeight - 80,
                },
                clickable: true
              },
              {
                id: 2,
                iconPath: "/images/Use.png",
                position: {
                  width: 90,
                  height: 90,
                  left: res.windowWidth / 2 - 45,
                  top: res.windowHeight - 100,
                },
                clickable: true
              }, {
                id: 3,
                iconPath: "/images/warn.png",
                position: {
                  width: 50,
                  height: 50,
                  left: res.windowWidth - 70,
                  top: res.windowHeight - 80,
                },
                clickable: true
              }, {
                id: 4,
                iconPath: "/images/Avatar.png",
                position: {
                  width: 50,
                  height: 50,
                  top: res.windowHeight - 155,
                  left: res.windowWidth - 70,
                },
                clickable: true
              }, {
                id: 5,
                iconPath: "/images/marker.png",
                position: {
                  width: 30,
                  height: 50,
                  top: res.windowHeight / 2 - 45,
                  left: res.windowWidth / 2 - 15,
                }
              }
            ]
          })
        },
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
//创建一个回到中心点的方法
  movetoCenter: function() {
    this.mapctx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})