<template>
  <div class="about-page" style="height: 100vh; overflow-y: scroll;">
    <HamburgerMenu />

    <!-- Header Section -->
    <div class="header-section">
      <div class="overlay"></div>
      <div class="header-content">
        <img src="../assets/img/jorn.jpg" alt="Profile Image" class="profile-image" />
        <h1 class="header-name">Jorn Noten</h1>
        <p class="header-title">SintLucas Student & Front-End Developer</p>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section" ref="about">
      <div class="about-content">
        <div class="about-image-container">
          <img src="../assets/img/Jorn3.png" alt="Profile Image" class="about-image" />
        </div>
        <div class="about-text">
          <h2>Discover</h2>
          <h3>About Me</h3>
          <p>Hi, I'm Jorn, a 20-year-old software development student from the Netherlands, studying at SintLucas in Eindhoven. Throughout my journey as a developer, I've worked on a variety of small projects and also gained professional experience at Prowise. If you're interested in exploring my work, feel free to visit the Projects page. For more details about my experience, you can download my CV.</p>

          <!-- About Details -->
          <div class="about-details">
            <div class="about-details-left">
              <ul>
                <li><strong>Name:</strong> Jorn Noten</li>
                <li><strong>Phone:</strong> <a href="tel:+31647928463">0647928463</a></li>
                <li><strong>Experience:</strong> Several small projects</li>
                <li><strong>Email:</strong> <a href="mailto:j.noten@sintlucasedu.nl">j.noten@sintlucasedu.nl</a></li>
              </ul>
            </div>
            <div class="about-details-right">
              <ul>
                <li><strong>Age:</strong> 20</li>
                <li><strong>Address:</strong> Brabant, Netherlands</li>
                <li><strong>Freelance:</strong> Available</li>
                <li><strong>GitHub:</strong> github.com/JornN24</li>
              </ul>
            </div>
          </div>

          <!-- Download CV Button -->
          <a href="../assets/CVJornNoten.pdf" download="CVJornNoten.pdf">
            <button class="download-cv-button">Download CV</button>
          </a>
        </div>
      </div>
    </div>

    <!-- Skills Header -->
    <div class="skills-section" ref="skills">
      <h2>My Skills</h2>
      <p>"Skills are not just about what you can do, but about how you adapt, learn, and grow when faced with new challenges."</p>

      <!-- Skills Container -->
      <div class="skills-container">
        <!-- Skill Row 1 -->
        <div class="skill-row">
          <div class="skill">
            <span>C#</span>
            <div class="skill-bar"><div class="skill-level" style="width: 65%"></div></div>
            <span>65%</span>
          </div>
          <div class="skill">
            <span>JS</span>
            <div class="skill-bar"><div class="skill-level" style="width: 75%"></div></div>
            <span>75%</span>
          </div>
        </div>

        <!-- Skill Row 2 -->
        <div class="skill-row">
          <div class="skill">
            <span>HTML</span>
            <div class="skill-bar"><div class="skill-level" style="width: 95%"></div></div>
            <span>95%</span>
          </div>
          <div class="skill">
            <span>CSS</span>
            <div class="skill-bar"><div class="skill-level" style="width: 90%"></div></div>
            <span>90%</span>
          </div>
        </div>

        <!-- Skill Row 3 -->
        <div class="skill-row">
          <div class="skill">
            <span>Vue</span>
            <div class="skill-bar"><div class="skill-level" style="width: 85%"></div></div>
            <span>85%</span>
          </div>
          <div class="skill">
            <span>React</span>
            <div class="skill-bar"><div class="skill-level" style="width: 80%"></div></div>
            <span>80%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section (Skill Cards) -->
    <div class="services section" ref="services">
      <h2>Skill Cards</h2>
      <h3>Click to flip card</h3>

      <!-- Skill Set Grid -->
      <div class="skill-set">
        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fas fa-code"></i>
              </div>
              <h4>C#</h4>
            </div>
            <div class="skill-card-back">
              <p>Skilled in C# for Unity game development, specializing in gameplay mechanics and performance optimization.</p>
            </div>
          </div>
        </div>

        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fab fa-js"></i>
              </div>
              <h4>JavaScript</h4>
            </div>
            <div class="skill-card-back">
              <p>Experienced in JavaScript for front-end development, adding interactivity to websites, and working with frameworks like Vue and React.</p>
            </div>
          </div>
        </div>

        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fab fa-html5"></i>
              </div>
              <h4>HTML</h4>
            </div>
            <div class="skill-card-back">
              <p>Skilled in HTML for creating the structure of web pages, ensuring semantic markup and accessibility standards are met.</p>
            </div>
          </div>
        </div>

        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fab fa-css3-alt"></i>
              </div>
              <h4>CSS</h4>
            </div>
            <div class="skill-card-back">
              <p>Proficient in CSS for styling websites, creating responsive layouts, animations, and improving user experience.</p>
            </div>
          </div>
        </div>

        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fab fa-vuejs"></i>
              </div>
              <h4>Vue.js</h4>
            </div>
            <div class="skill-card-back">
              <p>Experienced in using Vue.js to build reactive and dynamic web applications, utilizing its component-based architecture.</p>
            </div>
          </div>
        </div>

        <div class="skill-card" @click="flipCard">
          <div class="skill-card-inner">
            <div class="skill-card-front">
              <div class="skill-icon">
                <i class="fab fa-react"></i>
              </div>
              <h4>React</h4>
            </div>
            <div class="skill-card-back">
              <p>Knowledgeable in React, creating components, managing state, and building single-page applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="footer section" ref="footer">
      <div class="footer-content">
        <h2 class="footer-title">Get in Touch</h2>
        <p class="footer-description">MIT License. This project is open source and available for redistribution and modification under the terms of the MIT license.</p>

        <!-- Social Links -->
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        </div>

        <!-- Contact Cards -->
        <div class="contact-cards">
          <div class="contact-card">
            <i class="fab fa-github"></i>
            <p>github.com/JornN24</p>
          </div>
          <div class="contact-card">
            <i class="fas fa-envelope"></i>
            <p>j.noten@sintlucasedu.nl</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import HamburgerMenu from '@/components/HamburgerMenu.vue';

