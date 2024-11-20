// src/components/Book.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Book = ({ 
  containerId, 
  frontCoverUrl, 
  backCoverUrl, 
  spineUrl, 
  bookColor,
  particleColor,
  pngColor,
  shaderCode,
  animationSpeed,
  blendMode,
  useShader,
  bookCoverMaterial,
  onLoaded
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;


    //Global variables
    let bookContainerRef = null;
    let animationTime = 0;
    let isOrbiting = false;
    let animationTimeoutId = null;
    let hoverEffect = false;
    let isDragging = false;
    let isInertiaActive = false;
    let currentRotation = Math.PI * 0.1;
    let velocity = 0;
    let lastTime = 0;

    function animateBook(){
      if (!bookContainerRef) return;
      else{
        if(!isMobile){
          animationTime += 0.07;
          bookContainerRef.rotation.y = Math.PI * 0.05 + Math.sin(animationTime * 0.5) * 0.05;
          bookContainerRef.position.y = Math.sin(animationTime * 0.7) * 0.07;
        }
        else{
          animationTime += 0.08;
          // Instead of setting absolute rotation, add to current rotation
          bookContainerRef.rotation.y = currentRotation + Math.sin(animationTime * 0.5) * 0.15;
          bookContainerRef.position.y = Math.sin(animationTime * 0.8) * 0.15;
        }
      }
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);
    

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp',
      powerPreference: 'high-performance',
      stencil: false
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    containerRef.current.appendChild(renderer.domElement);

   // Lighting setup - exact same as original
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
   scene.add(ambientLight);
    // scene.background = new THREE.Color(0xF4BAFB);
   const mainLight = new THREE.PointLight(0xffd5b8, 0.3);
   mainLight.position.set(3, 2, 4);
   camera.add(mainLight);

   const fillLight = new THREE.PointLight(0xbce7fd, 0.5);
   fillLight.position.set(-2, 0, 2);
   camera.add(fillLight);

   const spotLight = new THREE.SpotLight(0xffffff, 1);
   spotLight.position.set(0, 15, 0);
   spotLight.angle = 0.3;
   spotLight.penumbra = 1;
   spotLight.castShadow = true;
   spotLight.shadow.bias = -0.0001;
   camera.add(spotLight);

   const rimLight = new THREE.PointLight(0xffffff, 0.6);
   rimLight.position.set(0, 3, -3);
   camera.add(rimLight);

   scene.add(camera);
   
//    const mainLightHelper = new THREE.PointLightHelper(mainLight, 0.5);
// const fillLightHelper = new THREE.PointLightHelper(fillLight, 0.5);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// const rimLightHelper = new THREE.PointLightHelper(rimLight, 0.5);

