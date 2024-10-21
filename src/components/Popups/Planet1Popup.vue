<template>
  <transition name="modal-fade-zoom">
    <div
        class="modal-overlay1"
        @click.self="closeModal"
        aria-modal="true"
        role="dialog"
        v-if="show"
    >
      <div class="modal-container1" ref="modal">
        <div class="modal-content1">
          <!-- Image Section with Navigation and Slide Transitions -->
          <div class="image-section1">
            <!-- Close Button -->
            <button
                class="close-button1"
                @click="closeModal"
                aria-label="Close Modal"
            >
              ✕
            </button>
            <transition name="slide-fade" mode="out-in">
              <div class="image-wrapper1" :key="currentSlide.image || currentSlide.video">
                <!-- Conditional rendering for image or video -->
                <img
                    v-if="!currentSlide.video"
                    :src="currentSlide.image"
                    :alt="currentSlide.title"
                    loading="lazy"
                />
                <video
                    v-else
                    :src="currentSlide.video"
                    controls
                    autoplay
                    loop
                    muted
                    playsinline
                    loading="lazy"
                ></video>

                <!-- Navigation Arrows -->
                <button
                    class="nav-arrow1 left1"
                    @click="prevSlide"
                    v-if="activeSlide > 0"
                    aria-label="Previous Slide"
                >
                  ‹
                </button>
                <button
                    class="nav-arrow1 right1"
                    @click="nextSlide"
                    v-if="activeSlide < slides.length - 1"
                    aria-label="Next Slide"
                >
                  ›
                </button>
              </div>
            </transition>
          </div>

          <!-- Info Section -->
          <div class="info-section1">
            <h2>{{ currentSlide.title }}</h2>
            <p>{{ currentSlide.description }}</p>

            <!-- Thumbnails as Indicators -->
            <div class="thumbnail-indicators1">
              <span
                  v-for="(slide, index) in slides"
                  :key="index"
                  :class="['thumbnail1', { active1: index === activeSlide }]"
                  @click="goToSlide(index)"
                  tabindex="0"
                  @keyup.enter="goToSlide(index)"
                  role="button"
                  :aria-label="`Go to slide ${index + 1}`"
              >
                <img
                    v-if="!slide.video"
                    :src="slide.image"
                    :alt="slide.title"
                    loading="lazy"
                />
                <video
                    v-else
                    :src="slide.video"
                    loading="lazy"
                    muted
                ></video>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Import your images and video here
import bewitched from '@/assets/img/JatwwProject/bewitched.png';
import jatwwcharacters from '@/assets/img/JatwwProject/jatwwcharacters.png';
import jatwwGame from '@/assets/img/JatwwProject/jatwwGame.png';
import jatwwvideo from '@/assets/img/JatwwProject/jatwwvideo.mp4';

export default {
  name: 'PopupOne',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeSlide: 0,
      slides: [
        {
          image: bewitched,
          title: 'Bewitched Studios (MD Project)',
          description: 'In this project, I had the opportunity to work on a website promoting the popular \'90s series Jace and the Wheeled Warriors. I collaborated with a team of 4 designers and 2 fellow developers under the name Bewitched Studios. My main responsibility was developing the website using Vue.js, while the other developers created an interactive game to enhance the site\'s appeal for a younger audience.' +
              'It was a particularly interesting experience, as it allowed me to get a solid introduction to Vue.js and apply it practically. Although I was relatively new to the framework, I was proud of the results and the progress I made. I learned a great deal throughout the process, and it was a fun and rewarding experience to work alongside such a creative team.',
        },
        {
          image: jatwwcharacters,
          title: 'Characters',
          description: 'As you can see, this is the character page. All characters were redesigned by our talented designers. My role was to arrange the characters in a line and add interactivity using Vue.js. When hovering over a character, they animate to move towards you, creating an engaging effect. Upon clicking a character, a popup appears with more detailed information about them, enhancing the user experience and bringing the characters to life.'
        },
        {
          image: jatwwGame,
          title: 'Game Integration',
          description: 'This image showcases a game that was a collaborative effort within our team. While I didn\'t create the game itself, my contribution was integrating it using WebGL technology. The game acts as a captivating header for the landing page, immediately drawing the attention of visitors when they open the site.',
        },
        {
          video: jatwwvideo,
          title: 'Video Showcase',
          description: 'This slide contains a video demonstration of the project. The video highlights various elements and interactions that were developed throughout the process, providing a more immersive overview of the project.'
        }
      ],
      boundTrapFocus: null,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.activeSlide];
    },
  },
  methods: {
    nextSlide() {
      if (this.activeSlide < this.slides.length - 1) {
        this.activeSlide += 1;
      }
    },
    prevSlide() {
      if (this.activeSlide > 0) {
        this.activeSlide -= 1;
      }
    },
    goToSlide(index) {
      this.activeSlide = index;
    },
    closeModal() {
      this.$emit('close');
      this.activeSlide = 0;
    },
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    },
    trapFocus(event) {
      const focusableElements = this.$refs.modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.addEventListener('keydown', this.handleKeyDown);
        this.boundTrapFocus = this.trapFocus.bind(this);
        document.addEventListener('keydown', this.boundTrapFocus);
        this.$nextTick(() => {
          const closeButton = this.$refs.modal.querySelector('.close-button1');
          if (closeButton) {
            closeButton.focus();
          }
        });
        document.body.style.overflow = 'hidden';
      } else {
        document.removeEventListener('keydown', this.handleKeyDown);
        if (this.boundTrapFocus) {
          document.removeEventListener('keydown', this.boundTrapFocus);
          this.boundTrapFocus = null;
        }
        document.body.style.overflow = '';
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.boundTrapFocus) {
      document.removeEventListener('keydown', this.boundTrapFocus);
      this.boundTrapFocus = null;
    }
    document.body.style.overflow = '';
  },
};
</script>

<style src="./Popup.css"></style>
