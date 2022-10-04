import { WebGLRenderer } from 'three';

export function doesNeedResize(renderer: WebGLRenderer): boolean {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = canvas.clientWidth * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;

  return needResize;
};

export function lerp(min: number, max: number, t: number): number {
  return (min * (1 - t)) + (max * t);
};
