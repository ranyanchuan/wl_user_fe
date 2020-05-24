import * as services from '../services';

export default {
  namespace: 'findModel',

  state: {


    blockData: {
      rows: [],
      pageNumber: 1,
      total: 0,
      pageSize: 20,
    },

    descData: {
      traces: [],
    },

    fahuoData: {
      pageIndex: 1,
      pageNumber: 1,
      pageSize: 20,
      rows: []
    },

  },


  reducers: {

    updateState(state, {res}) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {


    // 登录
    * dologin({payload, callback}, {call, put, select}) {
      debugger
      const data = yield call(services.dologin, payload);
      if (callback) {
        callback(data);
      }
    },

    //  发货
    * getFahuo({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getFahuo, payload);
      if (data) {
        yield put({type: 'updateState', res: {fahuoData: data}});
      }
      if (callback) {
        callback(data);
      }
    },


    //  分页查询
    * getDesc({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getDesc, payload);
      if (data) {
        yield put({type: 'updateState', res: {descData: data}});
      }
      if (callback) {
        callback(data);
      }
    },


  },


};

