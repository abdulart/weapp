// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
      const db = wx.cloud.database();

      wx.getUserInfo({
        success: function(res) {
          console.log(res)
          db.collection('users').where({
            user_id: `${res.signature}`
          }).get({
            success: function(result) {
              if(result.data.length == 0) {
                db.collection('users').add({
                  data: {
                    email: "",
                    name: res.userInfo.nickName,
                    userObject: res.userInfo,
                    user_id: res.signature
                  },
                  success: function() {console.log('user added')},
                  fail: console.error
                })
              }
           },
           error: console.log
          })
        },
        error: function(err) {
          console.log(err)
        }
      })
    }

    this.globalData = {};
  }
});