// scene.add(mainLightHelper, fillLightHelper, spotLightHelper, rimLightHelper);


    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zoom
    controls.enablePan = false;  // Disable camera panning
    controls.enableDamping = true; // Keep damping for smooth movement
    controls.dampingFactor = 0.05;


    // Add event listeners right after controls setup
  controls.addEventListener('start', () => {
    isOrbiting = true;
    if (bookContainerRef) {
      bookContainerRef.position.y = 0;
      bookContainerRef.rotation.y = Math.PI * 0.05;
    }
  });

  controls.addEventListener('end', () => {
    if (animationTimeoutId) {
      clearTimeout(animationTimeoutId);
    }
    animationTimeoutId = setTimeout(() => {
      isOrbiting = false;
      animationTime = 0;
    }, 1000);
  });
    

    // Check if device is mobile
    // const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    // const isMobile = window.innerWidth < 768; 
    const isMobileCheck = () => {
      const hasTouchCapability = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
      
      return hasTouchCapability && window.innerWidth < 1200;
    };
    
    // If you need a constant instead of a function:
    const isMobile = isMobileCheck();

    window.addEventListener('resize', () => {
      Object.defineProperty(window, 'IS_MOBILE', {
        value: isMobileCheck(),
        writable: true
      });
    });

    if (isMobile) {
      controls.enabled = false;
    } else {
      let prevX = 0;
      let prevY = 0;

      if(hoverEffect){
        renderer.domElement.addEventListener('mousemove', (e) => {
          if (controls.enabled) {  // Removed ! to work when controls enabled
            const deltaX = (e.clientX - prevX) * 0.002;  // Increased from 0.001
            const deltaY = (e.clientY - prevY) * 0.002;  // Increased from 0.001
            
            // Inverted movement by changing + to - and - to +
            camera.position.x -= deltaX;
            camera.position.y += deltaY;
            camera.lookAt(controls.target);
          }
          prevX = e.clientX;
          prevY = e.clientY;
        });
      }
     }
     
    

    controls.target.set(0, 0, 0);
    controls.update();

    // Book dimensions
    const width = 3;
    const height = 4;
    const depth = 0.5;
    const cornerRadius = 0.15;

    // Helper functions
    function createRoundedRectShape(width, height, radius) {
      const shape = new THREE.Shape();
      
      shape.moveTo(-width/2, -height/2);
      shape.lineTo(width/2 - radius, -height/2);
      shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
      shape.lineTo(width/2, height/2 - radius);
      shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
      shape.lineTo(-width/2, height/2);
      shape.lineTo(-width/2, -height/2);
      
      return shape;
    }

    function createRoundedBoxGeometry(width, height, depth, radius) {
      const shape = createRoundedRectShape(width, height, radius);
      const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: false
      };
      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    function createPageTexture(size) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#f2f0e6';
      ctx.fillRect(0, 0, size, size);
      
      for (let i = 0; i < size; i += 2) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.8})`;
        ctx.fillRect(i, 0, 1, size);
        
        ctx.fillStyle = `rgba(255,240,202,${Math.random() * 0.03})`;
        ctx.fillRect(i + 1, 0, 1, size);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 1);
      texture.rotation = Math.PI / 2;
      return texture;
    }

    function createClothTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
  
      ctx.fillStyle = '#0F2345';
      ctx.fillRect(0, 0, 256, 256);
  
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
  
      for (let i = -256; i < 256; i += 4) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 256, 256);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(i, 256);
        ctx.lineTo(i + 256, 0);
        ctx.stroke();
      }
  
      const imageData = ctx.getImageData(0, 0, 256, 256);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5;
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }
      ctx.putImageData(imageData, 0, 0);
  
      return canvas;
    }

  


    function createFullCoverGeometry(width, height, radius) {
        const shape = createRoundedRectShape(width, height, radius);
        const extrudeSettings = {
          steps: 1,
          depth: 0.001,
          bevelEnabled: false
        };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        
        const uvAttribute = geometry.attributes.uv;
        const positions = geometry.attributes.position;
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        for (let i = 0; i < positions.count; i++) {
          minX = Math.min(minX, positions.getX(i));
          maxX = Math.max(maxX, positions.getX(i));
          minY = Math.min(minY, positions.getY(i));
          maxY = Math.max(maxY, positions.getY(i));
        }
        
        for (let i = 0; i < uvAttribute.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          
          uvAttribute.setXY(
            i,
            (x - minX) / (maxX - minX),
            (y - minY) / (maxY - minY)
          );
        }
        
        return geometry;
      }
  

      const getBlendingMode = (blendModeString) => {
        return blendModeString == 'THREE.AdditiveBlending' ? THREE.AdditiveBlending : THREE.NormalBlending;
      };

   
      
      // Particle shader material
      const particleShaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(particleColor) }
        },
        vertexShader: shaderCode.vertexShader,
        fragmentShader: shaderCode.fragmentShader,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: true,
        blending: getBlendingMode(blendMode)
      });
  

    // Load textures and create book
    const textureLoader = new THREE.TextureLoader();
    function loadTexture(url) {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          url,
          (texture) => {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
            
            // Ensure proper UV mapping
            texture.repeat.set(1, 1);
            texture.center.set(0.5, 0.5);
            texture.offset.set(0, 0);
            texture.needsUpdate = true;
            
            resolve(texture);
          },
          undefined,
          reject
        );
      });
    }
     

      Promise.all([
        loadTexture(frontCoverUrl),
        loadTexture(spineUrl),
        loadTexture(backCoverUrl)
      ]).then(([coverTextTexture, spineTexture, backTextTexture]) => {
        // console.log('Textures loaded successfully');
        // Create pages
        const pagesGeometry = createRoundedBoxGeometry(width - 0.1, height - 0.1, depth, cornerRadius);
        const pagesMaterial = Array(6).fill().map(() => new THREE.MeshStandardMaterial({
          map: createPageTexture(32),
          roughness: 1,
          metalness: 0
        }));
        
        const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
        pages.position.set(0, 0, -0.2);
  
        // Book covers setup
        const coverExtension = 0.04;
        const coverThickness = 0.07;
  
        // Create cloth texture
        const clothTexture = new THREE.CanvasTexture(createClothTexture());
        clothTexture.wrapS = THREE.RepeatWrapping;
        clothTexture.wrapT = THREE.RepeatWrapping;
        clothTexture.repeat.set(0.7, 0.7);
  
        const coverMaterial = new THREE.MeshStandardMaterial({
          map: clothTexture,
          color: bookColor,
          roughness: 1,
          metalness: 0,
          bumpMap: clothTexture,
          bumpScale: 0.02,
          transparent: false,
        depthWrite: true,
        depthTest: true
        });
  
        // Front cover
        const frontCoverGeometry = createRoundedBoxGeometry(
          width + coverExtension,
          height + coverExtension,
          coverThickness,
          cornerRadius
        );
        const frontCover = new THREE.Mesh(frontCoverGeometry, coverMaterial);
        frontCover.position.z = depth/2 + coverThickness/2;
  
        // Front text
        const frontTextGeometry = createFullCoverGeometry(
          width + coverExtension,
          height + coverExtension,
          cornerRadius
        );

      
        const frontText = new THREE.Mesh(frontTextGeometry, new THREE.MeshStandardMaterial({
          map: coverTextTexture,
          transparent: true,
          alphaTest: 0.1,
          depthWrite: false,
          side: THREE.DoubleSide,
          metalness: bookCoverMaterial.metalness,
          roughness: bookCoverMaterial.roughness,
          color: pngColor,
          emissive: pngColor,
          emissiveIntensity: 0.3,
          flatShading: false,
        precision: "highp"
        }));
        frontText.position.z = depth/2 + coverThickness/2 + 0.08;
  
        // Particles
      
        const particleGeometry = createFullCoverGeometry(
          width + coverExtension - 0.2,
          height + coverExtension - 0.2,
          0.01
        );
        const particleOverlay = new THREE.Mesh(particleGeometry, particleShaderMaterial);
        particleOverlay.position.z = depth/2 + coverThickness/2 + 0.09;
        // particleOverlay.position.y += 0.1;
      
  
        // Back cover
        const backCoverGeometry = createRoundedBoxGeometry(
          width + coverExtension,
          height + coverExtension,
          coverThickness,
          cornerRadius
        );
        const backCover = new THREE.Mesh(backCoverGeometry, coverMaterial);
        backCover.position.z = -depth/2 - coverThickness/2;
  
        // Back text
        const backTextGeometry = createFullCoverGeometry(
          width + coverExtension,
          height + coverExtension,
          cornerRadius
        );
        const backText = new THREE.Mesh(backTextGeometry, new THREE.MeshStandardMaterial({
          map: backTextTexture,
          transparent: true,
          alphaTest: 0.1,
          depthWrite: false,
          side: THREE.DoubleSide,
          metalness: bookCoverMaterial.metalness,
          roughness: bookCoverMaterial.roughness,
          color: pngColor,
          emissive: pngColor,
          emissiveIntensity: 0.3,
          flatShading: false,
         precision: "highp"
        }));
        backText.position.z = -depth/2 - coverThickness/2 - 0.002;

        // Spine
      const spineGeometry = new THREE.BoxGeometry(
        coverThickness,
        height + coverExtension,
        depth + (coverThickness * 2)
      );
      const spine = new THREE.Mesh(spineGeometry, coverMaterial);
      spine.position.x = -width/2 - coverThickness/2;
      spine.position.z += 0.03;

      // Spine text
      const spineTextGeometry = new THREE.BoxGeometry(
        0.001,
        height + coverExtension,
        depth + 0.14
      );
      const spineText = new THREE.Mesh(spineTextGeometry, new THREE.MeshStandardMaterial({
        map: spineTexture,
        transparent: true,
        alphaTest: 0.1,
        depthWrite: false,
        side: THREE.FrontSide,
        metalness: bookCoverMaterial.metalness,
        roughness: bookCoverMaterial.roughness,
        color: pngColor,
        emissive: pngColor,
        emissiveIntensity: 0.3,
        flatShading: false,
        precision: "highp"
      }));

      spineText.position.x = -width/2 - 0.075;
      spineText.position.z = 0.035;

      // Adjust textures
      [coverTextTexture, backTextTexture, spineTexture].forEach(texture => {
        texture.repeat.set(1, 1);
        texture.center.set(0.5, 0.5);
        texture.offset.set(0, 0);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.needsUpdate = true;
      });

      // Create book group
      const book = new THREE.Group();
      book.add(pages);
      book.add(frontCover);
      book.add(frontText);
      book.add(backCover);
      book.add(backText);
      book.add(spine);
      book.add(spineText);
      if(useShader) 
        {book.add(particleOverlay);}

      // Create a container for the book that will handle the tilt
      const bookContainer = new THREE.Group();
      bookContainer.add(book);
      scene.add(bookContainer);

      bookContainerRef = bookContainer;
      
      // Set initial rotation
      bookContainer.rotation.x = Math.PI * -0.15;
      bookContainer.rotation.z = Math.PI * 0.05;
      book.rotation.y = Math.PI * 0.1;

      // scene.add(book);


      if (isMobile) {
        controls.enabled = false;
        
        let touchStartX = 0;
      
        containerRef.current.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
          lastTime = Date.now();
          isDragging = true;
          isInertiaActive = false;
          // Store current rotation to prevent jumping
          currentRotation = bookContainerRef.rotation.y;
        },{ passive: false });
      
        containerRef.current.addEventListener('touchmove', (e) => {
          const touchX = e.touches[0].clientX;
          const deltaX = Math.abs(touchX - touchStartX);
          
          if (deltaX > 10) {
            e.preventDefault();
          }
      
          const currentTime = Date.now();
          const timeElapsed = currentTime - lastTime;
          const delta = (touchX - touchStartX) * 0.003;
          
          velocity = delta / timeElapsed;
          currentRotation += delta;
          bookContainerRef.rotation.y = currentRotation;
          // Reset position.y to prevent interference with touch movement
          bookContainerRef.position.y = 0;
          
          touchStartX = touchX;
          lastTime = currentTime;
        }, { passive: false });
      
        containerRef.current.addEventListener('touchend', () => {
          isDragging = false;
          if (Math.abs(velocity) > 0.0001) {
            isInertiaActive = true;
            animationTime = 0; // Reset animation time
            const applyInertia = setInterval(() => {
              velocity *= 0.95;
              currentRotation += velocity * 16;
              bookContainerRef.rotation.y = currentRotation;
              bookContainerRef.position.y = 0; // Keep position stable during inertia
              
              if (Math.abs(velocity) <= 0.0001) {
                clearInterval(applyInertia);
                isInertiaActive = false;
                animationTime = 0; // Reset animation time for smooth transition to float
              }
            }, 16);
          } else {
            animationTime = 0; // Reset animation time for smooth transition to float
          }
        });
      }


      // console.log('About to call onLoaded');
      // console.log('onLoaded exists:', !!onLoaded);

      if (onLoaded) {
        
        onLoaded();
        // console.log('onLoaded called');
      }
    })
    .catch(error => {
        console.error('Error creating book:', error);
      });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      if (isOrbiting) {
        controls.update();
      }
      else if (!isDragging && !isInertiaActive && bookContainerRef) {
        animateBook();
      }
      
      if(useShader){
        particleShaderMaterial.uniforms.time.value += animationSpeed;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [frontCoverUrl, backCoverUrl, spineUrl, bookColor, particleColor, pngColor, shaderCode, animationSpeed, blendMode, bookCoverMaterial]);

  return <div ref={containerRef} id={containerId} className="book-container" />;
};

export default Book;