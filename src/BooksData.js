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
    backgroundColor: '#F6F3EF',
    material: {
      metalness: 0.6,
      roughness: 0.2
    },
    textColor: '#0C7C31',
    textAccentColor: '#0C7C31',
    bookColor: 0x2C4A19,
    particleColor: 0xFF8C00,
    pngColor: 0x90EE90,
    shaderCode: SMOKE_THREADS_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'What I Talk About When I Talk About Running',
    author: 'HARUKI MURAKAMI',
    review: 'Great craft requires complete immersion and pushing your own standards daily. Murakami embodies this, starting writing at 29 and running at 33, shaping his entire life around these pursuits. Through running, he discovered how excellence comes from training your body and mind to embrace discomfort by showing up every day. His persistence resonated with my own journey of being the best design generalist I can, competing only with myself and playing the long game. There’s something meditative about viewing life in decades, and not days. Essential reading for anyone serious about their craft, runner or not.',
  },
  {
    id: 'code-book',
    frontCover: frontCover1,
    backCover: backCover1,
    spine: spine1,
    backgroundColor: '#EDE9E1',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#503BBA',
    textAccentColor: '#503BBA',
    bookColor: 0x2C194A,
    particleColor: 0xB469FF,
    pngColor: 0xB469FF,
    shaderCode: CRYSTAL_FRACTURE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.05,
    title: 'CODE: The Hidden Lives of Computer Hardware and Software',
    author: 'CHARLES PETZOLD',
    review: 'I fell in love with computers in school, tinkering away for hours. Unfortunately, by the time I left my undergraduate college, the joy had been sucked out by academic drudgery. This book helped me rediscover my childhood spark, curiosity, and love for computers. Charles Petzold starts with morse code, and layers concepts on top until he demonstrates how actual computers are built. Reading books like these reinforces how ingenious humans are, and how intricate the technology around us really is. And it’s beautiful.'
  },
  {
    id: 'creative-act-book',
    frontCover: frontCover2,
    backCover: backCover2,
    spine: spine2,
    backgroundColor: '#F5F5F5',
    material: {
      metalness: 0,
      roughness: 1
    },
    textColor: '#222',
    textAccentColor: '#222',
    bookColor: 0x916d53,
    particleColor: 0x010101,
    pngColor: 0x000000,
    shaderCode: RIPPLE_SHADER,
    useShader: false,
    blending: 'THREE.NormalBlending',
    animationSpeed: 0.02,
    title: 'The Creative Act: A Way Of Being',
    author: 'RICK RUBIN',
    review: 'Authenticity is the only truth, and reading the book helped me reaffirm this belief. This book was a welcome mirror, showing how I’d stopped being vulnerable in my work, avoided the unglamorous parts of craft, and forgotten what originally drew me to create. It reminded me that real work comes from connecting the dots from unique experiences. Trying to fit in the tech industry for so long changed my method of working. I’m learning to let my strategist, designer, and builder sides coexist naturally, without forcing them into isolated professional boxes. Most importantly, I’m rediscovering what it means to create without seeking validation. Let’s see how it goes.'
  },
  {
    id: 'algernon-book',
    frontCover: frontCover5,
    backCover: backCover5,
    spine: spine5,
    backgroundColor: '#EDE9E1',
    material: {
      metalness: 1,
      roughness: 0.2,
    },
    textColor: '#AE1634',
    textAccentColor: '#AE1634',
    bookColor: 0x500B0B,
    particleColor: 0xf55b76,
    pngColor: 0xff8aab,
    shaderCode: FLOWER_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'Flowers For Algernon',
    author: 'DANIEL KEYES',
    review: 'Great stories leave you with profound truths hidden in simple narratives. Daniel Keyes excels in it, following the story of Charlie, who goes from having a mental disability to becoming the smartest person in the world. Through his eyes, we see innocence replaced by pride, naïveté dissolve into anxiety, his intellect breed isolation. His childhood conditioning resurfacing and dictating his new life. Him having everything for a brief moment before losing it all.  It’s ultimately a story about life, where we experience both the beauty and terror of existence along with Charlie. And boy, does it hit hard.'
  },
  {
    id: 'maladies-book',
    frontCover: frontCover3,
    backCover: backCover3,
    spine: spine3,
    backgroundColor: '#F6F4EF',
    material: {
      metalness: 1,
      roughness: 0.2
    },
    textColor: '#B15F00',
    textAccentColor: '#B15F00',
    bookColor: 0x3d210f,
    particleColor: 0xFF9B69,
    pngColor: 0xFF9B69,
    shaderCode: CELLULAR_PULSE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'The Emperor of All Maladies',
    author: 'SIDDHARTHA MUKHERJEE',
    review: 'The history of cancer research hits different when you’re battling your own serious illness. In 2020, I was diagnosed with a life-changing autoimmune disorder, so every win and setback in the book felt personal. Siddhartha Mukherjee is a poetic storyteller, but what stood out to me was human inventiveness. Without really smart people dedicating their lives to curing diseases, I’d have been in a very different place. My own treatments exist because of human persistence and curiosity. More than a medical history, this book is a story of human triumph and perseverance. Read it to not only understand how far medicine has come, but to have faith that humanity will continue to push it forward.'
  }
];