import React from 'react';
import {connect} from 'dva';
import router from "umi/router";
import {Toast, NavBar, Icon, Grid} from 'antd-mobile';

import {checkError} from 'utils';
import styles from './index.less';


@connect((state) => ({
  demoModel: state.demoModel,
}))

class DemoApp extends React.Component {

  state = {};

  componentDidMount() {

  }


  // 获取数据
  getData = (payload = {}) => {
    Toast.loading('Loading...');
    this.props.dispatch({
      type: 'demoModel/getData',
      payload,
      callback: (data) => {
        Toast.hide();
      },
    });
  }


  // 查看详情
  onClickDesc = (data) => {
    let {id} = data;
    router.push('/demo/desc/'+id);
  }


  render() {

    const data = Array.from(new Array(17)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: '详情',
      id: i,
    }));


    return (
      <div className={styles.demoContent}>

        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            <Icon key="1" type="ellipsis"/>,
          ]}
        >首页</NavBar>


        <div style={{
          marginTop: 20
        }}>
          <Grid data={data} columnNum={3} onClick={this.onClickDesc}/>
        </div>

      </div>
    );
  }
}

export default DemoApp;
