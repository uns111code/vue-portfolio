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
  <nav>
    <button
      :class="isOpen ? 'navbar-burger open' : 'navbar-burger'"
      @click="toggleMenu"
    >
      <span class="navbar-burger-bar"></span>
    </button>
    <RouterLink to="/" class="logo">
      <h2 class="logo-title">YA</h2>
    </RouterLink>
  <ul 
    class="navigation nav-items"
    :class="isOpen ? 'open' : ''">
    
      <li>
        <RouterLink class="links" to="/">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/">Compétences</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/">Projets</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/contact">Contact</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/about">About</RouterLink>
      </li>
    
  </ul>
  </nav>
  </header>
</template>

<style lang="scss" scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem 1rem 0.5rem;
    position: relative;
}

.navigation {
    position: absolute;
    top: 100%;
    left: -100%;
    transform: translateX(-50%);
    transition: left .6s ease;
    background: var(--secondary-color);
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    z-index: 10;
     li,
     li a {
        padding: 1rem 0;
    }

}

.open {
  left: 50%;
}



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
    top: -.8rem;
}

.navbar-burger-bar::after {
    position: absolute;
    top: .8rem;
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




/* --- Responsive --- */
@media (min-width: 1024px) {
  nav {
    padding: 1rem 2rem;
  }
  .navbar-burger {
    display: none;
  }

  .navigation {
    position: static;
    transform: none;
    z-index: 10;
    width: max-content;display: flex;
    .nav-items li a {
        padding: 1rem 3rem;
    }

}
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>