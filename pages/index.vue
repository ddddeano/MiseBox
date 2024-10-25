<template>
  <ClientOnly>
    <div class="landing-page">
      <!-- User Section Wrapper -->
      <section v-if="currentUser" class="user-section">
        <div v-if="!!miseboxUser" class="user-info-card">
          <p class="welcome-message">👋 Welcome back, <span class="user-name">{{ miseboxUser.display_name }}</span>!</p>
          <p class="misebox-description">
            Misebox is your all-in-one platform to elevate your culinary journey. Connect with professionals, manage your profile, and unlock new opportunities in the culinary world.
          </p>
          <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="cta-button">View Your Dashboard</NuxtLink>
        </div>
        <div v-else class="signup-card">
          <p class="welcome-message">🚀 Join the Misebox Revolution!</p>
          <p class="misebox-description">
            Discover how Misebox can transform your culinary career. Sign up to connect, create, and grow within a network designed for chefs, recruiters, and culinary professionals.
          </p>
          <NuxtLink to="/auth/signup" class="cta-button">Get Started Now</NuxtLink>
        </div>
      </section>

      <!-- Next Section: Digital Portfolio -->
      <section class="portfolio-section">
        <div class="portfolio-content">
          <h2 class="portfolio-title">Never Email Your CV Again</h2>
          <p class="portfolio-description">
            Create a professional portfolio that highlights your skills and achievements, all in one place. Let opportunities find you with a streamlined digital profile.
          </p>
          <NuxtLink to="/professionals" class="portfolio-button">Build Your Portfolio</NuxtLink>
        </div>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup>
const currentUser = useCurrentUser(); // Fetch current user
const { miseboxUser } = useMiseboxUser(currentUser); // Fetch miseboxUser from custom hook
</script>

<style scoped>
/* User Section Styles */
.user-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-l);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  min-height: 300px;
  text-align: center;
}

.user-info-card, .signup-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l);
  background-color: var(--background-strong);
  border-radius: var(--radius-m);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 400px;
  width: 100%;
}

.user-info-card:hover, .signup-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3);
}

.welcome-message {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-m);
  line-height: 1.3;
}

.user-name {
  color: var(--primary);
  font-weight: var(--font-weight-bold);
}

.misebox-description {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
  line-height: var(--line-height-m);
  margin: var(--spacing-s) 0 var(--spacing-m);
  max-width: 90%;
}

.cta-button {
  padding: var(--spacing-s) var(--spacing-l);
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-medium);
  color: #fff;
  background: linear-gradient(135deg, var(--secondary), var(--tertiary));
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

.cta-button:hover {
  background: linear-gradient(135deg, var(--tertiary), var(--hover));
  transform: translateY(-3px);
}

/* Portfolio Section Styles */
.portfolio-section {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl);
  background-color: var(--background-2);
  text-align: center;
}

.portfolio-content {
  max-width: 600px;
  width: 100%;
  padding: var(--spacing-l);
  background-color: var(--background);
  border-radius: var(--radius-m);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-content:hover {
  transform: translateY(-5px);
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
}

.portfolio-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  margin-bottom: var(--spacing-s);
}

.portfolio-description {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
  line-height: var(--line-height-m);
  margin-bottom: var(--spacing-l);
}

.portfolio-button {
  padding: var(--spacing-s) var(--spacing-l);
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-medium);
  color: #fff;
  background: linear-gradient(135deg, var(--secondary), var(--primary));
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

.portfolio-button:hover {
  background: linear-gradient(135deg, var(--primary), var(--hover));
  transform: translateY(-3px);
}
</style>
