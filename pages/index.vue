<template>
  <div class="home index">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to MiseBox</h1>
        <p>Your central hub for managing culinary professionals and services.</p>
        <NuxtLink to="/subscribe" class="cta-button">Get Started</NuxtLink>
      </div>
    </section>

    <section class="apps-showcthase">
      <div
        class="app-card chef"
        v-for="app in availableApps"
        :key="app.doc"
      >
        <div class="app-content">
          <h2>{{ app.welcome }}</h2>
          <p class="motto">{{ app.mottoOne }}</p>
          <p class="motto">{{ app.mottoTwo }}</p>
          <NuxtLink :to="`/${app.collection}`" class="explore-button">Explore {{ app.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>Join the MiseBox Community</h2>
      <p>Connect with professionals, manage your profiles, and grow your network.</p>
      <NuxtLink to="/subscribe" class="cta-button">Subscribe Now</NuxtLink>
    </section>
  </div>
</template>

<script setup>
const availableApps = miseboxApps.filter(app => app.isAvailable)
</script>

<style scoped lang="scss">
.home.index {
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;

  .hero-section {
    padding: 20px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .hero-content {
      width: 100%;

      h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .cta-button {
        display: inline-block;
        background-color: var(--primary);
        color: var(--text-primary);
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        font-size: 1rem;
        transition: background-color 0.3s;

        &:hover {
          background-color: var(--secondary);
          color: var(--text-secondary);
        }
      }
    }
  }

  .apps-showcase {
    padding: 20px;
    background-color: var(--background-2);
    display: flex;
    flex-direction: column;
    gap: 20px;

    .app-card {
      background-color: var(--background);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px var(--shadow);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

      &.chef {
        background-color: #FF6B6B;
        border-color: #FF4C4C;
      }

      &.professional {
        background-color: #4ECDC4;
        border-color: #3CBABA;
      }

      &.recruiter {
        background-color: #FFE66D;
        border-color: #FFD93D;
      }

      &.kitchen {
        background-color: #556270;
        border-color: #445566;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px var(--shadow);
      }

      .app-content {
        text-align: center;

        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .motto {
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .explore-button {
          display: inline-block;
          background-color: var(--primary);
          color: var(--text-primary);
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          font-size: 0.95rem;
          transition: background-color 0.3s;

          &:hover {
            background-color: var(--secondary);
            color: var(--text-secondary);
          }
        }
      }
    }
  }

  .cta-section {
    padding: 20px;
    background-color: #4B47A6;
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .cta-button {
      display: inline-block;
      background-color: var(--hover);
      color: var(--text-primary);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: var(--secondary);
        color: var(--text-secondary);
      }
    }
  }

  @media (min-width: 768px) {
    .hero-section {
      .hero-content {
        h1 {
          font-size: 3rem;
        }

        p {
          font-size: 1.2rem;
        }

        .cta-button {
          font-size: 1.1rem;
          padding: 12px 24px;
        }
      }
    }

    .apps-showcase {
      gap: 30px;

      .app-card {
        padding: 30px;

        .app-content {
          h2 {
            font-size: 2rem;
          }

          .motto {
            font-size: 1.1rem;
          }

          .explore-button {
            font-size: 1rem;
            padding: 10px 20px;
          }
        }
      }
    }

    .cta-section {
      padding: 40px;

      h2 {
        font-size: 2.5rem;
      }

      p {
        font-size: 1.2rem;
      }

      .cta-button {
        font-size: 1.1rem;
        padding: 12px 24px;
      }
    }
  }
}
</style>
