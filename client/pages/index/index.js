//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false
    },

    // 用户登录示例
    bindGetUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (false) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            qcloud.loginWithCode({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "心血管疾病风险评估"
                    });
                    wx.redirectTo({
                        url: '../member/member'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "心血管疾病风险评估"
                    });
                    wx.redirectTo({
                        url: '../member/member'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
    },
    // 用户登录示例
    toGetUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (false) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            qcloud.loginWithCode({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "抑郁症筛查评测"
                    });
                    wx.redirectTo({
                        // url: '../yiyumember/yiyumember'
                        url: '../yiyumember/yiyumember'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "抑郁症筛查评测"
                    });
                    wx.redirectTo({
                        // url: '../yiyumember/yiyumember'
                        url: '../yiyumember/yiyumember'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
    },
    // 用户登录示例
    getUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (false) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            qcloud.loginWithCode({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "膝关节炎自我评估"
                    });
                    wx.redirectTo({
                        // url: '../yiyumember/yiyumember'
                        url: '../xiguanjiemember/xiguanjiemember'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    wx.setNavigationBarTitle({
                        title: "膝关节炎自我评估"
                    });
                    wx.redirectTo({
                        // url: '../yiyumember/yiyumember'
                        url: '../xiguanjiemember/xiguanjiemember'
                    })
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
    }
})
