import { PropsWithChildren } from 'react';
import { css, cx } from '@/styled-system/css';
import { SystemStyleObject } from '@/styled-system/types';

type TitleProps = PropsWithChildren<{
  variant?: 'title' | 'subtitle';
  as?: 'h2' | 'h3';
  css?: SystemStyleObject;
}>;

export default function Title({
  as: Tag = 'h2',
  variant = 'title',
  children,
  css: cssProps = {},
}: TitleProps) {
  const tagVariant = tagVariantStyle[variant];
  const tagClassName = cx(tagVariant, css(cssProps));

  return <Tag className={tagClassName}>{children}</Tag>;
}

const tagVariantStyle = {
  title: css({
    fontSize: '24px',
    fontWeight: 'medium',
  }),
  subtitle: css({
    fontSize: '20px',
    fontWeight: 'normal',
  }),
};
