/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import {ListView, Toast,PullToRefresh} from 'antd-mobile';
import styles from './index.less';
import {connect} from "dva";


const rData = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];


@connect((state) => ({
  findModel: state.findModel,
}))


class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => true,
      }),
      refreshing: true,
      isLoading: true,
      scData: rData,
    };
  }


  getFahuo = (payload = {}) => {
    this.props.dispatch({
      type: 'findModel/getTestFahuo',
      payload,
      callback: (data) => {
        const {scData} = this.state;
        this.setState({...scData, ...data});
      },
    });
  }


  componentDidMount() {


    this.getFahuo();

    // this.rData = genData();
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(genData()),
    //   refreshing: false,
    //   isLoading: false,
    // });


  }


  onEndReached = () => {

    // 加载最新数据
    // 判断是否最后数据了

    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }


    console.log("onEndReached",)


    this.setState({isLoading: true});

    // setTimeout(() => {
    //   this.rData = [...this.rData, ...genData(++pageIndex)];
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 600);

    this.getFahuo();


  };


  // 分割线

  onRefresh=()=>{
    console.log("-----")
  }



  // 获取行数据
  getRow = (rowData, sectionID, rowID) => {

    const {scData} = this.state;
    const obj = scData[0];


    return (
      <div key={rowID}
           style={{
             padding: '0 15px',
             backgroundColor: 'white',
           }}
      >
        <div style={{
          height: '50px',
          lineHeight: '50px',
          color: '#888',
          fontSize: '18px',
          borderBottom: '1px solid #ddd'
        }}>
          {obj.title}
        </div>
        <div style={{display: 'flex', padding: '15px'}}>
          <img style={{height: '63px', width: '63px', marginRight: '15px'}} src={obj.img} alt=""/>
          <div style={{display: 'inline-block'}}>
            <div style={{
              marginBottom: '8px',
              color: '#000',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '250px'
            }}>{obj.des}-{rowData}</div>
            <div style={{fontSize: '16px'}}><span style={{fontSize: '30px', color: '#FF6E27'}}>{rowID}</span> 元/任务
            </div>
          </div>
        </div>
      </div>
    );

  }


  render() {





    const {scData} = this.state;

    const rData = scData.map((item, index) => `row - ${index}`);
    const dataSource = this.state.dataSource.cloneWithRows(rData);

    console.log("fahuoTestData", scData);



    return (<div>

      <ListView

        dataSource={dataSource}
        renderFooter={() => (
          <div style={{padding: 30, textAlign: 'center'}}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}

        renderRow={this.getRow}

        renderSeparator={(sectionID, rowID) => {
          return <div key={`${sectionID}-${rowID}`} className={styles.separator}/>
        }}
        useBodyScroll={true}

        pullToRefresh={
          <PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }

        onEndReached={this.onEndReached}
        pageSize={5}


      />
    </div>);
  }
}


export default App;
