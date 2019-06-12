// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userUrl: "",
      nickname: "未登录"
    },
    actionText: "登录",
    btnType: "primary"
  },
  //登陆
  login: function() {
    if (this.data.actionText === "登录") {
      //登录接口
      wx.login({
        success: () => {
          //获取信息接口
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                userInfo: {
                  userUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName
                },
                actionText: "退出登录",
                btnType: "warn"
              })
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    userUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName,

                  },
                  actionText: "退出登录",
                  btnType: "warn"
                }
              })
            }
          })
        }
      })
    }else{
       //退出登录，清除storage,同步
      wx.removeStorageSync("userInfo"),
      this.setData({
        //退出登录，还原初始化数据
        userInfo: {
          userUrl: "",
          nickname: "未登录"
        },
        actionText: "登录",
        btnType: "primary"
      })
    }
  },
  //我的钱包
  movetoWallet:function(){
    wx.navigateTo({
      url: '../wallet/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          userInfo: {
            userUrl: res.data.userInfo.userUrl,
            username: res.data.userInfo.nickname
          },
          actionText: res.data.actionText,
          btnType: res.data.btnType,
        })
      },
    })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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