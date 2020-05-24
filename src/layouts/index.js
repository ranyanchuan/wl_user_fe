import React from 'react';

import {connect} from 'dva';
import {LocaleProvider} from 'antd-mobile';

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {}

  componentDidMount() {

  }



  render() {

    return (
      <LocaleProvider>
        {this.props.children}
      </LocaleProvider>

    );
  }
}

export default BasicLayout;


