import Galaxy from 'Galaxy';
// @ts-expect-error
import { OrbitControls } from '../helpers/OrbitControls';

// @ts-expect-error
import particleTexture from '../assets/particle-example.png';

const canvas = document.createElement('canvas');

function basicExample(): void {
  const galaxy = new Galaxy({
    canvas: document.querySelector('#c') ?? canvas,
    window,
    layers: [
      {
        color: '#FFFFFF',
        texture: particleTexture,
        count: 100000
      }
    ]
  });

  // eslint-disable-next-line no-new
  new OrbitControls(galaxy.camera, document.querySelector('#c'));
  galaxy.render();
  galaxy.play();
}

export default basicExample;
