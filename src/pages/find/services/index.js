import {requestJson} from 'utils/request';

const api = {
  dologin: '/h5/doh5login', // 登录
  getFahuo: '/h5/fahuo/page', // 发货
  getDesc: '/h5/wuliu/queryInfo', // 详情

};

export async function dologin(payload) {
  return requestJson(api.dologin, {
    method: 'POST',
    payload
  });
}

export async function getFahuo(payload) {
  return requestJson(api.getFahuo, {
    method: 'POST',
    payload
  });
}

// 查询
export async function getDesc(payload) {
  return requestJson(api.getDesc, {
    method: 'POST',
    payload
  });
}
