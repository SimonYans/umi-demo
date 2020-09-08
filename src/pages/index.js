import styles from './index.less';
import { useState, useEffect } from 'react';
import { connect } from 'dva';

function Index(props) {
  const { dispatch, userInfo } = props;
  useEffect(() => {
    dispatch({ type: 'index/getUserInfo' });
  }, []);
  return (
    <div className={styles.index}>
      {userInfo.name}<br/>
      {userInfo.email}
    </div>
  );
}

export default connect(state => ({
  userInfo: state.index.userInfo
}))(Index);
