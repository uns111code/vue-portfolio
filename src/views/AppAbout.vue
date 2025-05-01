<script setup>
</script>

<template>
    <section class="bio">
        <h2 class="title">A Propos de moi</h2>
        <p class="text-color">
          Je m'appelle Younes Amini, et je suis actuellement en formation de
          développeur web chez CCI-Formation, où je développe mes compétences en
          programmation, design web et gestion de projets numériques. À la fin
          de ma formation, en octobre 2025, je serai titulaire d’un Bac +2 en
          développement web. Je suis passionné par le développement web et j'ai
          une grande envie de contribuer à des projets concrets qui me
          permettent d'apprendre et de progresser. Mon objectif est de rejoindre
          une équipe dynamique pour mon stage de fin de formation, prévu du 2
          juin 2025 au 1er août 2025, où je pourrais mettre à profit mes
          compétences tout en continuant à me perfectionner dans le domaine. Je
          suis une personne motivée, curieuse et autonome, avec une capacité à
          m'adapter rapidement à de nouveaux outils et environnements de
          travail. Je suis à la recherche d'une entreprise où je pourrais
          apporter ma passion pour le développement web,
          tout en acquérant une expérience précieuse pour la suite de ma
          carrière.
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