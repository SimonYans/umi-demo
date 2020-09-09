import { useEffect, useState } from 'react';
import { useToggle } from "ahooks";
import { connect } from 'dva';
import { List, Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import styles from './index.less';

const Index = (props) => {
  const { dispatch, userInfo } = props;
  const [ EN, { toggle: setEN } ] = useToggle()
  const [ show, { toggle: setShow } ] = useToggle()
  const [ startTime, setStartTime ] = useState(undefined)
  const [ endTime, setEndTime ] = useState(undefined)
  const [ config, setConfig ] = useState({})
  const [ now ] = useState(new Date());
  const changeLanguage = () => {
    setEN()
    setConfig({})
  }
  const onConfirm = (startTime, endTime) => {
    setShow()
    setStartTime(startTime)
    setEndTime(endTime)
  }

  const onCancel = () => {
    setShow()
    setStartTime(undefined)
    setEndTime(undefined)
  }
  const renderBtn = (zh, en, config = {}) => {
    config.locale = EN ? enUS : zhCN;
    return (
      <List.Item arrow="horizontal"
                 onClick={() => {
                   setShow()
                   setConfig(config)
                 }}
      >
        {EN ? en : zh}
      </List.Item>
    );
  }
  useEffect(() => {
    dispatch({ type: 'home/getUserInfo' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.index}>
      <List className="calendar-list" style={{ backgroundColor: 'white' }}>
        <List.Item className="item" extra={<Switch className="right" checked={!EN} onChange={changeLanguage} />}>
          {EN ? 'Chinese' : '中文'}
        </List.Item>
        {renderBtn('选择日期区间', 'Select Date Range')}
        {
          startTime &&
          <List.Item>Time1: {startTime.toLocaleString()}</List.Item>
        }
        {
          endTime &&
          <List.Item>Time2: {endTime.toLocaleString()}</List.Item>
        }
      </List>
      <Calendar
        {...config}
        visible={show}
        onCancel={onCancel}
        onConfirm={onConfirm}
        defaultDate={now}
      />
    </div>
  );
}

export default connect(state => ({
  userInfo: state.index.userInfo
}))(Index);
