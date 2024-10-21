<template>
  <!-- Hamburger Menu Icon -->
  <div class="hamburger-menu" @click="toggleMenu" :class="{ open: isMenuOpen }">
    <div class="bar bar1"></div>
    <div class="bar bar2"></div>
    <div class="bar bar3"></div>
  </div>

  <!-- Dropdown Navigation Menu with Transition -->
  <transition name="menu">
    <div v-if="isMenuOpen" class="menu-overlay" @click.self="closeMenu">
      <nav class="menu">
        <ul>
          <li>
            <router-link to="/" @click="closeMenu">Welcome</router-link>
          </li>
          <li>
            <router-link to="/home" @click="closeMenu">Home</router-link>
          </li>
          <li>
            <router-link to="/about" @click="closeMenu">About Me</router-link>
          </li>
          <li>
            <router-link to="/projects" @click="closeMenu">Projects</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
.hamburger-menu {
  position: fixed;
  top: 20px;
  right: 30px;
  width: 35px;
  height: 30px;
  cursor: pointer;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.5s ease;
}

.hamburger-menu.open {
  transform: rotate(90deg);
}

.hamburger-menu .bar {
  width: 100%;
  height: 4px;
  background-color: #C8ACD6;
  border-radius: 2px;
  transition: all 0.5s ease;
}

.hamburger-menu.open .bar1 {
  transform: rotate(-45deg) translate(-7px, 6px);
}

.hamburger-menu.open .bar2 {
  opacity: 0;
}

.hamburger-menu.open .bar3 {
  transform: rotate(45deg) translate(-7px, -6px);
}

/* Dropdown Menu Overlay Styles */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 1, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  backdrop-filter: blur(5px);
  overflow: auto;
}

.menu {
  text-align: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li {
  margin: 20px 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

.menu ul li:nth-child(1) {
  animation-delay: 0.1s;
}

.menu ul li:nth-child(2) {
  animation-delay: 0.2s;
}

.menu ul li:nth-child(3) {
  animation-delay: 0.3s;
}

.menu ul li:nth-child(4) {
  animation-delay: 0.4s;
}

.menu ul li a {
  color: #C8ACD6;
  text-decoration: none;
  font-size: 1.5em;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
}

.menu ul li a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: #ffffff;
  left: 50%;
  bottom: -5px;
  transition: all 0.3s ease;
}

.menu ul li a:hover {
  color: #ffffff;
  transform: scale(1.1);
}

.menu ul li a:hover::after {
  width: 100%;
  left: 0;
}

/* Keyframes for Dropdown Menu Animation */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>