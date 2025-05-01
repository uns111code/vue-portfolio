<script setup>
import YounesImg from '@/assets/img/Younes.png'
</script>

<template>
  <section id="profil" class="profil">
    <div class="accueil">
      <h1 class="title">Younes Amini</h1>
      <h4 class="text-color">Développeur Web</h4>
      <a href="assets/CV-professionnel-gris-simple.pdf" download="Younes_Amini_CV.pdf" class="links download btn">
         Télécharger mon CV</a>
    </div>
    
    <div class="logo-section">
      <div class="logo">
        <div class="img-container">
          <img :src="YounesImg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.profil {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  padding: var(--padding-mobile-components) 0;
}

.profil .logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  background-color: var(--secondary-color);
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  z-index: 2;
  .img-container {
    
    position: absolute;
    bottom: 0.5px;
    right: 8px;
    border-radius: 48%;
    border-bottom-right-radius: 43%;
    overflow-y: hidden;
    img {
    position: relative;
    top: 20px;
    height: 100%;
    width:80%;
    filter: drop-shadow(10px 10px 2px rgba(0, 0, 0, 0.571));
  }
}
}


.profil .logo-section::after,
.profil .logo-section::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: conic-gradient(
    from 0deg,
    transparent 30%,
    var(--quinary-color)
  );
  top: -5px;
  left: -5px;
  // z-index: -10;
  box-sizing: unset;
  padding: 5px;
  border-radius: 50%;
  animation: 3s spin linear infinite;
}

.profil .logo-section::before {
  filter: blur(1.5rem);
  opacity: 1;
  // z-index: -9;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.profil .accueil {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  h1 {
  font-size: 40px;
}

  h2 {
  font-size: 25px;
  padding-bottom: 2rem;
  color: var(--quaternary-color);
}
}




/* --- Responsive --- */
@media (min-width: 1024px) {
  .profil {
    height: calc(100vh - 87.2px - 18.4px);

    flex-direction: row;
  }
}

</style>
