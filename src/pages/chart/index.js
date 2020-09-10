import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const F2 = require('@antv/f2');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const Chart = () => {
  useEffect(() => {
    const chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });
    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.chart}>
      <canvas id="myChart" width="400" height="260"></canvas>
    </div>
  );
};

export default connect(() => ({
}))(Chart);
