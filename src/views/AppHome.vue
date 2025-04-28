<script setup></script>

<template>
  <section id="profil" class="profil">
    <div class="accueil">
      <h1 class="title">Younes Amini</h1>
      <h4>Développeur Web</h4>
      <a href="assets/CV-professionnel-gris-simple.pdf" download="Younes_Amini_CV.pdf" class="links download btn">
        <!-- <i class="icon fa-solid fa-download"></i> -->
         Télécharger mon CV</a>
    </div>
    
    <div class="logo-section">
      <div class="logo">
        <img src="../assets/img/Younes.png" alt="" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// .test {
//   position: absolute;
//   top: 50%;
//   left: 30%;
// }
// .test2 {
//   position: absolute;
//   top: 62%;
//   left: 30%;
// }







.profil {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  height: 80vh;
}

.profil .logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 15rem;
  background-color: var(--secondary-color);
  position: relative;
  border-radius: 50%;
}

.logo {
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
  z-index: -10;
  box-sizing: unset;
  padding: 5px;
  border-radius: 50%;
  animation: 3s spin linear infinite;
}

.profil .logo-section::before {
  filter: blur(1.5rem);
  opacity: 1;
  z-index: -9;
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
  // color: var(--primary-color);
  // text-shadow: var(--text-shadow);
}

// .btn {
//       // background-color: var(--primary-color);
//       // padding: .5rem 1rem;
//       // width: fit-content;
//       // border-radius: 8px;
//       // border: 1px solid var(--primary-color);
//       // transition: all 0.1s ease-in-out;
//       // &:hover {
//       //   background-color: var(--tertiary-color);
//       // }
// }

  h2 {
  font-size: 25px;
  padding-bottom: 2rem;
  color: var(--quaternary-color);
}
}




/* --- Responsive --- */
@media (min-width: 1024px) {
  .profil {
    height: 80vh;
    flex-direction: row;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
</style>
