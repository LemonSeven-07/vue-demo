import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  // state提供唯一的公共数据源，所有共享的数据都要统一放到Store的state中进行存储
  state: {
    count: 0,


    ///////////////////////////////////////////////////////////////
    // 所有的任务列表
    list: [],
    inputValue: 'enter',
    // 下一个Id
    nextId: 5,
    viewKey: 'all'
  },
  // getters用于对store中的数据进行加工处理形成新的数据，类似Vue的计算属性
  // store中数据的变化，getters的数据也会跟着变化
  // getters不会修改state中的数据，只会起到包装的作用
  getters: {
    showNum(state) {
      return '当前最新的数量是【' + state.count + '】'
    },


    /////////////////////////////////////////////////
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if(state.viewKey === 'all') {
        return state.list;
      }else if(state.viewKey === 'undone') {
        return state.list.filter(x => !x.done);
      }else if(state.viewKey === 'done') {
        return state.list.filter(x => x.done);
      }
      return state.list;
    }
  },
  // 用于变更store中的数据
  // 只能通过mutation变更store数据，不可以直接操作store中的数据
  // 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有的数据变化
  // mutations函数中不能执行异步操作,只能写同步的代码操作
  mutations: {
    add(state) {
      state.count ++;
    },

    addN(state, step) {
      state.count += step;
    },

    sub(state) {
      state.count --;
    },

    subN(state, step) {
      state.count -= step;
    },


    ////////////////////////////////////////////////////////////////
    initList(state, list) {
      state.list = list;
    },
    setInputValue(state, val) {
      state.inputValue = val;
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue = '';
    },
    removeItem(state, id) {
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id);
      if(i !==-1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id);
      if(i !== -1) {
        state.list[i].done = !param.status;
      }
    },
    // 清除已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key;
    }
  },
  /* 如果通过异步操作变更数据，必须通过actions，而不能使用mutations，
     但是在actions中还是要通过触发Mutations的方式间接变更数据
   */
  actions: {
    // 第一个形参context相当于new Vuex.Store实例对象
    addAsync(context) {
      setTimeout(() => {
        // 在actions中，不能直接修改state中的数据，必须通过context。commit()触发某个mutations才行
        context.commit('add')
      }, 1000)
    },

    addNAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },

    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },

    subNAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    },



    //////////////////////////////////////////////////////////////////////////
    getList(context) {
      axios.get('/static/list.json').then(res => {
        context.commit('initList', res.data);
      })
    }
  },
})
