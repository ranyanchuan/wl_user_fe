import {requestJson} from 'utils/request';

const api = {
  addUser: '/api/user/insert', // 添加用户
  logout: '/api/user/logout', // 用户退出
  login: '/api/user/login', // 用户登录
  getCode: '/login/getCode', // 获取短信
  dologin: '/h5/doh5login', // 更新用户信息
};

// 添加用户
export async function addUser(payload) {
  return requestJson(api.addUser, {
    method: 'POST',
    payload
  });
}


// 用户退出
export async function logout(payload) {
  return requestJson(api.logout, {
    method: 'POST',
    payload
  });
}


// 用户登录
export async function login(payload) {
  return requestJson(api.login, {
    method: 'POST',
    payload
  });
}

// 获取短信验证码
export async function getCode(payload) {
  return requestJson(api.getCode, {
    method: 'POST',
    payload,
  });
}
// 更新用户信息
export async function updUser(payload) {
  return requestJson(api.dologin, {
    method: 'POST',
    payload,
  });
}

