import React from 'react';
import {connect} from 'dva';
import router from "umi/router";
import {Toast, NavBar, Icon} from 'antd-mobile';
import DemoCom from "./DemoCom";
import {checkError} from 'utils';

import styles from './index.less';


@connect((state) => ({
  demoModel: state.demoModel,
}))

class DemoDescApp extends React.Component {

  state = {};

  componentDidMount() {

  }

  // 添加数据
  addData = (payload = {}) => {
    Toast.loading('Loading...');
    this.props.dispatch({
      type: 'demoModel/addData',
      payload,
      callback: (data) => {
        console.log(data);
        Toast.hide();
      },
    });
  }


  // 返回
  onClickBack = () => {
    router.push(`/demo`);
  }


  render() {

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left"/>}
          onLeftClick={this.onClickBack}
        >详情</NavBar>

        {/*自定义组件*/}
        <DemoCom/>
      </div>
    );
  }
}

export default DemoDescApp;
