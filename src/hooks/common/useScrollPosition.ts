import { useLayoutEffect, useRef } from 'react';
import { sessionStorageUtils } from '@/utils/sessionStorage';

export const useScrollPosition = (pageName: string) => {
  const lastCall = useRef(Date.now());

  useLayoutEffect(() => {
    const scrollPositionMap = new Map<string, number>(
      JSON.parse(sessionStorageUtils.getItem('scroll-position') || '[]')
    );

    window.scrollTo(0, scrollPositionMap.get(pageName) || 0);

    const handleScroll = () => {
      if (Date.now() - lastCall.current < 200) {
        return;
      }

      lastCall.current = Date.now();
      scrollPositionMap.set(pageName, window.scrollY);
      sessionStorageUtils.setItem(
        'scroll-position',
        JSON.stringify(Array.from(scrollPositionMap))
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageName]);
};
