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
    backgroundColor: '#F4F8EA',
    material: {
      metalness: 0.6,
      roughness: 0.2
    },
    textColor: '#0D341A',
    bookColor: 0x2C4A19,
    particleColor: 0xFF8C00,
    pngColor: 0x90EE90,
    shaderCode: SMOKE_THREADS_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'What I Talk About When I Talk About Running',
    author: 'HARUKI MURAKAMI',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'code-book',
    frontCover: frontCover1,
    backCover: backCover1,
    spine: spine1,
    backgroundColor: '#E3E3EE',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#3E1456',
    bookColor: 0x2C194A,
    particleColor: 0xB469FF,
    pngColor: 0xB469FF,
    shaderCode: CRYSTAL_FRACTURE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.05,
    title: 'CODE: The Hidden Lives of Computer Hardware and Software',
    author: 'CHARLES PETZOLD',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'creative-act-book',
    frontCover: frontCover2,
    backCover: backCover2,
    spine: spine2,
    backgroundColor: '#F5F3F0',
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
    id: 'maladies-book',
    frontCover: frontCover3,
    backCover: backCover3,
    spine: spine3,
    backgroundColor: '#EDEBE6',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#3B2414',
    bookColor: 0x3d210f,
    particleColor: 0xFF9B69,
    pngColor: 0xFF9B69,
    shaderCode: CELLULAR_PULSE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'The Emperor of All Maladies',
    author: 'SIDDHARTHA MUKHERJEE',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  },
  {
    id: 'algernon-book',
    frontCover: frontCover5,
    backCover: backCover5,
    spine: spine5,
    backgroundColor: '#DCDCEA',
    material: {
      metalness: 1,
      roughness: 0.2,
    },
    textColor: '#26182D',
    bookColor: 0x4A192C,
    particleColor: 0xFF69B4,
    pngColor: 0xff8ac4,
    shaderCode: FLOWER_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'Flowers For Algernon',
    author: 'DANIEL KEYES',
    review: 'A beautiful exploration of the human spirit and the power of running.'
  }
];