import { useEffect } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import { sessionStorageUtils } from '@/utils/sessionStorage';
import { SESSION_STORAGE_KEYS } from '@/constants/storageKey';

export const getScrollPositionMap = () =>
  new Map<string, number>(
    JSON.parse(
      sessionStorageUtils.getItem(SESSION_STORAGE_KEYS.SCROLL_POSITION) || '[]'
    )
  );

export const useScrollPosition = (
  pageName: string,
  virtualizer?: Virtualizer<Window, Element>
) => {
  // 스크롤 인덱스 위치 설정
  useEffect(() => {
    const scrollPositionMap = getScrollPositionMap();
    const scrollIndex = scrollPositionMap.get(pageName);

    if (virtualizer && scrollIndex && scrollIndex > 0) {
      virtualizer.scrollToIndex(scrollIndex, {
        align: 'start',
      });
    } else {
      window.scrollTo(0, scrollPositionMap.get(pageName) ?? 0);
    }

    scrollPositionMap.set(pageName, 0);
    sessionStorageUtils.setItem(
      SESSION_STORAGE_KEYS.SCROLL_POSITION,
      JSON.stringify(Array.from(scrollPositionMap))
    );
  }, [pageName, virtualizer]);
};
