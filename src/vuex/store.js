import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const CLICK_NEXT = 'CLICK_NEXT';
const RECORFING_TIME = 'RECORFING_TIME';
const TOTAL_SCORE = 'TOTAL_SCORE'
// 书写数据的地方
const state = {
  level: '第一周', // 活动周期数
  itemNum: 1, // 第几题
  time: 0, // 做题所需要的时间
  itemDetail: [
    // 题目一
    {
      id: 1,
      title: '题目一',
      type: 'one',
      select: [
        // 题目选项
        {
          id: 1,
          options: '我是选项一',
          score: 10
        }, {
          id: 2,
          options: '我是选项二',
          score: 20
        }, {
          id: 3,
          options: '我是选项三',
          score: 30
        }, {
          id: 4,
          options: '我是选项四',
          score: 40
        }
      ]
    },
    // 题目二
    {
      id: 2,
      title: '题目二',
      type: 'two',
      select: [
        // 题目选项
        {
          id: 1,
          options: '我是选项一',
          score: 10
        }, {
          id: 2,
          options: '我是选项二',
          score: 20
        }, {
          id: 3,
          options: '我是选项三',
          score: 30
        }, {
          id: 4,
          options: '我是选项四',
          score: 40
        }
      ]


    },
    {
      id: 3,
      title: '题目三',
      type: 'three',
      select: [
        // 题目选项
        {
          id: 1,
          options: '我是选项一',
          score: 10
        }, {
          id: 2,
          options: '我是选项二',
          score: 20
        }, {
          id: 3,
          options: '我是选项三',
          score: 30
        }, {
          id: 4,
          options: '我是选项四',
          score: 40
        }
      ]


    },
    {
      id: 4,
      title: '题目四',
      type: 'three',
      select: [
        // 题目选项
        {
          id: 1,
          options: '我是选项一',
          score: 10
        }, {
          id: 2,
          options: '我是选项二',
          score: 20
        }, {
          id: 3,
          options: '我是选项三',
          score: 30
        }, {
          id: 4,
          options: '我是选项四',
          score: 40
        }
      ]


    }
  ], // 题目的数据
  // 储存选中的选项计算得分
  totalScore:null,
  timing:''
}

// 更改state的数据状态
const mutations = {
  [CLICK_NEXT] (state, num) {
    state.itemNum += Number(num)
  },
  // 设置定时器，记录做题时间
  [RECORFING_TIME] (state) {
    state.timing = setInterval(() => {
      state.time += 1
    },1000)
  },
  [TOTAL_SCORE] (state,number) {
    state.totalScore += number
  }
}
// 设置做题时间
const  actions = {
  timing:function ({commit, state}) {

  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
