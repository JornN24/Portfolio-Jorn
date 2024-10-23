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
import zombieBaller from '@/assets/img/ZombieBaller/zombieBaller.png';
import zombieBallerVideo from '@/assets/img/ZombieBaller/zombieballer.mp4';
import zombieBallerVideo2 from '@/assets/img/ZombieBaller/zombieballer2.mp4';

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
          image: zombieBaller,
          title: 'Project Play - Arcade Machine Game (Year 2)',
          description: 'During my second year, I worked on an exciting project called Project Play in collaboration with DDM, where our team of 2 developers and 4 designers was tasked with creating a game for an arcade machine. We developed a top-down zombie shooter, and I was responsible for several key gameplay mechanics. My contributions included implementing the movement for both players and enemies, setting up enemy spawners, designing the score system, and integrating features like health packs, speed boosts, health systems for players and enemies, shooting mechanics, damage calculations, bullets, a health bar, camera follow, and slow-motion effects. This project was a fun and valuable experience in game development.',
        },
        {
          video: zombieBallerVideo,
          title: 'During the project',
          description: 'The video above showcases how the game looked during development and highlights the creative direction I chose for its design.',
        },
        {
          video: zombieBallerVideo2,
          title: 'Finished version',
          description: 'In this video, you can see the finished project, as it was presented and how it looks today. At the time, I was proud of what we delivered, but looking back, I now see areas where I could have improved. Despite that, it was an interesting and valuable experience as a Web developer. I developed this game in Unity using C#.',
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
