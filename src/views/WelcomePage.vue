<template>
  <div ref="container" class="three-container"></div>
</template>

<script>
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default {
  name: 'WelcomePage',
  data() {
    return {
      transitioning: false,
      mouse: new THREE.Vector2(),
      startTime: null,
      isMobile: window.innerWidth < 768,
    };
  },
  mounted() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationId = null;

    this.initThree();
    this.animate = this.animate.bind(this);
    this.animate();

    // Add event listeners for window resize and input (mouse/touch)
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('touchmove', this.onTouchMove, false);
    this.renderer.domElement.addEventListener('click', this.onClick.bind(this), false);
    this.renderer.domElement.addEventListener('touchend', this.onClick.bind(this), false);
  },
  beforeUnmount() {
    // Remove event listeners to prevent memory leaks
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('touchmove', this.onTouchMove, false);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.removeEventListener('click', this.onClickBound, false);
      this.renderer.domElement.removeEventListener('touchend', this.onClickBound, false);
    }

    // Cancel the animation frame
    cancelAnimationFrame(this.animationId);

    // Dispose of Three.js objects to avoid memory leaks
    if (this.textMesh) {
      this.textMesh.geometry.dispose();
      this.textMesh.material.dispose();
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }

    // Dispose the renderer and force context loss
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }

    // Nullify scene, camera, and renderer for cleanup
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  },
  methods: {
    initThree() {
      const color1 = '#ffffff';
      const color2 = '#C8ACD6';
      const color3 = '#433D8B';
      const color4 = '#000100';

      // Initialize Three.js scene
      this.scene = new THREE.Scene();
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set up camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      this.camera.position.z = this.isMobile ? 150 : 100;

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(color4);
      this.$refs.container.appendChild(this.renderer.domElement);

      // Add ambient light to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      // Create particle system
      this.createParticles(color2, color3);

      // Load fonts and create text meshes
      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const text = 'WELCOME';
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: this.isMobile ? 10 : 20,
          height: 5,
          curveSegments: 12,
        });
        textGeometry.computeBoundingBox();
        textGeometry.center();

        const textMaterial = new THREE.MeshPhongMaterial({ color: color1 });
        this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
        this.scene.add(this.textMesh);

        const instructionWords = ['Click', 'to', 'continue'];
        const instructionMeshes = [];
        const wordSpacing = this.isMobile ? 1 : 2;
        let totalWidth = 0;
        const wordGeometries = [];

        for (let i = 0; i < instructionWords.length; i++) {
          const word = instructionWords[i];
          const wordGeometry = new TextGeometry(word, {
            font: font,
            size: this.isMobile ? 2.5 : 5,
            height: 1,
            curveSegments: 12,
          });
          wordGeometry.computeBoundingBox();
          wordGeometry.translate(-wordGeometry.boundingBox.min.x, 0, 0);
          const wordWidth = wordGeometry.boundingBox.max.x - wordGeometry.boundingBox.min.x;
          totalWidth += wordWidth + wordSpacing;

          wordGeometries.push({ geometry: wordGeometry, width: wordWidth, word });
        }

        totalWidth -= wordSpacing;
        let currentPosition = -totalWidth / 2;

        for (let i = 0; i < wordGeometries.length; i++) {
          const { geometry, width, word } = wordGeometries[i];
          let material;
          if (word === 'Click') {
            material = new THREE.MeshPhongMaterial({ color: color1 });
          } else {
            material = new THREE.MeshPhongMaterial({ color: color2 });
          }
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = currentPosition;
          mesh.position.y = -30;
          currentPosition += width + wordSpacing;
          this.scene.add(mesh);
          instructionMeshes.push(mesh);

          if (word === 'Click') {
            this.clickMesh = mesh;
          }
        }
      });

      // Bind the onClick method for later removal
      this.onClickBound = this.onClick.bind(this);
    },
    createParticles(colorStart, colorEnd) {
      const particleCount = this.isMobile ? 1500 : 5000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorStartObj = new THREE.Color(colorStart);
      const colorEndObj = new THREE.Color(colorEnd);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 500;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 500;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 500;

        const color = colorStartObj.clone().lerp(colorEndObj, Math.random());
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: this.isMobile ? 4 : 2,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        vertexColors: true,
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    },
    animate(time) {
      this.animationId = requestAnimationFrame(this.animate);

      if (this.textMesh && !this.transitioning) {
        this.textMesh.position.y += Math.sin(Date.now() * 0.001) * 0.005;
      }

      if (this.transitioning && this.startTime !== null) {
        const elapsed = time - this.startTime;
        const duration = 3000;
        const progress = Math.min(elapsed / duration, 1);

        this.camera.position.z -= progress * 2;

        this.camera.rotation.y += 0.001;

        if (progress === 1) {
          this.$router.push('/home');
          return;
        }
      }

      if (this.particles) {
        const positions = this.particles.geometry.attributes.position.array;
        const time = Date.now() * 0.001;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += 0.01 * Math.sin(time + positions[i + 1] * 0.1);
          positions[i + 1] += 0.01 * Math.cos(time + positions[i + 2] * 0.1);
        }
        this.particles.geometry.attributes.position.needsUpdate = true;
      }

      if (!this.transitioning) {
        this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 50 - this.camera.position.y) * 0.05;
      }
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.isMobile = window.innerWidth < 768;
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    onTouchMove(event) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    },
    onClick(event) {
      if (this.transitioning) return;

      const rect = this.renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);

      if (this.clickMesh) {
        const intersects = raycaster.intersectObject(this.clickMesh);
        if (intersects.length > 0) {
          const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
          this.textMesh.material.color.set(randomColor);
          return;
        }
      }

      this.startTransition();
    },
    startTransition() {
      this.transitioning = true;
      this.startTime = performance.now();
    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
