import { css } from '@/styled-system/css';
import { PropsWithChildren } from 'react';

export default function Body({ children }: PropsWithChildren) {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1280px',
        margin: '80px auto 0',
        padding: '60px 20px',
      })}
    >
      {children}
    </main>
  );
}
