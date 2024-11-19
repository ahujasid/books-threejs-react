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
    backgroundColor: '#F3F0EE',
    material: {
      metalness: 0.6,
      roughness: 0.2
    },
    textColor: '#146730',
    textAccentColor: '#146730',
    bookColor: 0x2C4A19,
    particleColor: 0xFF8C00,
    pngColor: 0x90EE90,
    shaderCode: SMOKE_THREADS_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'What I Talk About When I Talk About Running',
    author: 'HARUKI MURAKAMI',
    review: 'An incredible autobiography about what Murakami obsesses about in life: running and writing. I could draw parallels with my own life and craft — being authentic, trying and failing, and being fully immersed in whatever one chooses to do. I particularly liked his long term view on life. He only started writing at 29 and running at 33, but dived in with complete focus, knowing that the next decades would be decicated to these pursuits. My journey as a generalist has been meandering, but rewarding — it has left me prepared for a blue sky of possiblities. I wonder what I’ll focus on in the coming years. It excites me.',
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
    review: 'I fell in love with computers in school. Unfortunately, by the time I left my undergraduate college, the joy had been sucked out by academic drudgery. This book helped me rediscover my childhood spark, curiosity, and love for computers. Charles Petzold starts with morse code, and layers concepts on top until he demonstrates how actual computers are built. Reading books like these reinforces how ingenious humans are. Computers are truly beautiful.'
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
    textAccentColor: '#787029',
    bookColor: 0x916d53,
    particleColor: 0x010101,
    pngColor: 0x000000,
    shaderCode: RIPPLE_SHADER,
    useShader: false,
    blending: 'THREE.NormalBlending',
    animationSpeed: 0.02,
    title: 'The Creative Act: A Way Of Being',
    author: 'RICK RUBIN',
    review: 'Truth be told, I’d been stuck in a artistic rut for the longest time. I felt lost. This book helped me diagnose and act on it. I realised I wasn’t being authentic. I wasn’t being vulnerable. I neglected the more menial parts of my craft. Being in the industry for so long had made me change my artistic brain to an analytical one. I’m slowly rediscovering to who I really am and what I enjoy, integrating my strategist, designer and builder sides without any judgement or external validation. Let’s see what happens.'
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
    bookColor: 0x660e0e,
    particleColor: 0xf55b76,
    pngColor: 0xff8aab,
    shaderCode: FLOWER_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'Flowers For Algernon',
    author: 'DANIEL KEYES',
    review: 'It’s hard to condense this book’s meaning into a paragraph. It follows Charlie, who goes from having a mental disability to the smartest person in the world. You see how his innocence is replaced by ego. How his naivete is replaced by anxiety. How his past traumas resurface and dictate his new life. How he loses relations and becomes more isolated. The frustration because he can rationalise his emotions, but the conditioning runs to deep to do anything about it. I could draw many parallels with my own life, and it hit like a truck.'
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
    textColor: '#3B2414',
    textAccentColor: '#3B2414',
    bookColor: 0x3d210f,
    particleColor: 0xFF9B69,
    pngColor: 0xFF9B69,
    shaderCode: CELLULAR_PULSE_SHADER,
    useShader: true,
    blending: 'THREE.AdditiveBlending',
    animationSpeed: 0.02,
    title: 'The Emperor of All Maladies',
    author: 'SIDDHARTHA MUKHERJEE',
    review: 'Not many people know this, but in 2020 I was diagnosed with a life-changing autoimmune disorder, after which I’ve been engrossed by how the human body works. Emperor of All Maladies describes the history of tackling another, more challenging systemic disease—cancer. While the writing was engaging, what stood out to me was human inventiveness. Without really smart people dedicating their life to curing diseases like mine, I’d have been in a very different place. I finished the book feeling grateful to humans who truly make the world a better place.'
  }
];