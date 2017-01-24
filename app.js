//app.js
App({
    getUserInfo: function(cb) {
        var that = this

        if (this.globalData.userInfo || this.globalData.openid) {
            typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.openid)

        } else {
            var appid = 'wx8b906013f9fa2463'; //填写微信小程序appid  
            var secret = '34ac376876c298ace45604dd3f447851'; //填写微信小程序secret

            //调用登录接口
            wx.login({
                success: function(loginCode) {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo;
                            //调用request请求api转换登录凭证  
                            wx.request({
                                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function(res) {
                                    that.globalData.openid = res.data.openid //获取openid  
                                    typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.openid)

                                }
                            })

                        }
                    })
                }
            })

           
        }
    },
    onShow: function() {
        console.log("onShow")

    },
    onhide: function() {

        console.log("onHide");
    },

    globalData: {
        userInfo: null,
        openid: null,
        windowHeight: 600
    }
})