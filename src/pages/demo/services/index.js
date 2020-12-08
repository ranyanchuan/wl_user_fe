import {requestJson} from 'utils/request';

const api = {
  get: '/h5/demo/list', // 列表
  add: '/h5/demo/save', // 保存
};

// 列表
export async function getData(payload) {
  return requestJson(api.get, {
    method: 'POST',
    payload
  });
}

// 保存
export async function addData(payload) {
  return requestJson(api.add, {
    method: 'POST',
    payload
  });
}

