import React from 'react';
import { Result} from 'antd-mobile';
import styles from './index.less';

class DemoCom extends React.Component {

  state = {};

  componentDidMount() {

  }

  render() {

    const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt=""/>;

    return (
      <Result
        style={{
          marginTop: 50
        }}
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
        title="等待处理"
        message="已提交申请，等待处理"
      />
    );
  }
}

export default DemoCom;
