import React from 'react';
import {connect} from 'dva';

import {Button, List, InputItem, Carousel, Toast} from 'antd-mobile';
import {checkError, checkEdit, getPageParam} from 'utils';
import {createForm} from 'rc-form';
import FahuoList from "./FahuoList";

import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

@connect((state) => ({
  findModel: state.findModel,
}))

class ProductApp extends React.Component {

  state = {
    countdown: true,
    isCountdown: 0,
  };


  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.getData();
      Toast.loading('Loading...', 0);
    }
  }


  getData = (payload = {}) => {
    this.props.dispatch({
      type: 'findModel/getFahuo',
      payload,
      callback: (data) => {
        console.log(data);
        Toast.hide();
      },
    });
  }

  // 获取输入框的值
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let usercode = values.usercode.replace(/\s+/g, "");
        this.props.dispatch({
          type: 'findModel/dologin',
          payload: {...values, usercode},
          callback: (value) => {
            const {data, code} = value;
            if (checkError(value)) {
              const {token} = data;
              localStorage.setItem("token", token);
              this.getData();
            }
          },
        });
      } else {
        Toast.info('请正确输入', 1);
      }
    })
  }


  getCode = () => {

    this.props.form.validateFields(['usercode'], (err, values) => {

      if (!err) {
        let usercode = values.usercode.replace(/\s+/g, "");

        if (usercode && (/^1[3456789]\d{9}$/.test(usercode))) {
          this.setState({isCountdown: 60});

          this.countFun();
          this.props.dispatch({
            type: 'commonModel/dologin',
            payload: {usercode},
            callback: (data) => {
              const temp = {spinning: false};
              if (checkError(data)) {
                console.log('验证码发送成功');
              }
              this.setState(temp);
            },
          });

        } else {
          Toast.info('手机号码有误，请重填!', 1);
        }
      }
    })

  }


  initMsm = () => {
    clearInterval(this.timer);
    this.setState({isCountdown: 0});
  };

  countFun = () => {

    this.timer = setInterval(() => {
      const {isCountdown} = this.state;
      //防止倒计时出现负数
      if (isCountdown > 0) {
        this.setState({isCountdown: isCountdown - 1});
      } else {
        this.initMsm();
      }
    }, 1000);
  };


  render() {

    const {getFieldProps} = this.props.form;
    const {isCountdown} = this.state;

    const token = localStorage.getItem('token');

    const codeInfo = isCountdown ? isCountdown + 's 后重新获取' :
      <span onClick={this.getCode} className={styles.reGetCode}>获取验证码</span>;


    return (
      <div>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          <img
            src={`https://img1.mukewang.com/szimg/5ea0118b0948c90a12000676-360-202.png`}
            alt=""
            style={{width: '100%', verticalAlign: 'top'}}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({imgHeight: 'auto'});
            }}
          />
        </Carousel>

        {/*获取手机号*/}

        {token ?
          <FahuoList/> :
          <div>
            <List>
              <InputItem
                {...getFieldProps('usercode', {
                  rules: [{required: true, message: "请输入手机号"}],
                  initialValue: "",
                })}
                type="phone"
                placeholder="186 1234 1234"
              >手机号码</InputItem>

              <InputItem
                {...getFieldProps('password', {
                  rules: [{required: true, message: "请输入验证码"}],
                  initialValue: "",
                })}
                extra={codeInfo}
              >验证码</InputItem>

            </List>
            <Button type="primary" onClick={this.onSubmit}>登录</Button>
          </div>
        }


      </div>
    );
  }
}

export default createForm()(ProductApp);
