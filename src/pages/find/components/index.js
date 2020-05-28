import React from 'react';
import {connect} from 'dva';
import {Button, List, InputItem, Carousel, Toast, WingBlank} from 'antd-mobile';
import {createForm} from 'rc-form';
// import FahuoList from "./FahuoList/copy.js";
import FahuoList from "./FahuoList/";


import {checkError} from 'utils';
import styles from './index.less';


@connect((state) => ({
  findModel: state.findModel,
}))

class ProductApp extends React.Component {

  state = {
    countdown: true,
    isCountdown: 0,
    codeNum: 0,
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

    Toast.loading('Loading...');
    this.props.dispatch({
      type: 'findModel/getFahuo',
      payload: {...payload, pageIndex: 1, pageSize: 500},
      callback: (data) => {
        console.log(data);
        Toast.hide();
      },
    });

  }


  // 获取输入框的值
  onSubmit = () => {

    this.props.form.validateFields(['usercode', 'password'], (err, values) => {
      if (!err) {
        let usercode = values.usercode.replace(/\s+/g, "");
        // 校验手机号
        if (usercode) {
          Toast.loading('Loading...');
          this.props.dispatch({
            type: 'findModel/dologin',
            payload: {...values, usercode},
            callback: (value) => {
              Toast.hide();
              const {data} = value;
              if (data && checkError(value)) {
                this.getData();
                const {token} = data;
                localStorage.setItem("token", token);
              }
              const {codeNum} = this.state;
              this.setState({codeNum: codeNum + 1});
            },
          });
        }

      } else {
        Toast.info('请正确输入手机号/短信验证码', 2);
      }
    })
  }


  getCode = () => {

    // 更新图形验证码
    const {codeNum} = this.state;
    this.setState({codeNum: codeNum + 1});

    this.props.form.validateFields(['usercode', 'smscode'], (err, values) => {
      if (!err) {
        let usercode = values.usercode.replace(/\s+/g, "");
        if (usercode && (/^1[3456789]\d{9}$/.test(usercode))) {

          this.props.dispatch({
            type: 'findModel/getCode',
            payload: {...values, usercode},
            callback: (data) => {
              if (checkError(data)) {
                this.setState({isCountdown: 60});
                this.countFun();
                Toast.success('验证码发送成功!', 2);
              }
            },
          });
        }
      } else {
        Toast.info('手机号码或者图形验证码有误!', 2);
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


  // 获取验证码
  getyz = () => {
    const {codeNum} = this.state;
    this.setState({codeNum: codeNum + 1})
  }


  render() {

    const {getFieldProps} = this.props.form;
    const {isCountdown, hasError, codeNum} = this.state;
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
            <FahuoList getData={this.getData}/> :
            <div style={{marginTop: 20}}>
              <List>
                {/*手机号*/}
                <InputItem
                  {...getFieldProps('usercode', {

                    rules: [{required: true, message: "请输入手机号"}],
                    initialValue: "",
                    onChange: this.onChangeUser,
                  })}
                  type="phone"
                  error={hasError}
                  onErrorClick={this.onErrorClick}
                  placeholder="186 **** ****"
                >
                  手机号码
                </InputItem>

                {/*图形验证*/}
                <InputItem
                  {...getFieldProps('smscode', {
                    rules: [{required: true, message: "请输入图形验证码"}],
                    initialValue: "",
                  })}
                  onErrorClick={this.onErrorClick}
                  placeholder="请输入图形验证码"
                  extra={<img className={styles.identityImg} src={`h5/getyz?name=${codeNum + 1}`}
                              alt="验证码"
                              onClick={this.getyz}/>}
                >
                  图形验证码
                </InputItem>

                {/*短信验证码*/}
                <InputItem
                  {...getFieldProps('password', {
                    rules: [{
                      required: true,
                      message: "请输入短信验证码"
                    }],
                  })}
                  placeholder="请输入短信验证码"
                  extra={codeInfo}
                >
                  短信验证码
                </InputItem>


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
