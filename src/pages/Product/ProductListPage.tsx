import { flex, grid } from '@/styled-system/patterns';
import ProductItem from '@components/Product/ProductItem';
import { useGetVirtualizedProductList } from '@/hooks/queries/useGetVirtualizedProductList';
import { useScrollPosition } from '@/hooks/common/useScrollPosition';
import { getResponsiveLanes } from '@/utils/responsiveLanes';

export default function ProductListPage() {
  const lanes = getResponsiveLanes();
  const { products, containerRef, virtualizer } =
    useGetVirtualizedProductList();

  useScrollPosition('ProductListPage', virtualizer);

  return (
    <div
      ref={containerRef}
      className={flex({
        flexDir: 'column',
        width: '100%',
        alignItems: 'center',
        overflow: 'auto',
      })}
    >
      <ul
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
        className={grid({
          rowGap: '20px',
          columnGap: '20px',
          columns: {
            xl: 4,
            md: 3,
            sm: 2,
            base: 1,
          },
        })}
      >
        {virtualizer.getVirtualItems()?.map((virtualItem) => (
          <li
            key={virtualItem.key}
            ref={virtualizer.measureElement}
            data-index={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(virtualItem.lane * 100) / lanes}%`,
              width: `${100 / lanes}%`,
              height: `${products[virtualItem.index]}px`,
              transform: `translateY(${virtualItem.start}px)`,
              padding: '20px',
            }}
          >
            <ProductItem
              {...products[virtualItem.index]}
              index={virtualItem.index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
