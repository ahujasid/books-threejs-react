// src/App.jsx
import React from 'react';
import Book from './components/Book';
import './App.css';
import frontCover from './assets/books/code/front-cover.png';
import backCover from './assets/books/code/back-cover.png';
import spineCover from './assets/books/code/spine.png';

const DEFAULT_SHADER = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = center - vUv;
      float dist = length(toCenter);
      float angle = atan(toCenter.y, toCenter.x);
      
      float swirl = angle + dist * 2.0 - time * 0.3;
      
      float n = noise(vec2(
        vUv.x * 30.0 + cos(swirl) * 3.0,
        vUv.y * 30.0 + sin(swirl) * 3.0
      ));
      
      float mask = smoothstep(0.4, 0.2, dist);
      float particles = smoothstep(0.6, 0.62, n) * mask;
      float scatter = noise(vUv * 40.0 + time * 0.1);
      float scatterParticles = smoothstep(0.7, 0.71, scatter) * 0.5 * mask;
      
      float finalAlpha = (particles + scatterParticles);
      gl_FragColor = vec4(color, finalAlpha);
    }
  `
};

// Custom shader example with rainbow effect
const RAINBOW_SHADER = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    vec3 rainbow(float t) {
      vec3 c = 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
      return c;
    }

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = center - vUv;
      float dist = length(toCenter);
      
      // Create rainbow pattern
      float t = dist * 2.0 - time * 0.2;
      vec3 rainbowColor = rainbow(t);
      
      float alpha = smoothstep(0.5, 0.2, dist);
      gl_FragColor = vec4(rainbowColor, alpha);
    }
  `
};

// Example of a ripple effect shader
const RIPPLE_SHADER = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = vUv - center;
      float dist = length(toCenter);
      
      float wave = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
      float alpha = wave * smoothstep(0.5, 0.2, dist);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
};

const booksData = [
  {
    id: 'book1',
    frontCover: frontCover,
    backCover: backCover,
    spine: spineCover,
    bookColor: 0x4A192C,
    particleColor: 0xFF69B4,
    pngColor: 0xFF69B4,
    shaderCode: DEFAULT_SHADER
  },
  {
    id: 'book2',
    frontCover: frontCover,
    backCover: backCover,
    spine: spineCover,
    bookColor: 0x2C4A19,
    particleColor: 0x69FFB4,
    pngColor: 0x69FFB4,
    shaderCode: RAINBOW_SHADER
  },
  {
    id: 'book3',
    frontCover: frontCover,
    backCover: backCover,
    spine: spineCover,
    bookColor: 0x192C4A,
    particleColor: 0xB4FF69,
    pngColor: 0xB4FF69,
    shaderCode: RIPPLE_SHADER
  }
];

function App() {
  return (
    <div className="books-grid">
      {booksData.map(book => (
        <div key={book.id} className="book-wrapper">
          <Book
            containerId={book.id}
            frontCoverUrl={book.frontCover}
            backCoverUrl={book.backCover}
            spineUrl={book.spine}
            bookColor={book.bookColor}
            particleColor={book.particleColor}
            pngColor={book.pngColor}
            shaderCode={book.shaderCode}
          />
        </div>
      ))}
    </div>
  );
}

export default App;