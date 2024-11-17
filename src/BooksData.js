import { 
    DEFAULT_SHADER, 
    CIRCUIT_SHADER, 
    RAINBOW_SHADER, 
    RIPPLE_SHADER 
  } from './shaders/shaders';

import frontCover1 from './assets/books/book1/front-cover.png';
import backCover1 from './assets/books/book1/back-cover.png';
import spine1 from './assets/books/book1/spine.png';
import frontCover2 from './assets/books/book1/front-cover.png';
import backCover2 from './assets/books/book1/back-cover.png';
import spine2 from './assets/books/book1/spine.png';
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
      backgroundColor: '#f0f0f0',
      textColor: '#222222',
      bookColor: 0x4A192C,
      particleColor: 0xFF69B4,
      pngColor: 0xFF69B4,
      shaderCode: CIRCUIT_SHADER,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book2',
      frontCover: frontCover2,
      backCover: backCover2,
      spine: spine2,
      backgroundColor: '#f0f0f0',
      textColor: '#222222',
      bookColor: 0x2C4A19,
      particleColor: 0x69FFB4,
      pngColor: 0x69FFB4,
      shaderCode: DEFAULT_SHADER,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    },
    {
      id: 'book3',
      frontCover: frontCover3,
      backCover: backCover3,
      spine: spine3,
      backgroundColor: '#f0f0f0',
      textColor: '#222222',
      bookColor: 0x192C4A,
      particleColor: 0xB4FF69,
      pngColor: 0xB4FF69,
      shaderCode: RIPPLE_SHADER,
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
      textColor: '#222222',
      bookColor: 0x4A2C19,
      particleColor: 0xFF9B69,
      pngColor: 0xFF9B69,
      shaderCode: RAINBOW_SHADER,
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
      textColor: '#222222',
      bookColor: 0x2C194A,
      particleColor: 0xB469FF,
      pngColor: 0xB469FF,
      shaderCode: DEFAULT_SHADER,
      title: 'What I Talk About When I Talk About Running',
      author: 'Haruki Murakami',
      review: 'A beautiful exploration of the human spirit and the power of running.'
    }
  ];