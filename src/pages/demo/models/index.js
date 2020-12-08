import * as services from '../services';

export default {
  namespace: 'demoModel',
  state: {
    listData: [],
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


    //  详情
    * getData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getData(), payload);
      if (data) {
        yield put({type: 'updateState', res: {listData: data}});
      }
      if (callback) {
        callback(data);
      }
    },

    //  保存
    * addData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.addData, payload);
      if (callback) {
        callback(data);
      }
    },

  },


};

