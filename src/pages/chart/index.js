import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const F2 = require('@antv/f2');

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
const data2 = [{
  time: '2016-08-08 00:00:00',
  value: 10,
  data: 1,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:10:00',
  value: 22,
  data: 2,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:30:00',
  value: 16,
  data: 3,
  type: '预期收益率'
}, {
  time: '2016-08-09 00:35:00',
  value: 26,
  data: 4,
  type: '预期收益率'
}, {
  time: '2016-08-09 01:00:00',
  value: 12,
  data: 5,
  type: '预期收益率'
}, {
  time: '2016-08-09 01:20:00',
  value: 26,
  data: 6,
  type: '预期收益率'
}, {
  time: '2016-08-10 01:40:00',
  value: 18,
  data: 7,
  type: '预期收益率'
}, {
  time: '2016-08-10 02:00:00',
  value: 26,
  data: 8,
  type: '预期收益率'
}, {
  time: '2016-08-10 02:20:00',
  value: 12,
  data: 9,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:00:00',
  value: 4,
  data: 10,
  type: '实际收益率'
}, {
  time: '2016-08-08 00:10:00',
  value: 3,
  data: 11,
  type: '实际收益率'
}, {
  time: '2016-08-08 00:30:00',
  value: 6,
  data: 11,
  type: '实际收益率'
}, {
  time: '2016-08-09 00:35:00',
  value: -12,
  data: 12,
  type: '实际收益率'
}, {
  time: '2016-08-09 01:00:00',
  value: 1,
  data: 13,
  type: '实际收益率'
}, {
  time: '2016-08-09 01:20:00',
  value: 9,
  data: 14,
  type: '实际收益率'
}, {
  time: '2016-08-10 01:40:00',
  value: 13,
  data: 15,
  type: '实际收益率'
}, {
  time: '2016-08-10 02:00:00',
  value: -3,
  data: 16,
  type: '实际收益率'
}, {
  time: '2016-08-10 02:20:00',
  value: 11,
  data: 17,
  type: '实际收益率'
}];

const Chart = () => {
  useEffect(() => {
    const chart1 = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });
    chart1.source(data1);
    chart1.interval().position('genre*sold').color('genre');
    chart1.render();

    const chart2 = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart2.source(data2, {
      time: {
        type: 'timeCat',
        tickCount: 3,
        mask: 'hh:mm',
        range: [ 0, 1 ]
      },
      value: {
        tickCount: 3,
        formatter: function formatter(ivalue) {
          return ivalue + '%';
        }
      }
    });
    chart2.axis('time', {
      line: null,
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart2.axis('tem', {
      grid: function grid(text) {
        if (text === '0%') {
          return {
            lineDash: null,
            lineWidth: 1
          };
        }
      }
    });
    chart2.legend({
      position: 'bottom',
      offsetY: -5
    });
    chart2.line()
      .position('time*value')
      .color('type')
      .shape('type', function(type) {
        if (type === '预期收益率') {
          return 'line';
        }
        if (type === '实际收益率') {
          return 'dash';
        }
      });
    chart2.line()
      .position('time*data')
      .color('type')
      .shape('type', function(type) {
        if (type === '预期收益率') {
          return 'line';
        }
        if (type === '实际收益率') {
          return 'dash';
        }
      });

    chart2.render();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.chart}>
      <canvas id="myChart" width="400" height="260"></canvas>
      <canvas id="container" width="400" height="260"></canvas>
    </div>
  );
};

export default connect(() => ({
}))(Chart);
