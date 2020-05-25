import React from 'react';
import {connect} from 'dva';
import {Button, List, InputItem, Carousel, Toast, WingBlank} from 'antd-mobile';
import {createForm} from 'rc-form';
import {checkError} from 'utils';
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
    hasError: false,
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
            const {data} = value;
            if (data && checkError(value)) {
              this.getData();
              const {token} = data;
              localStorage.setItem("token", token);
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
            type: 'findModel/getCode',
            payload: {usercode},
            callback: (data) => {
              if (checkError(data)) {
                console.log('验证码发送成功');
              }
            },
          });

        } else {
          Toast.info('手机号码有误!', 1);
        }
      }
    })

  }


  initMsm = () => {

    clearInterval(this.timer);
    this.setState({isCountdown: 0});
  };

  // 倒计时开始
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

  // 动态校验手机
  onChangeUser = (value) => {

    let usercode = value.replace(/\s+/g, "");
    let hasError = true;
    if (usercode && (/^1[3456789]\d{9}$/.test(usercode))) {
      hasError = false;
    }
    this.setState({hasError});
  }


  // 错误提示
  onErrorClick = () => {
    Toast.info('手机号码有误!', 1);
  }

  render() {

    const {getFieldProps} = this.props.form;
    const {isCountdown, hasError} = this.state;
    const token = localStorage.getItem('token');

    const codeInfo = isCountdown ? isCountdown + 's 后重新获取' :
      <span onClick={this.getCode} className={styles.reGetCode}>获取验证码</span>;


    return (
      <div style={{backgroundColor: "#f5f5f9"}}>
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
              window.dispatchEvent(new Event('resize'));
              this.setState({imgHeight: 'auto'});
            }}
          />
        </Carousel>

        {/*获取手机号*/}
        <WingBlank>
          {token ?
            <FahuoList/> :
            <div style={{marginTop: 20}}>
              <List>
                <InputItem
                  {...getFieldProps('usercode', {

                    rules: [{required: true, message: "请输入手机号"}],
                    initialValue: "",
                    onChange: this.onChangeUser,

                  })}
                  type="phone"
                  error={hasError}
                  onErrorClick={this.onErrorClick}
                  placeholder="186 1234 1234"
                  extra={!hasError ? codeInfo : null}
                >手机号码</InputItem>

                <InputItem
                  {...getFieldProps('password', {
                    rules: [{required: true, message: "请输入验证码"}],
                    initialValue: "",
                  })}
                >短信验证</InputItem>

              </List>
              <Button type="primary" style={{marginTop: 20}} onClick={this.onSubmit}>登录</Button>
            </div>
          }
        </WingBlank>


      </div>
    );
  }
}

export default createForm()(ProductApp);
