/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
  el: "#player",
  data: {
    //查询关键字
    query: "",
    //音乐列表
    musicList: [],
    //音乐地址
    musicUrl: "",
    //封面地址
    musicCover: "",
    //热门评论列表
    hotComments: [],
    //播放状态
    isPlaying: false,
    // 遮罩层的显示状态
    isShow: false,
    // mv地址
    mvUrl: "",






  },
  methods: {
    //歌曲搜索
    searchMusic: function () {
      axios.get("https://autumnfish.cn/search?keywords=" + this.query)
        .then(
          (ret) => {
            //console.log(ret);
            this.musicList = ret.data.result.songs;
          },
          function (err) { }
        )
    },
    //播放歌曲
    playMusic: function (musicId) {
      //console.log(musicId);
      //每次获取数据 this指向改变 用that存储this
      //获取歌曲地址
      axios.get("https://autumnfish.cn/song/url?id=" + musicId)
        .then(
          (response) => {
            this.musicUrl = response.data.data[0].url;
          },
          function (err) { })
      //获取歌曲图片
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
        .then(
          (response) => {
            this.musicCover = response.data.songs[0].al.picUrl;
          },
          function (err) { })
      //获取热门评论
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
        .then(
          (response) => {
            // console.log(response);
            this.hotComments = response.data.hotComments;
          },
          function (err) { })
    },
    //播放
    play: function () {
      this.isPlaying = true;
    },
    //暂停
    pause: function () {
      this.isPlaying = false;

    },
    playMv: function (mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
        .then(function (response) {
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        }, (function (err) { })

        )
    },
    hide: function () {
      this.isShow = false;

    },

  }
})