import React from 'react';
import {connect} from 'dva';

import {Button, List, InputItem, Icon, NavBar, Toast} from 'antd-mobile';
import {checkError, checkEdit, getPageParam} from 'utils';
import {createForm} from 'rc-form';

import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

@connect((state) => ({
  detailModel: state.detailModel,
}))

class ProductApp extends React.Component {

  state = {


    countdown: true,
    isCountdown: 0,

    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
    userName: '',
    data: ['1', '2', '3'],
    imgHeight: 176,

  };

  componentDidMount() {
    // this.getBlockData();
  }


  // 获取输入框的值
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let userCode = values.userCode.replace(/\s+/g, "");
        this.props.dispatch({
          type: 'commonModel/updUser',
          payload: {...values, userCode},
          callback: (value) => {
            if (checkError(value)) {
              console.log('重新登录');
            }
          },
        });
      } else {
        Toast.info('请正确输入', 1);
      }
    })
  }


  getCode = () => {

    this.props.form.validateFields(['userCode'], (err, values) => {


      if (!err) {
        let userCode = values.userCode.replace(/\s+/g, "");

        if (userCode && (/^1[3456789]\d{9}$/.test(userCode))) {
          this.setState({isCountdown: 60});

          this.countFun();
          this.props.dispatch({
            type: 'commonModel/getCode',
            payload: {userCode},
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
    const codeInfo = isCountdown ? isCountdown + 's 后重新获取' :
      <span onClick={this.getCode} className={styles.reGetCode}>获取验证码</span>;


    return (
      <div className={styles.find}>

        <NavBar
          mode="light"
          icon={<Icon type="left"/>}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            <Icon key="1" type="ellipsis"/>,
          ]}
        >NavBar</NavBar>

        <List className="my-list">
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {
            }}
          >
            Title <Brief>subtitle</Brief>
          </Item>
        </List>


        <div className="schedule-list">
          <ul id="schedule-list">
            <li>
              <p>
                <span className="time">2019-12-12</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>
              <p className="tit">第六届中国物联网大会</p>
            </li>
            <li>
              <p>
                <span className="time">2019-11-17</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>
              <p>2019第五届中国硬件创新大赛全国总决赛</p>
            </li>
            <li>
              <p>
                <span className="time">2019-11-8</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>
              <p className="tit">
                <a href="" target="_blank">2019电机控制先进技术研讨会（秋季）</a>
              </p>
            </li>
            <li className="done">
              <p>
                <span className="time">2019-9-20</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>

              <p className="tit-default">
                2019年中国模拟半导体大会 第五届中国硬件创新大赛全国总决赛
              </p>
            </li>
            <li className="done">
              <p>
                <span className="time">2019-9-20</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>

              <p className="tit-default">
                2019年中国模拟半导体大会 第五届中国硬件创新大赛全国总决赛
              </p>
            </li>

            <li className="done">
              <p>
                <span className="time">2019-9-20</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>

              <p className="tit-default">
                2019年中国模拟半导体大会 第五届中国硬件创新大赛全国总决赛
              </p>
            </li>
            <li className="done">
              <p>
                <span className="time">2019-9-20</span>
                <i className="icon"></i> 中国 <span className="fblod">·</span> 深圳
              </p>

              <p className="tit-default">
                2019年中国模拟半导体大会 第五届中国硬件创新大赛全国总决赛
              </p>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default createForm()(ProductApp);
