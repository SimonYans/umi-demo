import { useEffect, useState } from 'react';
import { useBoolean, useRequest } from "ahooks";
import { connect } from 'dva';
import { getMaintenanceList, getAgencyList } from '@/services/list';
import { Card } from 'antd-mobile';
import { Table, Button } from 'antd';

async function getList_Agency() {
  return new Promise(resolve => {
    resolve(getAgencyList())
  });
}
async function getList_Maintenance(params) {
  return new Promise(resolve => {
    resolve(getMaintenanceList({page: params.current, size: params.pageSize }))
  });
}
const List = (props) => {
  const { dispatch } = props;
  const { data: agencyData, loading: agencyLoading } = useRequest(getList_Agency);
  const [ isLoading, { toggle, setTrue, setFalse }] = useBoolean(true);
  const [ pageNo, setPageNo ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const { data, loading, params, refresh, pagination, tableProps } = useRequest(
    ({ current, pageSize, sorter: s, filters: f }) => {
      const p = { current, pageSize };
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      if (f) {
        Object.entries(f).forEach(([filed, value]) => {
          p[filed] = value;
        });
      }
      console.log('p', p);
      return getList_Maintenance(p);
    },
    {
      paginated: true,
      defaultPageSize: pageSize,
    },
  );
  const { sorter = {}, filters = {} } = params[0] || {};
  const columns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo'
    },
    {
      title: '车牌号',
      dataIndex: 'carnum'
    },
  ];
  const changePageSize = (current, pageSize) => {
    setPageNo(1);
    setPageSize(pageSize);
    console.log(pageSize, current);
  };
  const onPageChange = (current) => {
    setPageNo(current);
    console.log(pageNo)
  };
  //对pagination参数进行设置
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: pageSize,
    pageSizeOptions:['10','20','30'],
    showTotal: () => `共${data?data.totalCount:0}条`,
    current: pageNo,
    total: data?data.totalCount:0,
    onShowSizeChange: changePageSize,
    onChange: onPageChange,
  };
  useEffect(() => {
  }, []);

  return (
    <div>
      {agencyLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          {agencyData?.data?.map((item) => (
            <Card key={item.id}>
              <Card.Header
                title={item.agencyName}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>{item.id} - {item.agencyName}</div>
              </Card.Body>
              <Card.Footer />
            </Card>
          ))}
        </div>
      )}
      <Button onClick={refresh} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Table
        {...tableProps}
        columns={columns}
        pagination={{ ...pagination, showSizeChanger: true, showQuickJumper: true, }}
        rowKey="taskNo"/>
    </div>
  );
}

export default connect(state => ({
}))(List);
