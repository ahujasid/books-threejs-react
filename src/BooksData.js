import { 
    DEFAULT_SHADER, 
    CIRCUIT_SHADER, 
    RIPPLE_SHADER_LIGHT, 
    RIPPLE_SHADER,
    CIRCUIT_SHADER_SMALL_MASKED
  } from './shaders/shaders';

import frontCover1 from './assets/books/book1/front-cover.png';
import backCover1 from './assets/books/book1/back-cover.png';
import spine1 from './assets/books/book1/spine.png';
import frontCover2 from './assets/books/book2/front-cover.png';
import backCover2 from './assets/books/book2/back-cover.png';
import spine2 from './assets/books/book2/spine.png';
import frontCover3 from './assets/books/book1/front-cover.png';
import backCover3 from './assets/books/book1/back-cover.png';
import spine3 from './assets/books/book1/spine.png';
import frontCover4 from './assets/books/book1/front-cover.png';
import backCover4 from './assets/books/book1/back-cover.png';
import spine4 from './assets/books/book1/spine.png';
import frontCover5 from './assets/books/book1/front-cover.png';
import backCover5 from './assets/books/book1/back-cover.png';
import spine5 from './assets/books/book1/spine.png';


export const booksData = [
    {
      id: 'book1',
      frontCover: frontCover1,
      backCover: backCover1,
      spine: spine1,
      backgroundColor: '#F5DFFA',
      material: {
        metalness: 1,
        roughness: 0.2,
      },
      textColor: '#3B2852',
      bookColor: 0x4A192C,
      particleColor: 0xFF69B4,
      pngColor: 0xFF69B4,
      shaderCode: CIRCUIT_SHADER_SMALL_MASKED,
      useShader: true,
      blending: 'THREE.AdditiveBlending',
      animationSpeed: 0.06,
      title: 'CODE: The Hidden Lives of Computer Hardware and Software',
      author: 'Charles Petzold',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book2',
      frontCover: frontCover2,
      backCover: backCover2,
      spine: spine2,
      backgroundColor: '#f0f0f0',
      material: {
        metalness: 0,
        roughness: 1
      },
      textColor: '#222222',
      bookColor: 0x916d53,
      particleColor: 0x010101,
      pngColor: 0x000000,
      shaderCode: RIPPLE_SHADER,
      useShader: false,
      blending: 'THREE.NormalBlending',
      animationSpeed: 0.008,
      title: 'The Creative Act: A Way Of Being',
      author: 'Rick Rubin',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book3',
      frontCover: frontCover3,
      backCover: backCover3,
      spine: spine3,
      backgroundColor: '#f0f0f0',
      material: {
        metalness: 1,
        roughness: 0.2
      },
      textColor: '#222222',
      bookColor: 0x192C4A,
      particleColor: 0xB4FF69,
      pngColor: 0xB4FF69,
      shaderCode: RIPPLE_SHADER,
      useShader: true,
      blending: 'THREE.AdditiveBlending',
      animationSpeed: 0.02,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book4',
      frontCover: frontCover4,
      backCover: backCover4,
      spine: spine4,
      backgroundColor: '#f0f0f0',
      material: {
        metalness: 1,
        roughness: 0.2
      },
      textColor: '#222222',
      bookColor: 0x4A2C19,
      particleColor: 0xFF9B69,
      pngColor: 0xFF9B69,
      shaderCode: RIPPLE_SHADER_LIGHT,
      useShader: true,
      blending: 'THREE.AdditiveBlending',
      animationSpeed: 0.02,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book5',
      frontCover: frontCover5,
      backCover: backCover5,
      spine: spine5,
      backgroundColor: '#f0f0f0',
      material: {
        metalness: 1,
        roughness: 0.2
      },
      textColor: '#222222',
      bookColor: 0x2C194A,
      particleColor: 0xB469FF,
      pngColor: 0xB469FF,
      shaderCode: DEFAULT_SHADER,
      useShader: true,
      blending: 'THREE.AdditiveBlending',
      animationSpeed: 0.02,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    }
  ];