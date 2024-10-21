<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Shaping the Future of Culinary Excellence</h1>
        <p>Seamless connection between chefs, professionals, and recruiters to create the culinary revolution.</p>
        <NuxtLink to="/subscribe" class="cta-button">Start Your Journey</NuxtLink>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="about-content">
        <h2>Welcome to MiseBox 2035</h2>
        <p>The ultimate ecosystem for culinary professionals, transforming how kitchens and careers are managed.</p>
      </div>
    </section>

    <!-- Apps Section -->
    <section class="apps-section">
      <div class="app-card chef">
        <h3>Chef</h3>
        <p>Manage recipes, kitchens, and the future of culinary art in your hands.</p>
        <NuxtLink to="/chef" class="explore-button">Explore Chef</NuxtLink>
      </div>

      <div class="app-card professional">
        <h3>Professional</h3>
        <p>Build your professional profile, discover futuristic gigs, and connect with industry leaders.</p>
        <NuxtLink to="/professional" class="explore-button">Explore Professional</NuxtLink>
      </div>

      <div class="app-card recruiter">
        <h3>Recruiter</h3>
        <p>Shape the next generation of talent with advanced recruitment tools.</p>
        <NuxtLink to="/recruiter" class="explore-button">Explore Recruiter</NuxtLink>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Step Into the Future</h2>
        <p>Join the world’s first fully integrated culinary network.</p>
        <NuxtLink to="/subscribe" class="cta-button">Join Now</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const availableApps = miseboxApps.filter(app => app.isAvailable)
</script>

<style scoped lang="scss">
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  background-color: var(--background);

  /* Smooth Scroll */
  scroll-behavior: smooth;

  /* Hero Section */
  .hero-section {
    width: 100%;
    padding: 80px 20px;
    background: linear-gradient(120deg, var(--primary), var(--secondary));
    text-align: center;
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: heroFadeIn 2s ease-in-out;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: linear-gradient(90deg, var(--secondary), var(--tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textGlow 3s infinite ease-in-out;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 800px;
    }

    .cta-button {
      background-color: var(--tertiary);
      color: var(--text-primary);
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 1.2rem;
      transition: background-color 0.4s, transform 0.2s ease-in-out;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

      &:hover {
        background-color: var(--hover);
        transform: scale(1.05);
      }
    }
  }

  /* About Section */
  .about-section {
    width: 100%;
    padding: 60px 20px;
    background-color: var(--background-2);
    text-align: center;
    color: var(--text-secondary);
    transition: background-color 0.3s ease;

    h2 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.2rem;
      max-width: 700px;
      margin: 0 auto;
      margin-bottom: 1.5rem;
    }
  }

  /* Apps Section */
  .apps-section {
    width: 100%;
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: var(--background);

    .app-card {
      background: rgba(255, 255, 255, 0.07);
      border: 2px solid var(--border);
      backdrop-filter: blur(8px);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
      text-align: center;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      }

      h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }

      .explore-button {
        background-color: var(--primary);
        color: var(--text-primary);
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1.1rem;
        transition: background-color 0.4s, transform 0.2s ease-in-out;

        &:hover {
          background-color: var(--hover);
          transform: scale(1.05);
        }
      }
    }
  }

  /* Call to Action Section */
  .cta-section {
    width: 100%;
    padding: 80px 20px;
    background-color: var(--background-strong);
    text-align: center;
    color: var(--text-primary);
    transition: background-color 0.3s ease;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    p {
      font-size: 1.3rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      background-color: var(--secondary);
      color: var(--text-primary);
      padding: 14px 28px;
      border-radius: 10px;
      font-size: 1.2rem;
      transition: background-color 0.4s, transform 0.2s ease-in-out;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

      &:hover {
        background-color: var(--hover);
        transform: scale(1.05);
      }
    }
  }

  /* Animations */
  @keyframes heroFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 10px var(--secondary), 0 0 20px var(--tertiary), 0 0 30px var(--primary);
    }
    50% {
      text-shadow: 0 0 20px var(--tertiary), 0 0 30px var(--secondary), 0 0 40px var(--primary);
    }
  }

  /* Responsive Styles */
  @media (min-width: 768px) {
    .hero-section {
      padding: 100px 20px;

      h1 {
        font-size: 3.5rem;
      }

      p {
        font-size: 1.4rem;
      }

      .cta-button {
        font-size: 1.4rem;
        padding: 16px 32px;
      }
    }

    .about-section {
      h2 {
        font-size: 2.8rem;
      }

      p {
        font-size: 1.3rem;
      }
    }

    .apps-section {
      flex-direction: row;
      justify-content: space-around;

      .app-card {
        width: 30%;
        padding: 40px;

        h3 {
          font-size: 2rem;
        }

        p {
          font-size: 1.3rem;
        }

        .explore-button {
          font-size: 1.2rem;
          padding: 12px 24px;
        }
      }
    }

    .cta-section {
      h2 {
        font-size: 2.8rem;
      }

      p {
        font-size: 1.5rem;
      }

      .cta-button {
        font-size: 1.4rem;
        padding: 16px 32px;
      }
    }
  }
}
</style>
