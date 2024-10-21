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
        <!-- Close Button -->
        <button
            class="close-button1"
            @click="closeModal"
            aria-label="Close Modal"
        >
          ✕
        </button>

        <div class="modal-content1">
          <!-- Image Section with Navigation and Slide Transitions -->
          <div class="image-section1">
            <transition name="slide-fade" mode="out-in">
              <div class="image-wrapper1" :key="currentSlide.image">
                <img
                    :src="currentSlide.image"
                    :alt="currentSlide.title"
                    loading="lazy"
                />
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
                    :src="slide.image"
                    :alt="slide.title"
                    loading="lazy"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
// Import your images here
import bewitched from '@/assets/img/JatwwProject/bewitched.png';
import jatwwcharacters from '@/assets/img/JatwwProject/jatwwcharacters.png';
import jatwwGame from '@/assets/img/JatwwProject/jatwwGame.png';

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
          title: 'Popup One - Slide 1',
          description: 'Description for Popup One, Slide 1.',
        },
        {
          image: jatwwcharacters,
          title: 'Popup One - Slide 2',
          description: 'Description for Popup One, Slide 2.',
        },
        {
          image: jatwwGame,
          title: 'Popup One - Slide 3',
          description: 'Description for Popup One, Slide 3.',
        },
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
