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


    fahuoTestData: {
      pageIndex: 1,
      pageNumber: 1,
      pageSize: 20,
      rows: [
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
          title: 'McDonald\'s invites you',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
      ]
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


    // 获取验证码
    * getCode({payload, callback}, {call, put, select}) {
      const data = yield call(services.getCode, payload);
      if (callback) {
        callback(data);
      }
    },

    // 登录
    * dologin({payload, callback}, {call, put, select}) {
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


    //  发货
    * getTestFahuo({payload, callback}, {call, put, select}) {
      // const {data} = yield call(services.getFahuo, payload);
      // if (data) {
      //   yield put({type: 'updateState', res: {fahuoTestData: data}});
      // }

      const data = [{
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
      },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
          title: 'McDonald\'s invites you',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          des: '不是所有的兼职汪都需要风吹日晒',
        }];


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


    //  分页查询
    * getQueryInfo({payload, callback}, {call, put, select}) {
      const data = yield call(services.getDesc, payload);
      if (callback) {
        callback(data);
      }

    },

  },


};

