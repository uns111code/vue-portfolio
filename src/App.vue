<script setup>
import Header from "./components/AppHeader.vue";
import Aside from "./components/AppAside.vue";
import Footer from "./components/AppFooter.vue";

import { onMounted, onUnmounted } from "vue";
import { initTrails, destroyTrails } from "@/assets/js/cursor";

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
      fill="url(#paint0_linear_19_12)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_19_12"
        x1="71.5"
        y1="9.39302e-07"
        x2="233.25"
        y2="1034.06"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="var(--tertiary-color)" />
        <stop offset="0.660527" stop-color="var(--tertiary-color)" />
        <stop offset="1" stop-color="var(--primary-color)" />
      </linearGradient>
    </defs>
  </svg>
    <router-view v-slot="{ Component }">
      <transition  name="menu-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <Footer />

  <svg
    class="bg-svg-bottom"
    width="476"
    height="363"
    viewBox="0 0 476 363"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M475.716 167.756L475.716 0L359.716 185.756C359.716 185.756 345.216 213.256 314.216 279.256C283.216 345.256 253.216 369.756 253.216 369.756L0.216287 369.756C0.216287 369.756 129.716 257.756 253.216 248.256C376.716 238.756 310.716 234.756 372.216 220.756C433.716 206.756 475.716 167.756 475.716 167.756Z"
      fill="url(#paint0_linear_19_16)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_19_16"
        x1="269.188"
        y1="-43.5963"
        x2="263.812"
        y2="465.596"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0348554" stop-color="var(--tertiary-color)" />
        <stop offset="0.532145" stop-color="var(--tertiary-color)" />
        <stop offset="0.870494" stop-color="var(--primary-color)" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
main {
  flex: 1; /* pousse le footer vers le bas */
  position: relative;
}

.bg-svg-top {
  position: absolute;
  top: 0;
  left: 0;
  height: 400px; /* prend toute la hauteur du parent */
  width: clamp(180px, 15vw, 467px); /* adaptatif : min 200px, idéal 30vw, max 467px */
  z-index: -1;
  pointer-events: none; /* optionnel : ne bloque pas les clics */
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.197));
}

.bg-svg-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -999;
  background: linear-gradient();
  path {
    // fill: var(--tertiary-color); 
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.418));
  }
 
}

/* -----------------transittion vue --------------------*/

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: transform .8s ease;
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

.trace {
  position: absolute;
  width: 4rem;
  height: 4rem;
  z-index: 100;
  border-radius: 50%;
  // background: var(--primary-color);
  // box-shadow: var(--box-shadow-btn);
  border: 1px solid var(--primary-color);
  // animation: fadeOut 0.5s linear forwards;
  pointer-events: none; /* Empêche d’interférer avec les éléments */
}


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
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
</style>

<style lang="scss">





</style>
