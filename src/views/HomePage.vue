<template>
  <div class="app-container">
    <div ref="container" class="three-container"></div>
    <HamburgerMenu/>
  </div>
</template>

<script>
import * as THREE from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
  name: 'HomePage',
  components: {HamburgerMenu},
  data() {
    return {
      transitioning: false,
      mouse: new THREE.Vector2(),
      isInitialAnimation: true,
      initialCameraZ: 300,
      targetCameraZ: 100,
      animationStartTime: null,
      animationDuration: 2000,
      eventsAdded: false,
      animatedShapes: [],
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

    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('touchmove', this.onTouchMove, false);
  },
  beforeUnmount() {
    // Remove event listeners to prevent memory leaks
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('touchmove', this.onTouchMove, false);
    if (this.eventsAdded) {
      this.renderer.domElement.removeEventListener('click', this.onClickBound, false);
    }
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.forceContextLoss();
      this.renderer.dispose();
    }
  },
  methods: {
    initThree() {
      // Define color palette
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
      this.camera.position.z = this.isMobile ? 450 : this.initialCameraZ;

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(color4, 1);
      this.$refs.container.appendChild(this.renderer.domElement);

      // Add ambient light to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      // Create particle system
      this.createParticles(color2, color3);

      // Load fonts and create text meshes
      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        // Create "Frontend" Text
        const text1 = 'Frontend';
        const textGeometry1 = new TextGeometry(text1, {
          font: font,
          size: this.isMobile ? 7 : 12,
          height: 4,
          curveSegments: 12,
        });
        textGeometry1.computeBoundingBox();
        textGeometry1.center();

        const textMaterial1 = new THREE.MeshPhongMaterial({color: color1});
        this.textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
        this.textMesh1.position.y = this.isMobile ? 4 : 8;
        this.scene.add(this.textMesh1);

        // Create "Developer" Text
        const text2 = 'Developer';
        const textGeometry2 = new TextGeometry(text2, {
          font: font,
          size: this.isMobile ? 7 : 12,
          height: 4,
          curveSegments: 12,
        });
        textGeometry2.computeBoundingBox();
        textGeometry2.center();

        const textMaterial2 = new THREE.MeshPhongMaterial({color: color1});
        this.textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        this.textMesh2.position.y = this.isMobile ? -4 : -8;
        this.scene.add(this.textMesh2);

        // Create Subtitle Text
        const subtitleText = 'Vue - HTML - CSS - JS';
        const subtitleGeometry = new TextGeometry(subtitleText, {
          font: font,
          size: this.isMobile ? 2.5 : 4,
          height: 0.8,
          curveSegments: 12,
        });
        subtitleGeometry.computeBoundingBox();
        subtitleGeometry.center();

        const subtitleMaterial = new THREE.MeshPhongMaterial({color: color2});
        this.subtitleMesh = new THREE.Mesh(subtitleGeometry, subtitleMaterial);
        this.subtitleMesh.position.y = this.isMobile ? -13 : -24;
        this.scene.add(this.subtitleMesh);

        // Create Credit Text
        const creditText = 'Made by Jorn Noten';
        const creditGeometry = new TextGeometry(creditText, {
          font: font,
          size: this.isMobile ? 1.2 : 2.5,
          height: 0.4,
          curveSegments: 12,
        });
        creditGeometry.computeBoundingBox();
        creditGeometry.center();

        const creditMaterial = new THREE.MeshPhongMaterial({color: color2});
        const creditMesh = new THREE.Mesh(creditGeometry, creditMaterial);
        creditMesh.position.y = this.isMobile ? -20 : -34;
        this.scene.add(creditMesh);
      });

      // Bind the onClick method for later removal
      this.onClickBound = this.onClick.bind(this);
    },
    createParticles(colorStart, colorEnd) {
      const particleCount = this.isMobile ? 1200 : 5000;
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
        size: this.isMobile ? 3.5 : 2,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        vertexColors: true,
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    },
    animate() {
      this.animationId = requestAnimationFrame(this.animate);

      const currentTime = performance.now();

      if (this.isInitialAnimation) {
        if (!this.animationStartTime) {
          this.animationStartTime = currentTime;
        }

        const elapsed = currentTime - this.animationStartTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);

        // Smooth camera zoom-in effect
        this.camera.position.z = this.initialCameraZ - (this.initialCameraZ - this.targetCameraZ) * progress;

        if (progress === 1) {
          this.isInitialAnimation = false;

          if (!this.eventsAdded) {
            this.renderer.domElement.addEventListener('click', this.onClickBound, false);
            this.eventsAdded = true;
          }
        }
      } else {
        // Smooth camera movement based on mouse position
        this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 50 - this.camera.position.y) * 0.05;
      }

      // Floating animation for text meshes
      if (this.textMesh1 && this.textMesh2) {
        const floatY = Math.sin(currentTime * 0.001) * 0.5;
        this.textMesh1.position.y = (this.isMobile ? 4 : 8) + floatY;
        this.textMesh2.position.y = (this.isMobile ? -4 : -8) + floatY;
        if (this.subtitleMesh) {
          this.subtitleMesh.position.y = (this.isMobile ? -13 : -24) + floatY;
        }
      }

      // Animate particle movement
      if (this.particles) {
        const positions = this.particles.geometry.attributes.position.array;
        const time = Date.now() * 0.001;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += 0.01 * Math.sin(time + positions[i + 1] * 0.1);
          positions[i + 1] += 0.01 * Math.cos(time + positions[i + 2] * 0.1);
        }
        this.particles.geometry.attributes.position.needsUpdate = true;
      }

      // Update and manage animated shapes
      this.animatedShapes.forEach((shape, index) => {
        shape.update();
        if (shape.isFinished()) {
          this.scene.remove(shape.mesh);
          this.animatedShapes.splice(index, 1);
        }
      });

      // Render the scene from the perspective of the camera
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
      const intersects = raycaster.intersectObjects(this.scene.children, true);

      let point = new THREE.Vector3();
      if (intersects.length > 0) {
        point.copy(intersects[0].point);
      } else {
        raycaster.ray.at(100, point);
      }

      // Add a new animated shape at the click position
      const animatedShape = new AnimatedShape(this.scene, point);
      this.animatedShapes.push(animatedShape);
    },
  },
};

// Class to handle animated shapes added on user interaction
class AnimatedShape {
  constructor(scene, position) {
    this.scene = scene;
    this.position = position.clone();

    // Randomly select a shape type
    const shapeTypes = ['cube', 'sphere', 'cone'];
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    let geometry;
    switch (type) {
      case 'cube':
        geometry = new THREE.BoxGeometry(2, 2, 2);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 32, 32);
        break;
      case 'cone':
        geometry = new THREE.ConeGeometry(1, 2, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    // Create material with random color and additive blending for visual effect
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });

    // Create mesh and add to scene
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);

    // Initialize animation properties
    this.scale = 1;
    this.rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
    );

    this.lifespan = 200;
    this.age = 0;
  }

  update() {
    // Rotate the shape
    this.mesh.rotation.x += this.rotationSpeed.x;
    this.mesh.rotation.y += this.rotationSpeed.y;
    this.mesh.rotation.z += this.rotationSpeed.z;

    // Scale up the shape over time
    this.scale += 0.02;
    this.mesh.scale.set(this.scale, this.scale, this.scale);

    // Fade out the shape's opacity
    const remaining = 1 - this.age / this.lifespan;
    this.mesh.material.opacity = remaining;

    this.age++;
  }

  isFinished() {
    // Determine if the shape has reached its lifespan
    return this.age >= this.lifespan;
  }
}
</script>
