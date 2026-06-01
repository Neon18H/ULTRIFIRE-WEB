declare module '@splinetool/react-spline' {
  import type { ComponentType } from 'react';

  export type SplineProps = {
    scene: string;
    className?: string;
  };

  const Spline: ComponentType<SplineProps>;

  export default Spline;
}
