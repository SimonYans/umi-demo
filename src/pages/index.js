import { useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Index = (props) => {
  const { dispatch, userInfo } = props;
  useEffect(() => {
    dispatch({ type: 'index/getUserInfo' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
