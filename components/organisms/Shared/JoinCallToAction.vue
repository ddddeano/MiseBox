<template>
  <div class="join-call-to-action">
    <div class="join-call-to-action-content">
      <h2>{{ content.title }}</h2>
      <p>{{ content.description }}</p>
      <ul>
        <li v-for="(item, index) in content.features" :key="index">
          {{ item }}
        </li>
      </ul>
      <button class="cta-button" @click="onJoinClick">{{ content.buttonText }}</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true, // E.g., 'misebox', 'chef', 'professional'
    validator: (value) => ['misebox', 'chef', 'professional'].includes(value),
  },
  onJoinClick: {
    type: Function,
    required: true,
  },
});

const contentMap = {
  misebox: {
    title: 'Join the Misebox Ecosystem',
    description:
      'Take control of your professional culinary journey. Misebox brings chefs, professionals, and recruiters together to create seamless collaboration and endless opportunities.',
    features: [
      '📂 Centralize all your professional details in one place.',
      '🔍 Easily connect with employers or job seekers.',
      '📊 Access tools designed to enhance your productivity and growth.',
    ],
    buttonText: 'Get Started with Misebox',
  },
  chef: {
    title: 'Empower Your Culinary Career',
    description:
      'Whether you’re running a kitchen or building your reputation, Misebox is the ultimate toolkit to manage recipes, streamline tasks, and showcase your talent.',
    features: [
      '👨‍🍳 Create a professional chef portfolio to impress recruiters.',
      '🍴 Organize and share your recipes with your team.',
      '📅 Manage your daily tasks and kitchen workflows effortlessly.',
    ],
    buttonText: 'Join as a Chef',
  },
  professional: {
    title: 'Elevate Your Professional Journey',
    description:
      'Showcase your achievements, connect with industry leaders, and unlock opportunities that propel your career forward with Misebox.',
    features: [
      '💼 Build a digital portfolio to stand out in the job market.',
      '🌟 Grow your network by connecting with top employers.',
      '📈 Gain access to exclusive opportunities tailored to your skills.',
    ],
    buttonText: 'Join as a Professional',
  },
};

const content = contentMap[props.type];
</script>

<style scoped>
.join-call-to-action {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.join-call-to-action-content {
  max-width: 650px;
  background: var(--background);
  padding: var(--spacing-l);
  border-radius: var(--radius-m);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.join-call-to-action-content:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
}

.join-call-to-action-content h2 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-m);
}

.join-call-to-action-content p {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-m);
}

.join-call-to-action-content ul {
  text-align: left;
  margin-bottom: var(--spacing-m);
}

.join-call-to-action-content li {
  font-size: var(--font-size-m);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.cta-button {
  padding: var(--spacing-s) var(--spacing-l);
  font-size: var(--font-size-l);
  color: #fff;
  background-color: var(--primary);
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-3px);
}
</style>
