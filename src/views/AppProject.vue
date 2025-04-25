<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Récupère tous les fichiers d'un dossier
const modules = import.meta.glob('@/assets/img/projects/desktop/*');

// Transforme ça en une liste d'objets (path + nameWithoutExtension)
const filteredImages = Object.keys(modules).map(path => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1]; // récupère le nom du fichier avec l'extension
  
  // Extraire le nom sans l'extension
  const nameWithoutExtension = fileName.split('.')[0];

  return {
    path,
    nameWithoutExtension: nameWithoutExtension.toLowerCase() // on garde juste le nom sans l'extension
  };
});

/***************************************************************************search************************************** */

const searchTerm = ref(""); // on stock la valeur de l'input de search

// Liste filtrée dynamiquement
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return filteredImages.filter(item =>
    item.nameWithoutExtension.includes(term) // Recherche uniquement par le nom sans l'extension
  );
});

/************************************************btn-scroll **********************************************/

const scrollContainer = ref(null);

const scrollRight = () => {
  scrollContainer.value.scrollLeft += 300;
}

const scrollLeft = () => {
  scrollContainer.value.scrollLeft -= 300;
}

/***************************************************scroll-x *************************************************/

const handleScroll = (event) => {
  if (event.deltaY > 0) {
    console.log('Scroll vers le bas ⬇️')
    scrollContainer.value.scrollLeft += 300;
  } else {
    console.log('Scroll vers le haut ⬆️')
    scrollContainer.value.scrollLeft -= 300;
  }
}

/***************************************** grabbing scroll  ******************************************/

let isDragging = false;
let startX;
let scrollStartLeft;

const handleDragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollStartLeft = scrollContainer.value.scrollLeft;
  scrollContainer.value.style.cursor = 'grabbing';
};

const handleDragging = (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  scrollContainer.value.scrollLeft = scrollStartLeft - deltaX;
};

const stopDragging = () => {
  isDragging = false;
  if (scrollContainer.value) {
    scrollContainer.value.style.cursor = 'grab';
  }
};

onMounted(() => {
  window.addEventListener('wheel', handleScroll)

  // grabbing
  const container = scrollContainer.value;
  container.addEventListener('mousedown', handleDragStart);
  container.addEventListener('mousemove', handleDragging);
  container.addEventListener('mouseup', stopDragging);
  container.addEventListener('mouseleave', stopDragging);

  container.style.cursor = 'grab';
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)

  const container = scrollContainer.value;
  if (container) {
    container.removeEventListener('mousedown', handleDragStart);
    container.removeEventListener('mousemove', handleDragging);
    container.removeEventListener('mouseup', stopDragging);
    container.removeEventListener('mouseleave', stopDragging);
  }
})
</script>

<template>
  <section id="portfolio" class="portfolio">
    <section class="search">
      <input
        type="text"
        class="srch-input"
        v-model="searchTerm"
        placeholder="Search"
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" stroke-width="1"/>
      </svg>
    </section>
    <h2>Portfolio</h2>
    <p>Ci-dessous, quelques exemples de réalisations effectuées durant la formation :</p>
    <div class="swiper">
      <i 
        @click="scrollLeft"
        class="fa-solid fa-chevron-left"
      ></i>
      <div class="items" ref="scrollContainer" :style="{ justifyContent: searchTerm !== '' ? 'center' : 'flex-start' }">
        <div 
          class="item-container"
          v-for="(img, index) in filteredItems"
          :key="index"
        >
          <div class="item">
            <img :src="img.path" alt="image" draggable="false" />
          </div>
          <a :href="`https://github.com/uns111code/${img.nameWithoutExtension}`">Détails</a>
        </div>
      </div>
      <i 
        @click="scrollRight"
        class="fa-solid fa-chevron-right"
      ></i>
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
  .search {
  padding: 0 1rem;
  svg {
    color: var(--primary-color);
    transform: translate(-130%, 25%);
  }
  .srch-input {
    padding: .5rem 1rem;
    border-radius: 50px;
    border: 1px solid var(--border-color);
    font-size: 1rem;
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
  }



  .items {
    display: flex;
    gap: 1rem;
    width: clamp(350px, 60vw, 80vw);
    position: relative;
    cursor: grab;
    overflow: scroll;
    scroll-behavior: smooth;
    cursor: grab;
    user-select: none;
    overflow-x: auto; /* Permet de défiler sans barre visible */
    scrollbar-width: smooth; /* Cacher la barre de défilement */
    &::-webkit-scrollbar {
      display: none;
    }

    // mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
    // -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);



    .item-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 2rem;
      .item {
      width: 15rem;
      height: 15rem;
      flex: 0 0 auto; // important pour le scroll horizontal
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px solid var(--primary-color);
      border-radius: 8px;
      img {
        object-fit: contain;
        flex: 1;
      }
    }

    a {
      background-color: var(--header-color);
      padding: .5rem 2rem;
      border-radius: 8px;
      // border: 1px solid var(--primary-color);
      transition: all 0.1s ease-in-out;
      &:hover {
        background-color: var(--primary-color);
      }
    }

    }
    
  }
}
}



@media (min-width: 1024px) {
  .portfolio {
    height: 80vh;
  }
}
</style>
