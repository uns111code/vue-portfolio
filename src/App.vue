<script setup>
import Header from "./components/AppHeader.vue";
import Aside from "./components/AppAside.vue";
import Footer from "./components/AppFooter.vue";

import { onMounted, onUnmounted } from "vue";
import { initTrails, destroyTrails } from "./assets/js/cursor.js";

onMounted(() => {
  initTrails();
});

onUnmounted(() => {
  destroyTrails();
});
</script>

<template>
  <Header />
  <Aside />

  <main>

    <svg
    class="bg-svg-top"
    width="467"
    height="1035"
    viewBox="0 0 467 1035"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 0.0565866L466.5 0.0565867C466.5 0.0565867 414.5 -4.94341 370.5 79.0566C326.5 163.057 306.5 302.057 207.5 357.557C108.5 413.057 89.5 493.057 45 708.557C0.5 924.057 16.5 987.057 11 1006.56C5.5 1026.06 0 1034.06 0 1034.06V0.0565866Z"
      fill="var(--tertiary-color)"
    />
   
  </svg>
    <router-view v-slot="{ Component }">
      <transition name="menu-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="var(--tertiary-color)"
            opacity="0.1"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="var(--tertiary-color)"
            opacity="0.3"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="var(--tertiary-color)"
            opacity="0.6"
          />
          <use 
              xlink:href="#gentle-wave" 
              x="48" y="7" 
              fill="var(--tertiary-color)" 
              opacity="1"
              />
        </g>
      </svg>
  </main>
  <Footer />

</template>

<style lang="scss" scoped>


/* -----------------transittion vue --------------------*/

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: transform 0.8s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  transform: translateX(100%);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  transform: translateX(0);
}

/* ************************************* cursor ********************************/

/* --- Responsive --- */
@media (min-width: 1024px) {
  .menu-fade-enter-from,
  .menu-fade-leave-to {
    transform: translateY(100%);
  }

  .menu-fade-enter-to,
  .menu-fade-leave-from {
    transform: translateY(0);
  }
}

</style>














<style lang="scss">
main {
  position: relative;
  min-height: calc(100vh - 15vh - 87.2px);
  background-color: var(--secondary-color);
}
.trace {
  position: absolute;
  width: 4rem;
  height: 4rem;
  z-index: 100;
  border-radius: 50%;

  border: 1px solid var(--primary-color);
  pointer-events: none; /* Empêche d’interférer avec les éléments */
}

.trace-click {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary-color);
  pointer-events: none;
  opacity: 0.6;
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeOut {
  from {
    opacity: 0.6;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}



.bg-svg-top {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 400px; /* prend toute la hauteur du parent */
  width: clamp(
    180px,
    15vw,
    467px
  ); /* adaptatif : min 200px, idéal 30vw, max 467px */
  z-index: -1;
  pointer-events: none; /* optionnel : ne bloque pas les clics */
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.197));
}

.waves {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 15vh;
  // margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;

}

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .trace,
  .trace-click {
    display: none;
  }
}
</style>
