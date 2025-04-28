<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const displayedRoutes = router.options.routes


const navPosition = () => {
  const root = document.querySelector("body");

  if (route.path === "/") {
    root.style.setProperty("--nav-position", "0");
  } else if (route.path === "/about") {
    root.style.setProperty("--nav-position", "1");
  } else if (route.path === "/competence") {
    root.style.setProperty("--nav-position", "2");
  } else if (route.path === "/project") {
    root.style.setProperty("--nav-position", "3");
  } else if (route.path === "/contact") {
    root.style.setProperty("--nav-position", "4");
  }
};

//  surveiller l'url
watch(
  () => route.path,
  () => {
    navPosition();
  },
);

// Appeler une fois au démarrage
navPosition();


const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Fonction pour retourner une icône selon le nom de la route
function getIconClass(name) {
  switch (name) {
    case 'home':
      return 'fa-solid fa-house'
    case 'about':
      return 'fa-solid fa-user'
    case 'competence':
      return 'fa-solid fa-shapes'
    case 'project':
      return 'fa-solid fa-bars-progress'
    case 'contact':
      return 'fa-solid fa-phone fa-shake'
    default:
      return 'fa-solid fa-circle-question'
  }
}


onMounted(() => {
  document.querySelectorAll("main, .item").forEach((el) => {
    el.addEventListener('click', () => {
      isOpen.value = false;
    });
  });
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
      <h2 class="icon">YA</h2>
    </RouterLink>
  <ul 
    class="navigation nav-items"
    :class="isOpen ? 'open' : ''"
    >
      <div class="hori-selector">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <li v-for="li in displayedRoutes" :key="li.name" class="item">
          <RouterLink :to="li.path">
            <i class="nav-icon icon" :class="[getIconClass(li.name), li.name]"  :style="{ display: route.name !== li.name || isOpen ? 'block' : 'none' }"></i
            >
            <span class="nav-label icon" :class="li.name" :style="{ display: route.name === li.name || isOpen ? 'block' : 'none' }">{{ li.name.toUpperCase() }}</span>
              
          </RouterLink>
      </li>

      <!-- <li>
        <RouterLink class="links" to="/" @click="toggleMenu">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/about" @click="toggleMenu">Profil</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/competence" @click="toggleMenu">Compétences</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/project" @click="toggleMenu">Projets</RouterLink>
      </li>
      <li>
        <RouterLink class="links" to="/contact" @click="toggleMenu">Contact</RouterLink>
      </li> -->
  </ul>
  </nav>
  </header>
</template>

<style lang="scss" scoped>
.logo {
  height: 82.4px;
  width: 82.4px;
  h2 {
    font-family: "Rubik Dirt", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 4rem;
  }
}


header {
  background-color: var(--tertiary-color);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem 1rem 0.5rem;
    position: relative;
    // border: 1px solid var(--border-color);
    // border-bottom-right-radius: 8px;
    // border-bottom-left-radius: 8px;
    // &:hover {
    //   border: 1px solid var(--primary-color);
    // }
}

.navigation {
    position: absolute;
    top: 100%;
    left: -100%;
    transform: translateX(-50%);
    transition: left .6s ease;
    width: 100%;
    text-align: center;
    z-index: 10;
    background-color: var(--tertiary-color);

    // background-color: var(--tertiary-color);
    // color: var(--quaternary-color);
    .item {
      a {
        display: flex;
        gap: .5rem;
        padding-left: 3rem;
      }
    }

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

  // header {
  //   background-color: var(--tertiary-color);
  // }

  nav {
    padding: 0;
    margin: 0 auto;
    width: clamp(350px, 90vw, 100rem);
  }
  .navbar-burger {
    display: none;
  }

  .navigation {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    z-index: 10;
    width: max-content;
    display: flex;
    gap: 2rem;
    background-color: inherit;
    li {
      width: 8rem;
      text-align: center;
    }
    .item {
      a {
        display: inline;
        padding: 1rem;
      }
    }

}

header .hori-selector{
    
    display:inline-block;
    position:absolute;
    height: 75px;
    width: 128px;
    bottom: 0;
    
    left: calc(20.7% * var(--nav-position));
    
    transition-duration:0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    background-color: var(--secondary-color);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    z-index: -10;
  }
  .hori-selector .right,
  .hori-selector .left{
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: var(--secondary-color);
    bottom: 0px;
  }
  .hori-selector .right{
    right: -25px;
  }
  .hori-selector .left{
    left: -25px;
  }
  .hori-selector .right:before,
  .hori-selector .left:before{
    content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--tertiary-color);
  }
  .hori-selector .right:before{
    bottom: 0;
      right: -25px;
  }
  .hori-selector .left:before{
    bottom: 0;
      left: -25px;
  }



//   .nav-label {
//   color: var(--primary-color);
// }

// .nav-icon {
//   color: var(--secondary-color);
// }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>