<script setup>
import { ref } from "vue";

const images = ref([]);
// Récupère tous les fichiers d'un dossier
const modules = import.meta.glob("/src/assets/img/langs-logos/*", {
  eager: true,
});

images.value = Object.entries(modules).map(([path, mod]) => mod.default);
</script>

<template>
  <section id="competences">
    <article>
      <h2 class="title">Compétences</h2>
      <p class="text-color">
        Développeur full-stack passionné, je conçois et réalise des applications
        web modernes et performantes. Je maîtrise les bases solides de HTML,
        CSS, JavaScript ainsi que le framework Vue.js, pour créer des interfaces
        dynamiques, intuitives et responsive. Côté back-end, je développe avec
        PHP et le framework Symfony, en mettant l’accent sur la sécurité, la
        performance et les bonnes pratiques de développement. Je gère
        efficacement les bases de données MySQL et j’intègre des services
        externes tels que Stripe pour les paiements sécurisés ou AWS pour le
        déploiement et l’hébergement cloud. Je conçois des sites e-commerce
        complets, avec une attention particulière portée à l’expérience
        utilisateur (UI/UX) via Figma. Pour le design et la mise en page,
        j’utilise Bootstrap, Tailwind CSS et SCSS afin d’assurer un rendu
        professionnel et responsive. J’ai également une bonne maîtrise de Git
        pour la gestion de version et le travail collaboratif.
      </p>
      <p class="text-color">
        Mes compétences sont en constante évolution, car la passion que j’ai
        pour ce métier vient du plaisir d’apprendre chaque jour, d’expérimenter
        et de progresser au contact de nouveaux défis.
      </p>
    </article>
    <div class="banner">
      <div class="slider">
        <div
          class="lang-logo"
          v-for="(src, index) in [...images, ...images]"
          :key="index"
        >
          <img :src="src" alt="image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#competences {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--padding-mobile-components) 2rem;
  gap: 5rem;
  p {
    width: clamp(300px, 60vw, 80vw);
  }

  h2 {
    padding: 2rem 0;
  }

  .banner {
    overflow: hidden;
    position: relative;
    align-self: center;
    width: clamp(300px, 60vw, 1000px);
    height: 6rem;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 30%,
      black 70%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 30%,
      black 70%,
      transparent 100%
    );

    .slider {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: max-content;
      animation: scroll 20s linear infinite;

      .lang-logo {
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0;

        img {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 0 1px rgb(255, 255, 255));
        }
      }
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (min-width: 1024px) {
  #competences {
    padding: 0;
    gap: clamp(10px, 10vh, 5rem);
    height: calc(100vh - 87.2px - 18.4px);
  }
}
</style>
