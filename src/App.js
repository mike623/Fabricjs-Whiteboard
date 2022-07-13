import React, { useEffect, useRef, useState } from 'react';
import { Whiteboard } from './lib';
import styles from './app.module.scss';
import { Video } from './V';
import useVideoPlayer from './lib/hook';

const App = () => {
  const ref = useRef();
  const [r, setR] = useState();
  const [comment, setComment] = useState('');

  const [mapp, setMap] = useState(() => {
    const params = new URLSearchParams(location.search);
    const k = params.get('his');
    console.log({ k });
    return params.has('his') ? JSON.parse(k) : {};
  });
  const [c, setC] = useState(0);
  console.log('ref.current', ref.current, ref.current?.duration);
  useEffect(() => {
    console.log('set');
    const params = new URLSearchParams(location.search);
    params.set('his', JSON.stringify(mapp));
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
  }, [mapp]);
  console.log({ mapp });
  return (
    <div className={styles.app}>
      <main>
        <Whiteboard
          json={mapp[c]?.canvas}
          renderVideo={(d) => {
            console.log(d);
            if (!d) return null;
            return (
              <Video
                onLoadedMetadata={() => {
                  if (!r) setR(Date.now());
                }}
                onTimeUpdate={(e) => {
                  setC(ref.current.currentTime);
                }}
                videoRef={(d) => {
                  ref.current = d;
                }}
                width={d.width}
                height={d.height}
              />
            );
          }}
          aspectRatio={4 / 3}
          onSaveJson={(j) => {
            setMap((m) => ({ ...m, [ref.current.currentTime]: { canvas: j, comment } }));
            setTimeout(() => {
              setComment('');
            }, 0);
          }}
        />
      </main>
      <div id="video-controls" className="controls" data-state="hidden">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          cols="30"
          rows="10"
        ></textarea>
        <button
          id="playpause"
          type="button"
          data-state="play"
          onClick={() => (ref.current.paused ? ref.current.play() : ref.current.pause())}
        >
          Play/Pause
        </button>
        <button id="stop" type="button" data-state="stop">
          Stop
        </button>
        <div className="progress">
          <input
            type="range"
            min="0"
            max={ref.current?.duration}
            value={c}
            onChange={(e) => {
              ref.current.currentTime = e.target.value;
            }}
            id="myRange"
          />
        </div>
      </div>

      {Object.keys(mapp).map((k) => (
        <div key={k}>
          <a
            href={`#${k}`}
            onClick={() => {
              setC(k);
              ref.current.currentTime = k;
            }}
          >
            {k}: {mapp?.[k]?.comment}
          </a>
        </div>
      ))}
    </div>
  );
};

export default App;
