import { getUserInfo } from '@/services/index';

export default {
  namespace: 'index',

  state: {
    userInfo: {}
  },

  effects: {
    *getUserInfo(_, { call, put }) {
      const response = yield call(getUserInfo);
      console.log('home response', response)
      if (response.code === 0) {
        yield put({
          type: 'saveUserInfo',
          payload: response.user,
        });
      }
    }
  },

  reducers: {
    saveUserInfo(state, action) {
      console.log('reducers', action.payload)
      return {
        ...state,
        userInfo: action.payload,
      };
    }
  },
};
