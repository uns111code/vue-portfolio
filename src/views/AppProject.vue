<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useIsMobile } from "../assets/js/useIsMobile";

const { isMobile } = useIsMobile();
// console.log(isMobile.value);

// Récupère tous les fichiers d'un dossier
const modulesDesktop = import.meta.glob("../assets/img/projects/desktop/*", {
  eager: true,
});
const modulesMobile = import.meta.glob("../assets/img/projects/mobile/*", {
  eager: true,
});

// isMobile est réactif, donc je dois utiliser un `computed` pour choisir dynamiquement :
const selectedModules = computed(() =>
  isMobile.value ? modulesMobile : modulesDesktop
);

// Transforme ça en une liste d'objets (path + nameWithoutExtension)
const filteredImages = computed(() => {
  return Object.entries(selectedModules.value).map(([path, mod]) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const nameWithoutExtension = fileName.split(".")[0];

    return {
      path: mod.default,
      nameWithoutExtension: nameWithoutExtension.toLowerCase(),
    };
  });
});

/***************************************************************************search************************************** */

const searchTerm = ref(""); // on stock la valeur de l'input de search

// Liste filtrée dynamiquement
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return filteredImages.value.filter(
    (item) => item.nameWithoutExtension.includes(term) // Recherche uniquement par le nom sans l'extension
  );
});

/************************************************btn-scroll **********************************************/

const scrollContainer = ref(null);

const scrollRight = () => {
  scrollContainer.value.scrollLeft += 300;
};

const scrollLeft = () => {
  scrollContainer.value.scrollLeft -= 300;
};

/***************************************************scroll-x *************************************************/

const handleScroll = (event) => {
  if (event.deltaY > 0) {
    console.log("Scroll vers le bas ⬇️");
    scrollContainer.value.scrollLeft += 300;
  } else {
    console.log("Scroll vers le haut ⬆️");
    scrollContainer.value.scrollLeft -= 300;
  }
};

/***************************************** grabbing scroll  ******************************************/

let isDragging = false;
let startX;
let scrollStartLeft;

const handleDragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollStartLeft = scrollContainer.value.scrollLeft;
  scrollContainer.value.style.cursor = "grabbing";
};

const handleDragging = (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  scrollContainer.value.scrollLeft = scrollStartLeft - deltaX;
};

const stopDragging = () => {
  isDragging = false;
  if (scrollContainer.value) {
    scrollContainer.value.style.cursor = "grab";
  }
};

onMounted(() => {
  window.addEventListener("wheel", handleScroll);

  // grabbing
  const container = scrollContainer.value;
  container.addEventListener("mousedown", handleDragStart);
  container.addEventListener("mousemove", handleDragging);
  container.addEventListener("mouseup", stopDragging);
  container.addEventListener("mouseleave", stopDragging);

  container.style.cursor = "grab";
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleScroll);

  const container = scrollContainer.value;
  if (container) {
    container.removeEventListener("mousedown", handleDragStart);
    container.removeEventListener("mousemove", handleDragging);
    container.removeEventListener("mouseup", stopDragging);
    container.removeEventListener("mouseleave", stopDragging);
  }
});
</script>

<template>
  <section id="portfolio" class="portfolio">
    <h2 class="title">Portfolio</h2>
    <p class="text-color">
      Ci-dessous, quelques exemples de réalisations effectuées durant la
      formation :
    </p>
    <section class="search">
      <input
        type="text"
        class="srch-input"
        v-model="searchTerm"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
          stroke-width="1"
        />
      </svg>
    </section>
    <div class="swiper">
      <i @click="scrollLeft" class="icon fa-solid fa-chevron-left"></i>
      <div
        class="items"
        ref="scrollContainer"
        :style="{ justifyContent: searchTerm !== '' ? 'center' : 'flex-start' }"
      >
        <div
          class="item-container"
          v-for="(img, index) in filteredItems"
          :key="index"
        >
          <div class="item">
            <img
              :src="img.path"
              :alt="img.nameWithoutExtension"
              draggable="false"
            />
          </div>
          <a
            class="links btn"
            :href="`https://github.com/uns111code/${img.nameWithoutExtension}`"
            >Détails</a
          >
        </div>
      </div>
      <i @click="scrollRight" class="icon fa-solid fa-chevron-right"></i>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 8rem 0;
  .search {
    padding: 0 1rem;
    svg {
      color: var(--primary-color);
      transform: translate(-130%, 25%);
    }
    .srch-input {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      font-size: 1rem;
      background: transparent;
      &:focus {
        outline: none;
        border: 1px solid var(--primary-color);
      }
    }
  }

  .swiper {
    width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;

    i {
      font-size: 2rem;
      padding: 2rem;
      cursor: pointer;
      display: none;
    }

    .items {
      padding-bottom: 0.7rem;
      display: flex;
      gap: 1rem;
      width: clamp(350px, 60vw, 80vw);
      position: relative;
      cursor: grab;
      scroll-behavior: smooth;
      cursor: grab;
      user-select: none;
      overflow-x: auto; /* Permet de défiler sans barre visible */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
      }
      .items::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
      }

      .item-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        .item {
          width: max-content;
          height: 50vh;
          flex: 0 0 auto; // important pour le scroll horizontal
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: var(--border);
          border-radius: var(--border-radius-sm);
          img {
            object-fit: contain;
            flex: 1;
            border-radius: var(--border-radius-sm);
          }
        }
      }
    }
  }
  .title + p {
    padding: 0 1rem;
  }
}

@media (min-width: 1024px) {
  .portfolio {
    padding: 0;
    height: calc(100vh - 87.2px - 18.4px);

    gap: clamp(1px, 1rem, 2rem);
    .swiper {
      .items {
        .item-container {
          .item {
            width: 13vw;
            height: 30vh;
          }
        }
      }
      i {
        display: block;
      }
    }
  }
}
</style>
