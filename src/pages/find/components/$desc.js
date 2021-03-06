import React from 'react';
import {connect} from 'dva';
import {Icon, List, NavBar, Toast, WingBlank} from 'antd-mobile';
import {checkError, checkEdit, getPageParam} from 'utils';
import router from "umi/router";
import styles from './index.less';


const Item = List.Item;
const Brief = Item.Brief;

@connect((state) => ({
  findModel: state.findModel,
}))

class ProductApp extends React.Component {

  componentDidMount() {

    const {params} = this.props.computedMatch;
    this.getData({number: params.id});
    Toast.loading('Loading...', 0);
  }


  getData = (payload = {}) => {
    this.props.dispatch({
      type: 'findModel/getDesc',
      payload,
      callback: (data) => {
        console.log(data);
        Toast.hide();
      },
    });
  }

  onLeftClick = () => {
    router.push(`/find`);
  }


  render() {

    const {descData} = this.props.findModel;
    const {traces} = descData;

    return (
      <div>
        <div className={styles.navBar}>
          <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={this.onLeftClick}
            // rightContent={[
            //   <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            //   <Icon key="1" type="ellipsis"/>,
            // ]}
          >详情</NavBar>
        </div>


        <WingBlank>
          <List style={{marginTop: 60}}>
            <Item
              key={descData.id}
              // arrow="horizontal"
              thumb={descData.logo}
              multipleLine
            >
              <span className={styles.spanHref}>{descData.number}</span>
              <Brief><a href="">{descData.com}</a></Brief>
            </Item>

          </List>


          <div className="schedule-list">
            <ul id="schedule-list">

              {traces && traces.map((item, index) => {
                return (
                  <li className={index !== 0 ? "done" : ""} key={index.toString()}>
                    <p>
                      <span className="time">{item.time}</span>
                      <i className="icon"></i>
                    </p>
                    <p className={index !== 0 ? "tit-default" : "tit"}>{item.detail}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </WingBlank>


      </div>
    );
  }
}

export default ProductApp;
