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
      <div class="home_button"><router-link to="item"><img src="../../static/images/1-4.png" alt=""></router-link></div>
    </div>
    <div v-if="answer == 'item'" class="item_bg">
      <div class="item_title">{{itemDetail[itemNum-1].title}}</div>
      <div class="item_button" @click="nextQuestion()" v-if="itemNum < itemDetail.length"><img src="../../static/images/2-2.png" alt=""></div>
      <div class="item_button" @click="nextQuestion()" v-else><img src="../../static/images/3-1.png" alt=""></div>
      <ul class="item_ul">
        <li v-for="(item, index) in itemDetail[itemNum-1].select" :key="index"  v-if="itemDetail">
          <!--选项-->
          <span class="item_select" @click="selected(index,item.score)" :class="{selected:isSelect == index}" >{{
            options[index]}}
          </span>
          <!--答案-->
          <span>{{item.options}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      cycle: '第一期',
      options: ['A', 'B', 'C', 'D'],
      isSelect: null,
      totalPoints: ''
    }
  },
  // 计算属性取值
  computed: mapState([
    'itemDetail', // 数据详情
    'level', // 第几周期
    'time', // 所用时间
    'itemNum' // 第几题
  ]),
  props: ['answer'],
  mounted () {

  },
  methods: {
    ...mapMutations([
      'CLICK_NEXT'
    ]),
    nextQuestion: function () {
      // 点击下一页的时候是否有选中答案
      if (this.isSelect != null) {
        this.isSelect = null
        // 判断是不是最后一题
        if (this.itemNum < this.itemDetail.length) {
          this.CLICK_NEXT(1)
        }
      } else {
        alert('请选择答案')
      }
    },
    selected: function (i, points) {
      this.isSelect = i
      // 选中答案记录分数
      this.totalPoints += Number(points)
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
    }
</style>
