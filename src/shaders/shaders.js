// src/constants/shaders.js
export const DEFAULT_SHADER = {
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
        
        float mask = smoothstep(0.35, 0.15, dist);
        float particles = smoothstep(0.6, 0.62, n) * mask;
        float scatter = noise(vUv * 40.0 + time * 0.1);
        float scatterParticles = smoothstep(0.7, 0.71, scatter) * 0.5 * mask;
        
        float finalAlpha = (particles + scatterParticles);
        gl_FragColor = vec4(color, finalAlpha);
      }
    `
  };
  
  export const CIRCUIT_SHADER_SMALL_MASKED = {
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
  
      float hash(vec2 p) {
        float h = dot(p, vec2(127.1, 311.7));
        return fract(sin(h) * 43758.5453123);
      }
  
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
  
      float circuit(vec2 uv, float scale) {
        vec2 pos = uv * scale;
        vec2 grid = abs(fract(pos - 0.5) - 0.5) / fwidth(pos);
        float lines = min(grid.x, grid.y);
        float n = noise(pos * 0.5);
        lines *= 1.0 + n * 0.5;
        return 1.0 - smoothstep(0.0, 1.5, lines);
      }
  
      float current(vec2 uv, float time) {
        float flow = noise(vec2(uv.x * 4.0 - time * 0.5, uv.y * 4.0));
        flow *= noise(vec2(uv.x * 8.0 + time * 0.3, uv.y * 8.0));
        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        flow *= pulse * 0.5 + 0.5;
        return flow;
      }

      float rectangularMask(vec2 uv, vec2 center, vec2 size) {
        vec2 distance = abs(uv - center);
        vec2 halfSize = size * 0.5;
        vec2 edgeDistance = smoothstep(halfSize - 0.01, halfSize, distance);
        return 1.0 - max(edgeDistance.x, edgeDistance.y);
      }
  
      void main() {
        // Create rectangular mask in the middle
        float mask = rectangularMask(vUv, vec2(0.5), vec2(0.5, 0.3)); // Adjust size values as needed

        float circuitPattern = circuit(vUv, 10.0);
        circuitPattern += circuit(vUv, 20.0) * 0.5;
        float currentFlow = current(vUv, time);
        float pattern = circuitPattern * (0.5 + currentFlow);
        vec3 finalColor = mix(color * 0.5, color, currentFlow);
        float edge = 1.0 - circuit(vUv + vec2(0.001), 10.0);
        finalColor += color * edge * currentFlow * 2.0;

        // Apply the mask to create the gap
        gl_FragColor = vec4(finalColor, pattern * mask);
      }
    `
};

  export const CIRCUIT_SHADER = {
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
  
      float hash(vec2 p) {
        float h = dot(p, vec2(127.1, 311.7));
        return fract(sin(h) * 43758.5453123);
      }
  
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
  
      float circuit(vec2 uv, float scale) {
        vec2 pos = uv * scale;
        vec2 grid = abs(fract(pos - 0.5) - 0.5) / fwidth(pos);
        float lines = min(grid.x, grid.y);
        float n = noise(pos * 0.5);
        lines *= 1.0 + n * 0.5;
        return 1.0 - smoothstep(0.0, 1.5, lines);
      }
  
      float current(vec2 uv, float time) {
        float flow = noise(vec2(uv.x * 4.0 - time * 0.5, uv.y * 4.0));
        flow *= noise(vec2(uv.x * 8.0 + time * 0.3, uv.y * 8.0));
        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        flow *= pulse * 0.5 + 0.5;
        return flow;
      }

      float rectangularMask(vec2 uv) {
        // Create a single rectangular gap in the middle
        vec2 center = vec2(0.5);
        vec2 size = vec2(0.5, 0.3); //to change size of gap
        vec2 halfSize = size * 0.5;
        
        // Check if we're inside the rectangle
        vec2 distance = abs(uv - center);
        return float(distance.x > halfSize.x || distance.y > halfSize.y);
      }
  
      void main() {
        float mask = rectangularMask(vUv);

        float circuitPattern = circuit(vUv, 10.0);
        circuitPattern += circuit(vUv, 20.0) * 0.5;
        float currentFlow = current(vUv, time);
        float pattern = circuitPattern * (0.5 + currentFlow);
        vec3 finalColor = mix(color * 0.5, color, currentFlow);
        float edge = 1.0 - circuit(vUv + vec2(0.001), 10.0);
        finalColor += color * edge * currentFlow * 2.0;

        // Apply the mask
        gl_FragColor = vec4(finalColor, pattern * mask);
      }
    `
};
  
  export const RIPPLE_SHADER_LIGHT = {
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
  
  export const RIPPLE_SHADER = {
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
        
        // Create more spaced out, sharper rings
        float wave = sin(dist * 8.0 - time * 1.5); // Reduced frequency for more space between rings
        
        // Make the transition more sharp/solid
        wave = smoothstep(0.0, 0.1, wave) * smoothstep(1.0, 0.9, wave);
        
        // Sharper falloff from center
        float falloff = smoothstep(0.45, 0.35, dist);
        
        // Combine for final alpha
        float alpha = wave * falloff * 0.5; // Reduced overall opacity
        
        gl_FragColor = vec4(color, alpha);
      }
    `
  };