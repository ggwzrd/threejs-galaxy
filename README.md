![Milkyway Galaxy](./assets/milkyway.webp?raw=true "Screenshot of the galaxy generated using threejs-galaxy")

# threejs-galaxy

![GitHub last commit](https://img.shields.io/github/last-commit/ggwzrd/threejs-galaxy)
![npm bundle size](https://img.shields.io/bundlephobia/min/threejs-galaxy)
![npm](https://img.shields.io/npm/v/threejs-galaxy)
![NPM](https://img.shields.io/npm/l/threejs-galaxy)

This project is heavily inspired by [Yuri Artiukh's video](https://www.youtube.com/watch?v=o_bEveIFfoM) [aka [@akella](https://github.com/akella)] in which he explained the math and architecture behing the website [viverse.com](https://www.viverse.com/) [*outdated*].

I decided to make a module out of this since everyone should be able to generate their own galaxies and the creative possibilities are infinite. 👨‍🚀

> I do not provide the textures of the particles and stars to ensure that all galaxies are unique. You can find a basic example in [/assets](./assets/particle-example.png)

- [threejs-galaxy](#threejs-galaxy)
  - [Install](#install)
    - [npm](#npm)
    - [yarn](#yarn)
  - [Getting started](#getting-started)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [License](#license)

## Install

### npm

```bash
  npm install threejs-galaxy
```

### yarn

```bash
  yarn add threejs-galaxy
```

## Getting started

All you need to generate a galaxy is the snippet below.

```js
import Galaxy from 'threejs-galaxy'

import particleTexture from './assets/particle-example.png'

const galaxy = new Galaxy({
  canvas: document.querySelector('#c'),
  window: window,
  layers: [
    {
      color: '#FFFFFF',
      texture: particleTexture,
      count: 10000,
    },
  ]
})

galaxy.render()
```

In order to start the animation you will need to add the following code.

```js
galaxy.play()
```

> Full example can be found in [examples/basic.ts](src/examples/basic.ts)

## Contributing

Consult [CONTRIBUTING.md](./CONTRIBUTING.md) to start contributing to threejs-galaxy.

## Credits

[Yuri Artiukh](https://www.youtube.com/watch?v=o_bEveIFfoM) [aka [@akella](https://github.com/akella)]

## License

[The MIT License (MIT)](./LICENCE.txt)
