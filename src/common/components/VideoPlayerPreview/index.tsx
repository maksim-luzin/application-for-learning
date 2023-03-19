import { FC, useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { IVideoPlayerPreviewProps } from "../../interfaces";

const VideoPlayerPreview: FC<IVideoPlayerPreviewProps> = ({ src, poster }) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 'auto'
  })

  const setNewSize = () => {
    if (!playerRef?.current?.parentElement) return;

    const wrapper = playerRef.current.parentElement;

    const width = wrapper.clientWidth

    setSize(({ height }) => ({ width, height }));
  }

  useEffect(() => {
    let hls: Hls;

    const initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls();
      if (playerRef.current === null) return;
      const player = playerRef.current;

      newHls.attachMedia(player);
      //
      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);
        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          player.play()
        });
      });
      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    }
    setNewSize();
    if (!Hls.isSupported() && playerRef.current?.canPlayType('application/vnd.apple.mpegurl' && playerRef.current?.src)) {
      playerRef.current.src = src
      return;
    }
    initPlayer();
    return () => {
      if (hls != null) {
        hls.destroy();
        window.removeEventListener('resize', setNewSize);
      }
    };
  }, [src, playerRef]);


  useEffect(() => {
    window.addEventListener('resize', setNewSize);
  }, []);

  return (
    <video
      ref={playerRef}
      src={src}
      controls={true}
      poster={poster}
      width={size.width}
      height={size.height}
      autoPlay={true}
      muted={true}
    />
  );
};

export { VideoPlayerPreview };