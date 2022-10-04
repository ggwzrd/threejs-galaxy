declare interface Layer {
  count: number
  color: string
  texture: string
  sizeAmp?: number
  minRadius?: number
  maxRadius?: number
  speedAmp?: number
  yAmp?: number
};

declare interface GalaxyOptions {
  canvas: HTMLElement
  type?: GalaxyTypes
  window?: Window
  backgroundColor?: any

  layers: Layer[]
};

declare type GalaxyTypes = 'spiral' | 'barred-spiral';
