import { login, logout } from '@/services/login';
import router from 'umi/router';

export default {
  namespace: 'login',

  state: {
    user: {},
    token: undefined
  },

  effects: {
    *login({payload}, { call, put }) {
      console.log('effect', payload)
      const response = yield call(login, payload);
      if (response.code === 0) {
        yield put({
          type: 'loginSuccess',
          payload: response.data,
        });
        localStorage.setItem('iop-auth-token', response.data)
        router.push('/');
      }
    },
    *logout(_, { call, put }) {
      const response = yield call(logout);
      yield put({
        type: 'logoutSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
    logoutSuccess(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
