import { 
  FLOWER_SHADER, 
  RIPPLE_SHADER,
  CELLULAR_PULSE_SHADER,
  SMOKE_THREADS_SHADER,
  CRYSTAL_FRACTURE_SHADER
} from './shaders/shaders';

import frontCover1 from './assets/books/book1/front-cover.png';
import backCover1 from './assets/books/book1/back-cover.png';
import spine1 from './assets/books/book1/spine.png';
import frontCover2 from './assets/books/book2/front-cover.png';
import backCover2 from './assets/books/book2/back-cover.png';
import spine2 from './assets/books/book2/spine.png';
import frontCover3 from './assets/books/book3/front-cover.png';
import backCover3 from './assets/books/book3/back-cover.png';
import spine3 from './assets/books/book3/spine.png';
import frontCover4 from './assets/books/book4/front-cover.png';
import backCover4 from './assets/books/book4/back-cover.png';
import spine4 from './assets/books/book4/spine.png';
import frontCover5 from './assets/books/book5/front-cover.png';
import backCover5 from './assets/books/book5/back-cover.png';
import spine5 from './assets/books/book5/spine.png';


export const booksData = [
  {
    id: 'running-book',
    frontCover: frontCover4,
    backCover: backCover4,
    spine: spine4,
    backgroundColor: '#1D472C',
    material: {
      metalness: 0.6,
      roughness: 0.2
    },
    textColor: '#FFE366',
    bookColor: 0x2C4A19,
    particleColor: 0xFF8C00,
    pngColor: 0x90EE90,
    shaderCode: SMOKE_THREADS_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'What I Talk About When I Talk About Running',
    author: 'Haruki Murakami',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'maladies-book',
    frontCover: frontCover3,
    backCover: backCover3,
    spine: spine3,
    backgroundColor: '#CF9A78',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#3F2311',
    bookColor: 0x241106,
    particleColor: 0xFF9B69,
    pngColor: 0xFF9B69,
    shaderCode: CELLULAR_PULSE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'The Emperor of All Maladies',
    author: 'Siddhartha Mukherjee',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'code-book',
    frontCover: frontCover1,
    backCover: backCover1,
    spine: spine1,
    backgroundColor: '#231D47',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#F5C2FB',
    bookColor: 0x2C194A,
    particleColor: 0xB469FF,
    pngColor: 0xB469FF,
    shaderCode: CRYSTAL_FRACTURE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.05,
    title: 'CODE: The Hidden Lives of Computer Hardware and Software',
    author: 'Charles Petzold',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'creative-act-book',
    frontCover: frontCover2,
    backCover: backCover2,
    spine: spine2,
    backgroundColor: '#F0F0F0',
    material: {
      metalness: 0,
      roughness: 1
    },
    textColor: '#222',
    bookColor: 0x916d53,
    particleColor: 0x010101,
    pngColor: 0x000000,
    shaderCode: RIPPLE_SHADER,
    useShader: false,
    blending: 'THREE.NormalBlending',
    animationSpeed: 0.02,
    title: 'The Creative Act: A Way Of Being',
    author: 'Rick Rubin',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },

  {
    id: 'algernon-book',
    frontCover: frontCover5,
    backCover: backCover5,
    spine: spine5,
    backgroundColor: '#411E40',
    material: {
      metalness: 1,
      roughness: 0.2,
    },
    textColor: '#FAC3FF',
    bookColor: 0x3d0f17,
    particleColor: 0xFF69B4,
    pngColor: 0xFFB6C1,
    shaderCode: FLOWER_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'Flowers For Algernon',
    author: 'Daniel Keyes',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  }
];