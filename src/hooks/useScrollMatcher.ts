import { useEffect, useRef, useState } from 'react';

import useWindowScroll from './useWindowScroll';

function useScrollMatcher() {
  const ref = useRef<HTMLElement>(null);

  const [isMatch, setMatch] = useState(false);
  const [offsetTop, setOffsetTop] = useState(0);

  const { y } = useWindowScroll();

  useEffect(() => {
    if (ref.current) {
      setOffsetTop(ref.current.offsetTop);
    }
  }, []);

  useEffect(() => {
    offsetTop && setMatch(y >= offsetTop);
  }, [y]);

  return { ref, isMatch };
}

export default useScrollMatcher;
