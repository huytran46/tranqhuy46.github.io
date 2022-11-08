import type {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SourceHTMLAttributes,
} from 'react';

type HTMLSourceTypeAttribute = Pick<
  DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>,
  'type'
>['type'];

type HTMLSourceSetAttribute = Pick<
  DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>,
  'srcSet'
>['srcSet'];

type HTMLImgSrcAttribute = Pick<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'src'
>['src'];

export interface ImageWithFallbackProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  type?: HTMLSourceTypeAttribute;
  src?: HTMLSourceSetAttribute;
  fallback?: HTMLImgSrcAttribute;
}
