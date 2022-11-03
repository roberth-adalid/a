import { useEffect, useState } from 'react';

import useEnvironment from './useEnvironment';

function useWindowScroll() {
  const env = useEnvironment();

  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({ x: env.window.scrollX, y: env.window.scrollY });
    };

    env.window.addEventListener('scroll', handleScroll);

    return () => env.window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}

export default useWindowScroll;
