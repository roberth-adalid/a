import { RefObject, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

const useMediaControls = (videoRef: RefObject<HTMLVideoElement>) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  useEventListener('play', handlePlay, videoRef);
  useEventListener('pause', handlePause, videoRef);

  return {
    isPlaying,
    togglePlay
  };
};

export default useMediaControls;
