<script setup>
// Récupère tous les fichiers d'un dossier
const modules = import.meta.glob('@/assets/img/langs-logos/*');



// Transforme ça en une liste d'objets (ou juste les paths)
const images = Object.keys(modules);



</script>

<template>
  <section id="competences">
    <article>
      <h2 class="title">Compétences</h2>
      <p>
        Développeur full-stack passionné, je maîtrise les bases solides de HTML,
        CSS, JavaScript ainsi que le framework Vue.js, afin de créer des
        interfaces modernes et dynamiques. Côté back-end, je développe en PHP
        avec Symfony, en veillant à la sécurité et à la performance. Je gère les
        bases de données SQL, la conception UI/UX via Figma, et je collabore
        efficacement en équipe grâce à Git.
      </p>
      <p>
        Mes compétences sont en constante évolution, car la joie que je trouve
        dans ce métier vient justement du fait qu’on en apprend tous les jours —
        surtout en étant impliqué, curieux et passionné.
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
  gap: 5rem;
  text-align: center;
  width: clamp(350px, 60vw, 80vw);
  margin: 0 auto;
  padding: clamp(1rem, 2.5rem, 8rem) 1rem;

  h2 {
    padding: 2rem 0;
  }

  .banner {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 6rem;
    mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);

    .slider {
      display: flex;
      gap: 2rem;
      width: max-content;
      animation: scroll 20s linear infinite;

      .lang-logo {
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 100%;
          height: auto;
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
    height: 80vh;
  }
}
</style>
