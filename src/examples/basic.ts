import Galaxy from 'Galaxy';
import { OrbitControls } from 'OrbitControls';

import particleTexture from '../assets/particle-example.png';

function basicExample(): void {
  const galaxy = new Galaxy({
    canvas: document.querySelector('#c'),
    window,
    layers: [
      {
        color: '#FFFFFF',
        texture: particleTexture,
        count: 100000
      }
    ]
  });

  const controls = new OrbitControls(galaxy.camera, document.querySelector('#c'));
  galaxy.render();
  galaxy.play();
};

export default basicExample;
