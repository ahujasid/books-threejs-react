// src/constants/shaders.js
export const FLOWER_SHADER = {
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

  export const CELLULAR_PULSE_SHADER = {
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
  
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        float a = sin(dot(i, vec2(127.1, 311.7)) + time * 0.3);
        float b = sin(dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7)) + time * 0.3);
        float c = sin(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7)) + time * 0.3);
        float d = sin(dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7)) + time * 0.3);
        
        return mix(
          mix(a, b, u.x),
          mix(c, d, u.x),
          u.y
        );
      }
  
      void main() {
        vec2 center = vec2(0.5);
        float dist = length(vUv - center);
        
        float flow = noise(vUv * 5.0);
        flow += noise(vUv * 10.0 + time * 0.2) * 0.5;
        
        float movement = sin(dist * 6.0 - time * 0.4) * 0.5 + 0.5;
        
        float pattern = flow * movement;
        
        float glow = exp(-dist * 3.5) * (0.5 + 0.5 * sin(time * 0.4));
        
        // Center fade
        float centerFade = smoothstep(0.72, 0.2, dist);
        
        // Much stronger bottom fade
        float bottomFade = smoothstep(0.15, 0.4, vUv.y);  // Starts at 60% height, fully faded by 85%
        
        // Add extra power to the bottom fade
        bottomFade = bottomFade * bottomFade;  // Square it for stronger fade
        
        float fade = centerFade * bottomFade;
        
        float alpha = (smoothstep(0.35, 0.65, pattern) + glow * 0.3) * fade;
        gl_FragColor = vec4(color, alpha);
      }
    `
};


  export const MOTION_RAIN_SHADER = {
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
  
      float rain(vec2 uv) {
        float drops = 0.0;
        for(float i = 0.0; i < 20.0; i++) {
          vec2 dropPos = vec2(
            fract(sin(i * 123.45) * 43758.5453123),
            fract(time * (0.5 + sin(i) * 0.1) + sin(i * 321.45) * 43758.5453123)
          );
          float drop = smoothstep(0.03, 0.02, length(uv - dropPos));
          drops += drop;
        }
        return drops;
      }
  
      void main() {
        // Create rhythm pattern
        float rhythm = sin(vUv.x * 20.0 + time * 3.0) * 0.5 + 0.5;
        rhythm *= sin(vUv.x * 10.0 - time * 2.0) * 0.5 + 0.5;
        
        // Add motion blur effect
        vec2 motion = vec2(time * 0.2, 0.0);
        float blur = smoothstep(0.4, 0.6, fract(vUv.x * 5.0 - time));
        
        // Add rain/sweat effect
        float raindrops = rain(vUv);
        
        // Create horizontal movement lines
        float lines = smoothstep(0.1, 0.0, abs(fract(vUv.y * 20.0 + vUv.x - time) - 0.5));
        
        // Combine everything with breath-like pulsing
        float breath = sin(time) * 0.5 + 0.5;
        float final = rhythm * 0.3 + blur * 0.2 + raindrops * 0.3 + lines * 0.2;
        final *= mix(0.8, 1.0, breath);
        
        gl_FragColor = vec4(color, final);
      }
    `
  };

  export const HOLOGRAM_GLOW_SHADER = {
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
  
      float line(vec2 uv, float speed, float height) {
        return smoothstep(
          0.0,
          0.3,
          abs(sin(uv.x * 10.0 + time * speed) * 0.5 + sin(uv.y * 10.0 + time) * 0.5)
        ) * height;
      }
  
      void main() {
        // Create scanlines
        float scan = fract(vUv.y * 50.0 + time * 0.5);
        scan = smoothstep(0.5, 0.0, scan);
  
        // Create interference patterns
        float interference = line(vUv, 2.0, 0.5) + line(vUv * 2.0, -1.5, 0.25);
        
        // Create glitch effect
        float glitch = step(0.98, sin(time * 50.0 + vUv.y * 100.0));
        vec2 glitchOffset = vec2(
          glitch * sin(time) * 0.02,
          glitch * cos(time) * 0.02
        );
        
        // Add edge glow
        vec2 center = vUv - vec2(0.5) + glitchOffset;
        float dist = length(center);
        float edge = smoothstep(0.5, 0.4, dist);
        float glow = smoothstep(0.5, 0.2, dist) * sin(time * 2.0) * 0.5 + 0.5;
  
        float final = interference * scan + edge * 0.5 + glow * 0.3;
        final *= smoothstep(1.0, 0.8, dist);
  
        gl_FragColor = vec4(color, final);
      }
    `
  };
  
  export const SMOKE_THREADS_SHADER = {
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
        vec2 moved = vUv + vec2(time * 0.1);
        
        // Create multiple layers of smoke with reduced intensity
        float n1 = noise(moved * 3.0) * 0.7; // Reduced intensity
        float n2 = noise((moved + vec2(1.0)) * 4.0) * 0.7;
        float n3 = noise((moved - vec2(time * 0.2)) * 5.0) * 0.5;
        
        // Create threading effect
        vec2 thread = vec2(
          sin(vUv.y * 10.0 + time + n1 * 5.0),
          cos(vUv.x * 10.0 - time + n2 * 5.0)
        );
        float threadPattern = smoothstep(0.5, 0.51, noise(thread)) * 0.8; // Reduced intensity
        
        // Add center dampening
        float centerDamp = smoothstep(0.0, 0.5, abs(vUv.x - 0.5)) * 0.8 + 0.2;
        
        // Combine with vertical drift
        float drift = noise(vec2(vUv.x * 2.0, vUv.y + time * 0.1));
        
        // Final composition with center dampening
        float pattern = mix(
          mix(n1, n2, 0.5) + n3 * 0.3,
          threadPattern,
          0.3
        ) * drift * centerDamp;
        
        // Reduced overall alpha
        float alpha = smoothstep(0.1, 0.6, pattern) * 0.8;
        gl_FragColor = vec4(color, alpha);
      }
    `
};
  
  export const CRYSTAL_FRACTURE_SHADER = {
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
  
      float voronoi(vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
  
        float m = 8.0;
        for(int j = -1; j <= 1; j++) {
          for(int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = vec2(
              sin(time * 0.2 + dot(n + g, vec2(13.0, 7.0))),
              cos(time * 0.2 + dot(n + g, vec2(7.0, 13.0)))
            ) * 0.5 + 0.5;
            vec2 r = g + o - f;
            float d = dot(r, r);
            m = min(m, d);
          }
        }
        return sqrt(m);
      }
  
      // Function to create text area mask
      float getTextMask(vec2 uv) {
        // Position and size of text area
        vec2 textPosition = vec2(0.5, 0.2); // Center x, lower y for bottom placement
        vec2 textSize = vec2(0.3, 0.2);     // Width and height of text area
        
        vec2 fromCenter = abs(uv - textPosition);
        vec2 maskEdge = smoothstep(textSize * 0.5 - 0.01, textSize * 0.5, fromCenter);
        
        return 1.0 - (1.0 - maskEdge.x) * (1.0 - maskEdge.y);
      }
  
      void main() {
        // Create crystalline structure
        float v1 = voronoi(vUv * 5.0);
        float v2 = voronoi(vUv * 8.0 + time * 0.2);
        
        // Add fracture lines
        vec2 grid = abs(fract(vUv * 8.0 - 0.5) - 0.5) / fwidth(vUv * 8.0);
        float lines = min(grid.x, grid.y);
        
        // Create shimmering effect
        float shimmer = sin(v1 * 10.0 + time) * 0.5 + 0.5;
        
        // Combine effects
        float pattern = mix(v1, v2, 0.5) * shimmer;
        pattern = mix(pattern, 1.0 - lines, 0.3);
        
        // Add edge highlighting
        float edge = 1.0 - smoothstep(0.2, 0.21, lines);
        pattern += edge * shimmer * 0.5;
  
        // Apply text mask
        float mask = getTextMask(vUv);
        
        // Final output with mask
        gl_FragColor = vec4(color, pattern * mask);
      }
    `
  };