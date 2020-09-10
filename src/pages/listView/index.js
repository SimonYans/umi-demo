import React, { useEffect, useState } from 'react';
import { useBoolean } from 'ahooks';
import { connect } from 'dva';
import { Card, WhiteSpace, ListView, PullToRefresh, Icon } from 'antd-mobile';
import styles from './index.less';
import { getMaintenanceList } from '@/services/list';

async function getList_Maintenance(params) {
  return await getMaintenanceList({page: params.pageNo, size: params.pageSize })
}
const ListViewDemo = () => {
  const [ dataSource ] = useState(new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  }));
  const [ list, setList ] = useState({});
  const [ pageSize ] = useState(10);
  const [ upLoading, { setTrue: setUpLoadingTrue, setFalse: setUpLoadingFalse }  ] = useBoolean(false);
  const [ pullLoading, { setTrue: setPullLoadingTrue, setFalse: setPullLoadingFalse }  ] = useBoolean(false);

  const getData = (params) => {
    return getList_Maintenance({pageNo: params.pageNo, pageSize: params.pageSize}).then((response)=>{
      if(response && response.list.length>0) {
        let totalPage = Math.ceil(response.total / pageSize);
        return {
          status: true,
          ds: { rows: [...response.list], totalPage:totalPage, pageNum: params.pageNo }
        }
      } else {
        return {
          status: false,
          ds: { rows: [], totalPage:0, pageNum: 0 }
        }
      }
    })
  }
  //上拉加载
  const onEndReached = async (page, lastPage) => {
    console.log(page, lastPage)
    if (Number(page) < Number(lastPage)) {
      setUpLoadingTrue()
      let pageNum = ++ page
      getData({pageNo: pageNum, pageSize: pageSize}).then((response)=>{
        console.log(response.ds.rows)
        console.log('list.rows', list.rows)
        let allList = [...list.rows, ...response.ds.rows]
        console.log(allList)
        let dateSource = {
          rows: [...allList],
          totalPage: list.totalPage,
          pageNum: pageNum
        }
        setList({...dateSource})
        setUpLoadingFalse()
      })
    }
  }
  //下拉刷新
  const onRefresh = () => {
    setPullLoadingTrue()
    getData({pageNo: 1, pageSize: pageSize}).then((response)=>{
      setList(response.ds)
      setPullLoadingFalse()
    })
  }
  //获取item进行展示
  const renderRow = (item, i) => {
    return (
      <div>
        <Card>
          <Card.Header
            title={item.taskNo}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>{item.carnum}</span>}
          />
          <Card.Body>
            <div>{i}---{item.vehicleName}</div>
          </Card.Body>
          <Card.Footer content={item.lesseeName} extra={<div>{item.lesseeCode}</div>} />
        </Card>
        <WhiteSpace size="lg" />
      </div>
    )
  }
  // 显示底部
  const renderFooter = () => {
    if((list.pageNum < list.totalPage) && upLoading) {
      return (<div style={{textAlign: "center"}}><Icon type="loading" /></div>)
    } else if( (list.pageNum === list.totalPage) && !upLoading ) {
      return (<div style={{textAlign: "center"}}>加载完成</div>)
    }
  }
  useEffect(() => {
    getData({pageNo: 1, pageSize: pageSize}).then((response)=>{
      setList(response.ds)
    })
  }, []);

  return (
    <div className={styles.listView}>
      {
        list && list.rows && list.rows.length ?
          <ListView
            dataSource={dataSource.cloneWithRows(list.rows)}
            renderRow={(rowData, id1, i) => renderRow(rowData, i)}
            initialListSize={pageSize}
            pageSize={pageSize}
            // (list.pageNum < list.totalPage) && upLoading ?<Icon type="loading" />: null
            renderFooter={() => renderFooter()}
            onEndReached={() => onEndReached(list.pageNum, list.totalPage)}
            useBodyScroll={true}
            style={{ width: '100vw' }}
            pullToRefresh={<PullToRefresh
              refreshing={pullLoading}
              onRefresh={onRefresh}
            />}
          />
          :
          list && list.rows && !list.rows.length ?
            <div className={styles.listViewNull}>
              <p>暂无数据</p>
            </div> : null
      }
    </div>
  );
}

export default connect(() => ({
}))(ListViewDemo);
