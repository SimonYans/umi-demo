import React, { useState } from 'react';
import { TabBar } from 'antd-mobile';
import { useBoolean } from 'ahooks';
import router from 'umi/router';
import styles from './index.less';
import theme from '@/theme';

const BaseLayout = (props) => {
  const [ selectedTab, setSelectedTab ] = useState('indicator');
  const [ hidden ] = useBoolean(false);
  return (
    <div>
      <div className={styles.mainContainer}>{props.children}</div>
      <div className={styles.tabBarContainer}>
        <TabBar
          unselectedTintColor={theme['iop-info']}
          tintColor={theme['brand-primary']}
          barTintColor="white"
          noRenderContent="true"
          hidden={hidden}
        >
          <TabBar.Item
            title="测试指标"
            key="indicator"
            icon={<div className={styles.indicator} />}
            selectedIcon={<div className={styles.indicatorSelected} />}
            selected={selectedTab === 'indicator'}
            onPress={() => {
              setSelectedTab('indicator')
              router.push('/')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={styles.plan} />}
            selectedIcon={<div className={styles.planSelected} />}
            title="车辆计划"
            key="plan"
            selected={selectedTab === 'plan'}
            onPress={() => {
              setSelectedTab('plan')
              router.push('/listView')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={styles.vehicle} />}
            selectedIcon={<div className={styles.vehicleSelected} />}
            title="测试车辆"
            key="vehicle"
            selected={selectedTab === 'vehicle'}
            onPress={() => {
              setSelectedTab('vehicle')
              router.push('/list')
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    </div>
  );
}

export default BaseLayout;
