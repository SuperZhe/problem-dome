<template>
  <div class="bg">
    <header>
      <!--第一个判断周期-->
      <span v-if="answer == 'home'">{{cycle}}</span>
      <!--判读第几题-->
      <span v-if="answer == 'item'">题目{{itemNum}}</span>
    </header>
    <!--在home页需要显示的东西-->
    <div v-if="answer == 'home'" class="home_bg">
      <div><img src="../../static/images/1-2.png" alt=""></div>
      <div class="home_button" @click="timing_start()"
      ><router-link to="item"><img src="../../static/images/1-4.png" alt=""></router-link></div>
    </div>
    <div v-if="answer == 'item'" class="item_bg">
      <div class="item_title">{{itemDetail[itemNum-1].title}}</div>
      <div class="item_button" @click="nextQuestion()" v-if="itemNum < itemDetail.length"><img src="../../static/images/2-2.png" alt=""></div>
      <div class="item_button" @click="nextQuestion()" v-else><img src="../../static/images/3-1.png" alt=""></div>
      <ul class="item_ul">
        <li v-for="(item, index) in itemDetail[itemNum-1].select" :key="index"  v-if="itemDetail">
          <!--选项-->
          <span class="item_select" v-model="totalPoints" @click="selected(index,item.score)" :class="{selected:isSelect ==
          index}" >{{
            options[index]}}
          </span>
          <!--答案-->
          <span>{{item.options}}</span>
        </li>
      </ul>
    </div>

    <div v-if="answer == 'score'" class="score_bg">
        <img src="../../static/images/4-2.png" alt="" class="score_show">
          <!--分数-->
        <div class="score_num"><span>{{totalScore}},{{time}}秒</span><br><span>{{scoreTips}}</span></div>
          <!--分享-->
        <div @click="share($event)" class="share_button"><img src="../../static/images/4-3.png" alt="">
          <!--分享指示-->
          <div @click="share($event)" class="share_show" v-show="isShare">
            <img src="../../static/images/5-2.png" alt="">
          </div>
        </div>
      <!--二维码-->
      <div class="score_code"><img src="../../static/images/4-4.png" alt=""></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations,mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      cycle: '第一期',
      options: ['A', 'B', 'C', 'D'],
      isSelect: null,
      totalPoints: 0,
      isShare:false,
      scoreTips: '',
      scoreTipsArr:['你说，是不是把知识都还给小学老师了？','还不错，但还需要继续加油哦！','不要嘚瑟还有进步的空间！','智商离爆表只差一步了！','你也太聪明啦，葡萄之家欢迎你！'],
    }
  },
  // 计算属性取值
  computed: mapState([
    'itemDetail', // 数据详情
    'level', // 第几周期
    'time', // 所用时间
    'itemNum', // 第几题
    'timing' ,// 定时器
    'totalScore'
  ]),
  props: ['answer','number'],
  mounted () {
    this.evaluation()
  },
  methods: {
    ...mapMutations([
      'CLICK_NEXT',
      'RECORFING_TIME',
      'TOTAL_SCORE'
    ]),
//    ...mapActions([
//      'timing'
//    ]),
    timing_start: function () {
      this.RECORFING_TIME()
    },
    nextQuestion: function () {
      // 点击下一页的时候是否有选中答案
      if (this.isSelect != null) {
        this.isSelect = null
        this.TOTAL_SCORE(this.totalPoints)
        // 判断是不是最后一题
        if (this.itemNum < this.itemDetail.length) {
          this.CLICK_NEXT(1)
        } else {
          this.$router.push('score')
          clearInterval(this.timing)
        }
      } else {
        alert('请选择答案')
      }
    },
    selected: function (i, points) {
      this.isSelect = i
      // 选中答案记录分数
      this.totalPoints = points
    },
    evaluation:function() {
      if(this.totalPoints <= 20) {
        this.scoreTips = this.scoreTipsArr[0];
        return
      }
      if(this.totalPoints <= 40) {
        this.scoreTips = this.scoreTipsArr[1];
        return
      }
      if(this.totalPoints <= 60) {
        this.scoreTips = this.scoreTipsArr[2];
        return
      }
      if(this.totalPoints <= 80) {
        this.scoreTips = this.scoreTipsArr[3];
        return
      }
      if(this.totalPoints <= 100) {
        this.scoreTips = this.scoreTipsArr[4];
      }
    },
    share:function (event) {
      event.cancelBubble = true
      this.isShare = !this.isShare
    }
  }
}
</script>

<style lang="scss">
  .bg{
    height: 100vh;
    width:100%;
    header{
      position: absolute;
      height: 8.35rem;
      width: 4.45rem;
      top: -1.3rem;
      right: 1.6rem;
      background: url(../../static/images/WechatIMG2.png) no-repeat;
      background-size: 100% 100%;
      z-index: 10;
      span{
        position: absolute;
        top:6.4rem;
        left:1.4rem;
        font-size: 12px;
        }
      }
    .home_bg{
      width: 80%;
      position: absolute;
      top:20%;
      left:50%;
      transform: translateX(-50%);
      img{
        width:100%;
        }
      .home_button{
        width:35%;
        margin: 0 auto;
        }
      }
    .item_bg{
      position: fixed;
      /*height:100%;*/
      width:100%;
      top:30%;
      letter-spacing: 3px;
      .item_title{
        font-size: 18px;
        margin: 0.4rem 0;
        margin-left: 4rem;
        }
      .item_button{
        position: absolute;
        bottom:-4rem;
        left:50%;
        width:25%;
        transform: translateX(-50%);
        img{
          width:100%;
          }
        }
      .item_ul{
        margin-left: 4rem;
        li{
          margin: 0.4rem 0;
          .item_select{
            display: inline-block;
            height: 0.8rem;
            width:0.8rem;
            border: 1px solid #fff;
            border-radius: 50%;
            line-height: 0.8rem;
            text-align: center;
            margin-right: 0.2rem;
            font-size: 0.5rem;
            font-family: 'Arial';
            }
          .selected{
            background-color: lightcoral;
            }
          }
        }
      }
    .score_bg{
      height:100%;
      width:100%;
      background: url(../../static/images/4-1.jpg);
      background-size: cover;
      position: fixed;
      z-index: 11;
      text-align: center;
      .score_show{
        width:60%;
        margin: 0 auto;
        margin-top: 2rem;
        }
      .score_num{
        position: absolute;
        top: 6rem;
        left:50%;
        color: #000;
        transform: translateX(-46%);
        span:nth-child(1){
          font-size: 2.2rem;

          color: indianred;
          }
          span:nth-last-child(1){
            color: #000;
            }
        }
      .share_button{
        margin: 1rem 0;
        >img{
          width:36%;
          }
        .share_show{
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: url(../../static/images/5-1.png);
          background-size: cover;
          z-index: 12;
          >img{
            width: 60%;
            position: absolute;
            top: 40%;
            left:50%;
            transform: translate(-50%,-50%);
            }
          }
        }
      .score_code{
        width:40%;
        margin: 0 auto;
        img{
          width:100%;
          }
        }
      }
    }
</style>
