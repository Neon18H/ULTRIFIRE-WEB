declare module 'three' {
  export class Camera {
    position: { z: number };
  }

  export class Scene {
    add(object: unknown): void;
  }

  export class PlaneGeometry {
    constructor(width: number, height: number);
    dispose(): void;
  }

  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
  }

  export class ShaderMaterial {
    constructor(parameters: { uniforms: Record<string, unknown>; vertexShader: string; fragmentShader: string });
    dispose(): void;
  }

  export class Mesh {
    constructor(geometry: PlaneGeometry, material: ShaderMaterial);
  }

  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: { antialias?: boolean; powerPreference?: WebGLPowerPreference });
    setPixelRatio(value: number): void;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
    dispose(): void;
  }
}
