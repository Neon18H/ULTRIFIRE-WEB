declare module 'cobe' {
  export type Location = [number, number];

  export type Marker = {
    location: Location;
    size: number;
    color?: [number, number, number];
    id?: string;
  };

  export type Arc = {
    from: Location;
    to: Location;
    color?: [number, number, number];
    id?: string;
  };

  export type COBEOptions = {
    devicePixelRatio: number;
    width: number;
    height: number;
    phi: number;
    theta: number;
    dark: number;
    diffuse: number;
    mapSamples: number;
    mapBrightness: number;
    baseColor: [number, number, number];
    markerColor: [number, number, number];
    glowColor: [number, number, number];
    mapBaseBrightness?: number;
    markerElevation?: number;
    markers?: Marker[];
    arcs?: Arc[];
    arcColor?: [number, number, number];
    arcWidth?: number;
    arcHeight?: number;
    scale?: number;
    opacity?: number;
    offset?: [number, number];
    context?: WebGLContextAttributes;
  };

  export type Globe = {
    update: (state: Partial<COBEOptions>) => void;
    destroy: () => void;
  };

  export default function createGlobe(canvas: HTMLCanvasElement, options: COBEOptions): Globe;
}
