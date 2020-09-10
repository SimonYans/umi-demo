import React, { useEffect, useState } from 'react';
import { useRequest } from "ahooks";
import { connect } from 'dva';
import { getMaintenanceList, getAgencyList } from '@/services/list';
import { Card, WhiteSpace } from 'antd-mobile';
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
const List = () => {
  const { data: agencyData, loading: agencyLoading } = useRequest(getList_Agency);
  const [ pageSize ] = useState(10);
  const { refresh, pagination, tableProps } = useRequest(
    ({ current, pageSize, sorter: s, filters: f }) => {
      const p = { current, pageSize };
      if (s && s.field && s.order) {
        p[s.field] = s.order;
      }
      if (f) {
        Object.entries(f).forEach(([filed, value]) => {
          p[filed] = value;
        });
      }
      return getList_Maintenance(p);
    },
    {
      paginated: true,
      defaultPageSize: pageSize,
    },
  );
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
  useEffect(() => {
  }, []);

  return (
    <div>
      {agencyLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          {agencyData && agencyData.data.map((item) => (
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
      <WhiteSpace size="lg" />
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

export default connect(() => ({
}))(List);