export default {
  name: 'AboutMePage',
  components: {
    HamburgerMenu,
  },
  methods: {
    flipCard(event) {
      const card = event.currentTarget.querySelector('.skill-card-inner');
      card.classList.toggle('flipped');
    },
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    const sections = [
      this.$refs.about,
      this.$refs.skills,
      this.$refs.services,
      this.$refs.footer,
    ];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
  },
};
</script>

<style>
/* General Styles */
.about-page {
  background-color: #1c1c1c;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

/* Header Section */
.header-section {
  position: relative;
  padding: 150px 20px;
  text-align: center;
  background-image: url('../assets/img/space.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
}

.header-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.header-title {
  font-size: 1.2rem;
  color: #C8ACD6;
}

/* About Section */
.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  background-color: #1c1c1c;
  color: #fff;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s ease-in-out, transform 1.5s ease-in-out;
}

.about-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.about-content {
  display: flex;
  max-width: 1000px;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2c;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.about-image-container {
  flex-shrink: 0;
}

.about-image {
  width: 450px;
  height: 800px;
  border-radius: 10px;
  object-fit: cover;
}

.about-text {
  max-width: 600px;
  margin-left: 40px;
}

.about-text h2 {
  font-size: 24px;
  color: #C8ACD6;
  margin-bottom: 10px;
}

.about-text h3 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
}

.about-text p {
  font-size: 1rem;
  line-height: 1.6;
}

.about-details a {
  color: #C8ACD6;
  text-decoration: none;
  transition: color 0.3s;
}

.about-details a:hover {
  color: #ffffff;
}

.about-details-left,
.about-details-right {
  width: 48%;
}

.about-details ul {
  list-style: none;
  padding: 0;
}

.about-details li {
  font-size: 18px;
  margin-bottom: 10px;
}

.download-cv-button {
  background-color: #C8ACD6;
  color: #000;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;
}

.download-cv-button:hover {
  background-color: #ffffff;
  color: #000;
}

/* Skills Section */
.skills-section {
  padding: 60px 20px;
  background-color: #1c1c1c;
  text-align: center;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s ease-in-out, transform 1.5s ease-in-out;
}

.skills-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.skills-section h2 {
  font-size: 2rem;
  color: #C8ACD6;
  margin-bottom: 20px;
}

.skills-section p {
  font-size: 1rem;
  color: #e0e0e0;
  margin-bottom: 30px;
}

.skills-container {
  max-width: 1000px;
  margin: 0 auto;
}

.skill-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.skill {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #C8ACD6;
  font-size: 1.2rem;
}

.skill-bar {
  width: 70%;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  margin: 0 10px;
}

.skill-level {
  height: 100%;
  background-color: #C8ACD6;
  border-radius: 5px;
}

/* Services Section (Skill Cards) */
.services {
  padding: 60px 20px;
  background-color: #1c1c1c;
  text-align: center;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s ease-in-out, transform 1.5s ease-in-out;
}

.services.visible {
  opacity: 1;
  transform: translateY(0);
}

.services h2 {
  font-size: 2rem;
  color: #C8ACD6;
  margin-bottom: 20px;
}

.services h3 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 40px;
  position: relative;
}

