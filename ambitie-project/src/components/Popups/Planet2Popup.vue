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
import Safeshare1 from '@/assets/img/stageProwise/prowise.png';
import Safeshare2 from '@/assets/img/stageProwise/prowiseSafeShare.png';
import Safeshare3 from '@/assets/img/stageProwise/prowiseSafeShare2.png';
import Safeshare4 from '@/assets/img/stageProwise/prowiseSafeShare3.png';

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
          image: Safeshare1,
          title: 'Internship Prowise',
          description: 'Prowise is a leading company specializing in the development and sale of technological solutions for schools, with a strong presence in the Netherlands, Germany, and Belgium. With over 250 employees and extensive facilities in Budel, the company has secured a prominent position in the educational tech sector. Its product range includes digital whiteboards and laptops, primarily for the education market, but also attracting interest from other sectors. Prowise’s organizational structure includes departments like Operations, Sales, Procurement, Compliance, Legal & Risk, and IT, each with teams working to achieve company goals.',
        },
        {
          image: Safeshare2,
          title: 'Safe-Share',
          description: 'During my time with Prowise, I developed Safe Share, a web application designed to securely share sensitive information with colleagues and clients. Safe Share features automatic deletion of shared data after a predetermined period or once accessed by the recipient, ensuring confidentiality and preventing data breaches. I handled both the frontend and backend development using React, creating an intuitive user interface and implementing robust server-side logic. This comprehensive approach resulted in a well-integrated, functional, and user-friendly application that effectively safeguards confidential information.',
        },
        {
          image: Safeshare3,
          title: 'Safe-Share',
          description: 'The link sent to the recipient can only be accessed by the owner of the specified email address.',
        },
        {
          image: Safeshare4,
          title: 'Safe-Share',
          description: 'The unique link sent to the recipient is restricted to the specified email address, ensuring that only the intended user can access it. Once the recipient opens the secret, the information is viewable only once, refreshing the page will permanently delete the content.',
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
