import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Button } from 'antd-mobile'
import { message } from 'antd'
import { createForm } from 'rc-form';
import styles from './index.less';

const loginForm = (props) => {
  const { dispatch } = props;
  const { getFieldProps, getFieldError } = props.form;

  const onSubmit = ()=>{
    props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
        console.log('login values', values)
        dispatch({
          type: 'login/login',
          payload: { ...values},
        });
      } else {
        console.log('Validation failed');
      }
    });
  }
  const validateUsername = (rule, value, callback) => {
    if (value && value.length>=6 && value.length<=20) {
      callback();
    } else if(value.length===0){
      callback(new Error('请输入用户姓名'));
    } else {
      callback(new Error('用户姓名不合法'));
    }
  }
  const validatePassword = (rule, value, callback) => {
    if (value && value.length >=6) {
      callback();
    } else if(value.length===0){
      callback(new Error('请输入密码'));
    } else {
      callback(new Error('请输入至少6位密码'));
    }
  }
  return (
    <form className={styles.login}>
      <List className={styles.formList}>
        <InputItem
          {...getFieldProps('username', {
            rules: [
              { validator: validateUsername},
            ],
          })}
          error={!!getFieldError('username')}
          onErrorClick={() => {
            message.info(getFieldError('username'), 1);
          }}
          clear
          placeholder="请输入"
        >
          <span>用户姓名</span>
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [
              { validator: validatePassword },
            ],
          })}
          error={!!getFieldError('password')}
          onErrorClick={() => {
            message.info(getFieldError('password'), 1);
          }}
          clear
          type="password"
          placeholder="请输入"
        >
          <span>用户密码</span>
        </InputItem>
        <List.Item>
          <Button type='primary' onClick={onSubmit}>确认</Button>
        </List.Item>
      </List>
    </form>
  );
}

export default connect(state => ({

}))(createForm()(loginForm));
