<script setup></script>

<template>
  <section class="bio">
    <h2 class="title">A Propos de moi</h2>
    <p class="text-color">
      Je m'appelle Younes Amini, diplômé d’un Bac +2 en Développement Web et Web
      Mobile. Au cours de cette formation, j’ai acquis des
      compétences solides en programmation, conception d’interfaces web et
      gestion de projets numériques. Passionné par le développement web, j’aime
      concevoir des applications modernes, performantes et centrées sur
      l’utilisateur. Je maîtrise les technologies front-end et back-end telles
      que HTML, CSS, JavaScript, PHP, Symfony, Vue.js, MySQL et Docker.
      Aujourd’hui, j’exerce en tant que développeur web freelance, ce qui me
      permet de collaborer sur différents projets et de mettre mes compétences
      au service d’entreprises et de particuliers. Autonome, curieux et
      rigoureux, j’apprends rapidement de nouveaux outils et j’aime relever des
      défis techniques. Mon objectif est de continuer à évoluer dans un
      environnement stimulant et innovant, tout en développant des solutions web
      de qualité.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.bio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  text-align: center;
  min-height: calc(100vh - 114.4px - 87.57);

  padding: var(--padding-mobile-components) 2rem;
  h2 {
    padding: 2rem 0;
  }

  p {
    width: clamp(300px, 60vw, 80vw);
    margin-bottom: 5rem;
  }
}

/* --- Responsive --- */
@media (min-width: 1024px) {
  .bio {
    height: calc(100vh - 87.2px - 18.4px);
    padding: 0;
  }
}
</style>
