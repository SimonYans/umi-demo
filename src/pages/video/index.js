import React, { useEffect, useRef } from 'react';
import { connect } from 'dva';
import flvjs from 'flv.js'
import styles from './index.less';

const Video = () => {
  const videoDom = useRef();
  console.log(videoDom)
  const initPlayer = (url) => {
    if (flvjs.isSupported()) {
      let player = flvjs.createPlayer({
        type: 'flv',
        url: url
      }, {
        autoCleanupSourceBuffer: true
      })
      player.on(flvjs.Events.ERROR, (error) => {
        console.log('flv js error', error)
      })
      player.crossOrigin = 'anonymous'
      player.attachMediaElement(videoDom.current)
      player.load()
    }
  };
  useEffect(() => {
    initPlayer('https://media2.huoyunren.com/live?app=g7-flv-video&stream=106064895200206-2')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.videoContainer}>
      <video ref={videoDom} id="videoElement" crossOrigin="anonymous" muted={true} autoPlay={true}></video>
    </div>
  );
};

export default connect(() => ({
}))(Video);
