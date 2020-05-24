/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';

import {List, InputItem, Icon} from 'antd-mobile';
import router from 'umi/router';
import {createForm} from 'rc-form';
import {connect} from "dva";
import styles from './index.less';


const Item = List.Item;
const Brief = Item.Brief;


@connect((state) => ({
  findModel: state.findModel,
}))

class FahuoList extends React.Component {

  state = {
    disabled: false,
  }

  onClick = (id) => {
    router.push(`/find/desc/${id}`);
  }


  render() {

    const {fahuoData} = this.props.findModel;

    const {rows} = fahuoData;

    const {getFieldProps} = this.props.form;

    return (
      <div>
        <List className="my-list">
          {rows && rows.map((item) => {
            return (
              <Item
                align="top"
                key={item.id}
                arrow="horizontal"
                // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {
                  this.onClick(item.number);
                }}
                extra={<span>{item.dizhi}</span>}
              >
                <span className={styles.spanHref}>{item.number}</span>
                <Brief>{item.detail}</Brief>
              </Item>
            )
          })}
        </List>

      </div>);
  }
}

export default createForm()(FahuoList);
