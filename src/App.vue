<script setup>
import Header from "./components/AppHeader.vue";
import Aside from "./components/AppAside.vue";
import Footer from "./components/AppFooter.vue";

// import { onMounted, onUnmounted } from "vue";
// import { initTrails, destroyTrails } from "@/assets/js/cursor";

// onMounted(() => {
//   initTrails();
// });

// onUnmounted(() => {
//   destroyTrails();
// });
</script>

<template>
  <Header />
  <Aside />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
  <div id="trails-container"></div>  
</template>


<style lang="scss" scoped>
main {
  flex: 1; /* pousse le footer vers le bas */
}



/* --- Responsive --- */
@media (min-width: 1024px) {

}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}








// /* Conteneur dédié aux traînées */
// #trails-container {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   pointer-events: none; /* Empêche de bloquer les interactions */
// }



// .trace {
//   position: absolute;
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background: red;
//   box-shadow: var(--box-shadow-btn);
//   animation: fadeOut .5s linear forwards;
//   pointer-events: none; /* Empêche d’interférer avec les éléments */
// }

// @keyframes fadeOut {
//   from {
//       opacity: 1;
//       transform: scale(1);
//   }
//   to {
//       opacity: 0;
//       transform: scale(10);
//   }
// }

</style>

<style lang="scss">


.trace {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--secondary-color);
  box-shadow: var(--box-shadow-btn);
  animation: fadeOut .5s linear forwards;
  pointer-events: none; /* Empêche d’interférer avec les éléments */
}

@keyframes fadeOut {
  from {
      opacity: 1;
      transform: scale(1);
  }
  to {
      opacity: 0;
      transform: scale(10);
  }
}

</style>