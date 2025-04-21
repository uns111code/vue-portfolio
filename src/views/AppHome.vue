<script setup>
</script>

<template>
    <section id="profil" class="profil">
        <div class="accueil">
          <h1>Younes Amini</h1>
          <h4>Développeur Web</h4>
        </div>
        <div class="logo-section">
          <div class="logo">
            <img src="../assets/img/YA logo.png" alt="">
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
    gap: 2rem;
}

.profil .logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  background-color: var(--tertiary-color);
  position: relative;
  border-radius: 50%;
}

.logo{
  img {
    transition: var(--transition);
    filter: hue-rotate(250deg); /* 90deg ≈ vert */
    border-radius: 50%;
    height: 10rem;
    width: 10rem;
  }
}


.logo-section:hover .logo img {
  filter: hue-rotate(0deg);
  transform: rotateY(360deg);
}


 
 .profil .logo-section::after, .profil .logo-section::before {
   content: '';
   position: absolute;
   height: 100%;
   width: 100%;
   background-image: conic-gradient(from 0deg ,transparent 30%, var(--secondary-color));
   top: -6px;
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







.profil .accueil h1 {
  font-size: 40px;
  color: var(--quaternary-color);
  text-shadow: var(--text-shadow);
  line-height: 5rem;
}

h2 {
  font-size: 25px;
  padding-bottom: 2rem;
}





/* --- Responsive --- */
@media (min-width: 1024px) {
  .profil {
    height: 80vh;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>