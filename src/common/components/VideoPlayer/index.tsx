import { FC, useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { coursesMetadataActions, commonActions } from '../../reducer';
import { storage } from "../../data";
import { IVideoPlayerProps } from "../../interfaces";

interface INewHls extends Hls {
  currentTimePosition: () => number
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ src, poster, position, course, lesson }) => {
  const coursesMetadata = useTypedSelector(({ coursesMetadata: metadata }) => metadata);
  const dispatch = useTypedDispatch();
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

  const createPIP = async () => {
    try {
      if (!playerRef.current) return;
      const video = playerRef.current

      if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }

    } catch {
      dispatch(commonActions.update({ isLoading: false, error: 'Picture in picture doesn\'t work!' }))
    }
  };

  const changeSpeed = ({ code }: KeyboardEvent) => {
    try {
      if (!playerRef.current) return;
      const video = playerRef.current
      switch (code) {
        case ('KeyX'):
          video.playbackRate = video.playbackRate + 0.2
          break;

        case ('KeyZ'):
          video.playbackRate = video.playbackRate - 0.2
          break;
      }
    } catch {
      dispatch(commonActions.update({ isLoading: false, error: 'Picture in picture doesn\'t work!' }));
    }
  }

  useEffect(() => {
    let hls: INewHls;

    const initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      const oldHls = new Hls();
      oldHls.constructor.prototype.currentTimePosition = function () {
        return this.streamController.lastCurrentTime
      }

      const newHls = new Hls() as INewHls;
      newHls.config.startPosition = position;

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
        dispatch(coursesMetadataActions.updateLessonPosition({
          course,
          lesson,
          position: hls.currentTimePosition()
        }));
        const coursesForStorage = {
          ...coursesMetadata,
          currentCourse: course,
          courses: {
            ...coursesMetadata.courses,
            [course]: {
              ...coursesMetadata.courses[course],
              currentLesson: lesson,
              lessons: {
                ...coursesMetadata.courses[course].lessons,
                [lesson]: hls.currentTimePosition()
              }
            }
          }
        };
        storage.update(coursesForStorage);

        hls.destroy();
        window.removeEventListener('resize', setNewSize);
        window.removeEventListener('keydown', changeSpeed);
      }
    };
  }, [src, playerRef]);


  useEffect(() => {
    window.addEventListener('resize', setNewSize);
    window.addEventListener('keydown', changeSpeed);
  }, [])

  return (
    <video
      ref={playerRef}
      src={src}
      controls={true}
      poster={poster}
      width={size.width}
      height={size.height}
      autoPlay={true}
      onClick={createPIP}
    />
  );
};

export { VideoPlayer };