.services h3::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  background-color: #C8ACD6;
  margin: 10px auto 0;
}

.skill-set {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
  padding: 0 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.skill-card {
  perspective: 1000px;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.skill-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s ease-in-out;
  transform-style: preserve-3d;
}

.skill-card-inner.flipped {
  transform: rotateY(180deg);
}

.skill-card-front,
.skill-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.skill-card-front {
  background-color: #2c2c2c;
  color: #ffffff;
}

.skill-card-back {
  background-color: #433D8B;
  color: #ffffff;
  transform: rotateY(180deg);
}

.skill-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.4);
}

.skill-card h4 {
  margin: 20px 0;
  font-size: 1.2rem;
  color: #C8ACD6;
}

.skill-card p {
  font-size: 1rem;
  color: #e0e0e0;
}

/* Footer Styles */
.footer {
  background-color: #0d1117;
  padding: 60px 20px;
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #21262d;
  color: #e6edf3;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s ease-in-out, transform 1.5s ease-in-out;
}

.footer.visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-title {
  font-size: 2rem;
  color: #f0f6fc;
  margin-bottom: 10px;
}

.footer-description {
  font-size: 1rem;
  color: #8b949e;
  margin-bottom: 30px;
}

.footer .social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.footer .social-link {
  color: #c9d1d9;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.footer .social-link:hover {
  color: #C8ACD6;
}

.footer .contact-cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.footer .contact-card {
  background-color: #161b22;
  color: #c9d1d9;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.footer .contact-card i {
  font-size: 2rem;
  color: #C8ACD6;
  margin-bottom: 10px;
}

.footer .contact-card:hover {
  transform: translateY(-10px);
}

.footer .footer-bottom {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #8b949e;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .header-section {
    padding: 100px 20px;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }

  .header-name {
    font-size: 2rem;
  }

  .header-title {
    font-size: 1rem;
  }

  .about-content {
    flex-direction: column;
    padding: 20px;
  }

  .about-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .about-text {
    margin-left: 0;
    max-width: 100%;
  }

  .about-details {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-details-left,
  .about-details-right {
    width: 100%;
    margin-bottom: 20px;
  }

  .download-cv-button {
    width: 100%;
    font-size: 1rem;
  }

  .skills-section h2 {
    font-size: 1.5rem;
  }

  .skills-section p {
    font-size: 0.9rem;
  }

  .skill-set {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .skill-card {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .skill-card-inner {
    width: 100%;
    height: 100%;
  }

  .services h2 {
    font-size: 1.5rem;
  }

  .services h3 {
    font-size: 1.2rem;
  }

  .footer {
    padding: 40px 20px;
  }

  .footer-title {
    font-size: 1.5rem;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .footer .social-links {
    gap: 15px;
  }

  .footer .social-link {
    font-size: 1.2rem;
  }

  .footer .contact-cards {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .footer .contact-card {
    width: 100%;
    max-width: 300px;
    padding: 15px;
  }

  .footer .contact-card i {
    font-size: 1.5rem;
  }
}
/* Small Phones Styles */
@media (max-width: 480px) {
  .header-section {
    padding: 80px 15px;
  }

  .profile-image {
    width: 100px;
    height: 100px;
  }

  .header-name {
    font-size: 1.75rem;
  }

  .header-title {
    font-size: 0.9rem;
  }

  .about-content {
    padding: 15px;
  }

  .about-image {
    margin-bottom: 15px;
  }

  .download-cv-button {
    font-size: 0.9rem;
  }

  .skills-section h2,
  .services h2,
  .footer-title {
    font-size: 1.25rem;
  }

  .skills-section p,
  .footer-description {
    font-size: 0.8rem;
  }

  .skill-card {
    width: 200px;
    height: 200px;
  }

  .services h3 {
    font-size: 1rem;
  }

  .footer {
    padding: 30px 15px;
  }

  .footer .social-link {
    font-size: 1rem;
  }

  .footer .contact-card {
    max-width: 100%;
    padding: 10px;
  }

  .footer .contact-card i {
    font-size: 1.2rem;
  }
}


</style>