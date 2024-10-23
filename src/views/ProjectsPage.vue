<template>
  <div class="app-container">
    <div ref="container" class="scene-container"></div>
    <HamburgerMenu/>
    <!-- Intro Text -->
    <div v-if="showIntroText" class="intro-text">Click on the figure to open a project</div>
    <!-- Popup Component with Transition -->
    <transition name="popup-transition" mode="out-in">
      <component
          v-if="popupVisible"
          :is="popupComponent"
          @close="popupVisible = false"
          key="popup"
      />
    </transition>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Planet1Popup from '@/components/Popups/Planet1Popup.vue';
import Planet2Popup from '@/components/Popups/Planet2Popup.vue';
import Planet3Popup from '@/components/Popups/Planet3Popup.vue';
import Planet4Popup from '@/components/Popups/Planet4Popup.vue';
import Planet5Popup from '@/components/Popups/Planet5Popup.vue';
import HamburgerMenu from '@/components/HamburgerMenu.vue';

export default {
  components: {
    HamburgerMenu,
    Planet1Popup,
    Planet2Popup,
    Planet3Popup,
    Planet4Popup,
    Planet5Popup,
  },
  data() {
    return {
      popupVisible: false,
      popupComponent: null,
      mouse: new THREE.Vector2(),
      intersectedObjects: [],
      scene: null,
      camera: null,
      renderer: null,
      particles: null,
      planets: [],
      raycaster: null,
      animationFrameId: null,
      canOpenPopup: false,
      showIntroText: true,
      isMobile: window.innerWidth < 768,
    };
  },
  mounted() {
    this.init();

    // Animate intro text from above to the center
    gsap.fromTo(
        '.intro-text',
        { yPercent: -100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
        }
    );

    // After 5 seconds, animate it falling down and set showIntroText to false
    gsap.to('.intro-text', {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power1.in',
      delay: 5,
      onComplete: () => {
        this.showIntroText = false;
      },
    });

    // Allow popups to open after initial setup
    setTimeout(() => {
      this.canOpenPopup = true;
    }, 1000);
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    // Initialize Three.js scene and related components
    init() {
      this.scene = markRaw(new THREE.Scene());

      // Adjust camera position based on device
      this.camera = markRaw(
          new THREE.PerspectiveCamera(
              75,
              window.innerWidth / window.innerHeight,
              0.1,
              3000
          )
      );
      this.camera.position.z = this.isMobile ? 500 : 300;

      this.renderer = markRaw(
          new THREE.WebGLRenderer({ antialias: true, alpha: true })
      );
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor('#000100', 1);
      this.$refs.container.appendChild(this.renderer.domElement);

      // Add ambient light to the scene
      const ambientLight = markRaw(new THREE.AmbientLight(0xffffff, 0.5));
      this.scene.add(ambientLight);

      // Add a directional light to enhance visibility
      const directionalLight = markRaw(new THREE.DirectionalLight(0xffffff, 1));
      directionalLight.position.set(100, 100, 100);
      this.scene.add(directionalLight);

      // Create particles (star field)
      this.createParticles('#C8ACD6', '#433D8B');

      // Add planets to the scene
      this.addPlanets();

      this.raycaster = markRaw(new THREE.Raycaster());

      this.animate = this.animate.bind(this);
      this.animate();

      // Event listeners for interactions
      window.addEventListener('pointermove', this.onPointerMove);
      window.addEventListener('resize', this.onWindowResize);
      window.addEventListener('pointerdown', this.onPointerDown);
      window.addEventListener('keydown', this.onKeyDown);
    },
    // Clean up resources and event listeners
    cleanup() {
      window.removeEventListener('pointermove', this.onPointerMove);
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('pointerdown', this.onPointerDown);
      window.removeEventListener('keydown', this.onKeyDown);

      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.scene) {
        this.scene.clear();
      }

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    },
    // Create particle system (star field)
    createParticles(colorStart, colorEnd) {
      const particleCount = 5000;
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
        size: 2,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        vertexColors: true,
      });

      this.particles = markRaw(new THREE.Points(geometry, material));
      this.scene.add(this.particles);
    },
    // Geometry Creation Functions
    createBoxGeometry() {
      return new THREE.BoxGeometry(40, 40, 40);
    },
    createSphereGeometry() {
      return new THREE.SphereGeometry(20, 32, 32);
    },
    createConeGeometry() {
      return new THREE.ConeGeometry(20, 40, 32);
    },
    createCylinderGeometry() {
      return new THREE.CylinderGeometry(20, 20, 40, 32);
    },
    createTorusGeometry() {
      return new THREE.TorusGeometry(20, 6, 32, 200);
    },
    createTorusKnotGeometry() {
      return new THREE.TorusKnotGeometry(20, 6, 200, 32);
    },
    createOctahedronGeometry() {
      return new THREE.OctahedronGeometry(20);
    },
    createIcosahedronGeometry() {
      return new THREE.IcosahedronGeometry(20);
    },
    createDodecahedronGeometry() {
      return new THREE.DodecahedronGeometry(20);
    },
    createTetrahedronGeometry() {
      return new THREE.TetrahedronGeometry(20);
    },
    createCapsuleGeometry() {
      return new THREE.CapsuleGeometry(20, 40, 4, 16);
    },
    createLatheGeometry() {
      const points = [];
      for (let i = 0; i < 10; i++) {
        points.push(
            new THREE.Vector2(Math.sin(i * 0.2) * 20 + 10, (i - 5) * 4)
        );
      }
      return new THREE.LatheGeometry(points, 64);
    },
    // Add planets to the scene
    addPlanets() {
      this.planets = [];
      this.planetInitialPositions = [];

      const planetColors = ['#C8ACD6', '#433D8B', '#1230AE', '#9506e0'];

      // Updated positions based on device
      const mobilePositions = [
        { x: -60, y: 120, z: 70 },
        { x: 60, y: 60, z: 37.5 },
        { x: -45, y: 0, z: 30.5 },
        { x: 45, y: -60, z: 52.5 },
        { x: -30, y: -120, z: 0 },
      ];

      const desktopPositions = [
        { x: -150, y: 75, z: 70 },
        { x: -15, y: 140, z: 37.5 },
        { x: -120, y: -120, z: 30.5 },
        { x: 120, y: 30, z: 52.5 },
        { x: 100, y: -105, z: 0 },
      ];

      const planetPositions = this.isMobile ? mobilePositions : desktopPositions;

      // Define available shapes and their corresponding creation functions
      const shapeCreators = [
        this.createBoxGeometry,
        this.createSphereGeometry,
        this.createConeGeometry,
        this.createCylinderGeometry,
        this.createTorusGeometry,
        this.createTorusKnotGeometry,
        this.createOctahedronGeometry,
        this.createIcosahedronGeometry,
        this.createDodecahedronGeometry,
        this.createTetrahedronGeometry,
      ];

      const numberOfPlanets = planetPositions.length;

      for (let i = 0; i < numberOfPlanets; i++) {
        // Randomly select a shape
        const randomShapeIndex = Math.floor(
            Math.random() * shapeCreators.length
        );
        const geometry = shapeCreators[randomShapeIndex].call(this);

        // Randomly select a color
        const color =
            planetColors[Math.floor(Math.random() * planetColors.length)];

        // Create the main planet mesh with enhanced material for visibility
        const material = new THREE.MeshStandardMaterial({
          color: color,
          emissive: new THREE.Color(color),
          emissiveIntensity: 0.3,
          metalness: 1,
          roughness: 0.5,
        });

        const planet = markRaw(new THREE.Mesh(geometry, material));

        // Assign position based on device
        const position = planetPositions[i];
        planet.position.set(position.x, position.y, position.z);

        planet.name = `Planet${i + 1}`;
        planet.userData = { popupIndex: i };

        this.planetInitialPositions.push({
          x: position.x,
          y: position.y,
          z: position.z,
        });

        this.scene.add(planet);
        this.planets.push(planet);
      }
    },
    // Handle pointer movement for interactions
    onPointerMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planets, true);

      // Reset scale for previously intersected objects
      this.intersectedObjects.forEach((object) => {
        this.smoothScale(object, 1);
      });

      // Update intersected objects
      this.intersectedObjects = intersects.map((intersect) => intersect.object);

      // Enlarge intersected objects
      this.intersectedObjects.forEach((object) => {
        this.smoothScale(object, 1.5);
      });
    },
    // Smoothly scale objects using GSAP
    smoothScale(object, targetScale) {
      gsap.to(object.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.5,
        ease: 'power1.out',
      });
    },
    // Handle window resize events
    onWindowResize() {
      this.isMobile = window.innerWidth < 768;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // Reposition planets for responsiveness
      const mobilePositions = [
        { x: -60, y: 120, z: 70 },
        { x: 60, y: 60, z: 37.5 },
        { x: -45, y: 0, z: 30.5 },
        { x: 45, y: -60, z: 52.5 },
        { x: -30, y: -120, z: 0 },
      ];

      this.planets.forEach((planet, index) => {
        const newPosition = this.isMobile
            ? mobilePositions[index]
            : this.planetInitialPositions[index];
        gsap.to(planet.position, {
          x: newPosition.x,
          y: newPosition.y,
          z: newPosition.z,
          duration: 1,
          ease: 'power1.out',
        });
      });
    },
    // Handle pointer down events
    onPointerDown(event) {
      this.checkPlanetClick(event);
    },
    // Check if a planet was clicked and open corresponding popup
    checkPlanetClick(event) {
      if (!this.canOpenPopup) {
        return;
      }

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planets, true);

      if (intersects.length > 0) {
        const planet = intersects[0].object;
        this.openPopup(planet);
      }
    },
    // Open the popup corresponding to the clicked planet
    openPopup(planet) {
      const popupIndex = planet.userData.popupIndex;
      const popupComponents = [
        Planet1Popup,
        Planet2Popup,
        Planet3Popup,
        Planet4Popup,
        Planet5Popup,
      ];
      this.popupComponent = popupComponents[popupIndex] || null;
      this.popupVisible = !!this.popupComponent;
    },
    // Handle keydown events for closing popups
    onKeyDown(event) {
      if (event.key === 'Escape' && this.popupVisible) {
        this.popupVisible = false;
      }
    },
    // Animation loop for rendering the scene
    animate() {
      this.animationFrameId = requestAnimationFrame(this.animate);

      // Rotate each planet
      this.planets.forEach((planet) => {
        planet.rotation.y += 0.005;
        planet.rotation.x += 0.002;
      });

      // Smooth camera movement based on mouse position
      if (!this.isMobile) {
        this.camera.position.x +=
            (this.mouse.x * 100 - this.camera.position.x) * 0.05;
        this.camera.position.y +=
            (this.mouse.y * 100 - this.camera.position.y) * 0.05;
      }

      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.scene-container {
  width: 100%;
  height: 100%;
}

.intro-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 17px;
  color: #C8ACD6;
}
</style>
