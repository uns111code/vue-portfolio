<script setup>
import { ref, watch } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// désactiver/activer le scroll en fonction de l'état du menu
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'; // empêche le scroll
  } else {
    document.body.style.overflow = ''; // réactive le scroll
  }
});
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">
      <h2 class="logo-title">Mon Logo</h2>
    </RouterLink>
  <transition name="menu-fade">
  <nav class="navigation">
    <ul class="nav-items">
      <li>
        <RouterLink class="links" to="/">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/contact">Contact</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/about">About</RouterLink>
      </li>
    </ul>
  </nav>
</transition>
  <button
      :class="isOpen ? 'navbar-burger open' : 'navbar-burger'"
      @click="toggleMenu"
    >
      <span class="navbar-burger-bar"></span>
    </button>
  </header>
</template>

<style lang="scss" scoped>

/* ---------------------- burger menu -------------------- */
.navbar-burger {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 1rem;
}

.navbar-burger .navbar-burger-bar {
  width: 1.5rem;
}

.navbar-burger-bar,
.navbar-burger-bar::before,
.navbar-burger-bar::after {
    position: relative;
    content: "";
    display: block;
    width: 3rem;
    height: .4rem;
    background: var(--primary-color);
    transition: all 0.3s ease-in;
}

.navbar-burger-bar::before {
    position: absolute;
    top: -1rem;
}

.navbar-burger-bar::after {
    position: absolute;
    top: 1rem;
}



.navbar-burger.open .navbar-burger-bar {
    background: transparent;
}

.navbar-burger.open .navbar-burger-bar::after,
.navbar-burger.open .navbar-burger-bar::before {
    top: 0;
}

.navbar-burger.open .navbar-burger-bar::after {
    transform: rotate(45deg);
}

.navbar-burger.open .navbar-burger-bar::before {
    transform: rotate(-45deg);
}







/* -----------------transittion vue --------------------*/

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}


/* --- Responsive --- */
@media (min-width: 1024px) {

}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>