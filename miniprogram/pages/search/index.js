// miniprogram/pages/search/index.js

const MAX_LIMIT = 100;

let where = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ncovList: [],
    show: true,
    date: "",
    no: "",
    loadAll: 0,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
      ncovList: []
    })
    this._getNcovList();
    this._getTotal();
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
    this.setData({
      ncovList: []
    })
    this._getNcovList();
    this._getTotal();
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

  onScrolltolower: function(){
    console.log("滚动到底部时触发");
    this._getNcovList();
  },

  onScrolltoupper: function () {
    console.log("滚动到顶部时触发");

  },

  onDetailTap: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id
    })
  },

  onDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  onNoInput: function(e) {
    this.setData({
      no: e.detail  
    })
  },

  onSearchTap: function() {

    let date = this.data.date;
    let no = this.data.no;

    if (date == "" && no == "") {
      wx.showToast({
        title: '请输入查询条件',
        icon: 'none'
      })

      return;
    }

    where = {
      date,
      no
    };

    this.setData({
      loadAll: 0,
      ncovList: []
    })

    this._getNcovList();  

  },

  onResetTap: function() {
    this.setData({
      date: "",
      no: "",
      loadAll: 0,
      ncovList: []
    })

    where = {};
    this._getNcovList();  
  },

  _getTotal: function(){
    wx.cloud.callFunction({
      name: 'ncov',
      data: {
        $url: 'total'
      }
    }).then((res) => {
      console.log(res);
      this.setData({
        total: res.result.total
      })
    })
  },

  _getNcovList: function() {
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'ncov',
      data: {
        $url: 'search',
        start: this.data.ncovList.length,
        count: MAX_LIMIT,
        condition: where
      }
    }).then((res) => {
      console.log(res);
      if(res.result.data == 0)
      {
        this.setData({
          loadAll: 1
        })
      }
      else
      {
        this.setData({
          ncovList: this.data.ncovList.concat(res.result.data)
        })
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  }
})