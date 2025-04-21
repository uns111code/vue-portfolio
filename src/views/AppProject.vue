<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const tabeauObj = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
  {
    id: "8",
  },
  {
    id: "9",
  },
  {
    id: "10",
  },
];

/***************************************************************************search************************************** */

const searchTerm = ref(""); // on stock la valeur de l'input de search

//  Liste filtrée dynamiquement
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return tabeauObj.filter(item =>
    item.id.toString().includes(term)
  );
});


const items = computed(() => {
  // Si le champ de recherche est vide, dupliquer les éléments
  // if (searchTerm.value === "") {
  //   return [...filteredItems.value, ...filteredItems.value];
  // }
  // Sinon, juste retourner les éléments filtrés
  return filteredItems.value;
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
  // scrollContainer.value?.removeEventListener('wheel', handleScroll)


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
  container.removeEventListener('mousedown', handleDragStart);
  container.removeEventListener('mousemove', handleDragging);
  container.removeEventListener('mouseup', stopDragging);
  container.removeEventListener('mouseleave', stopDragging);
})
</script>

<template>
  <section id="portfolio" class="portfolio">
    <section class="search">
    <input
      type="text"
      class="srch-input"
      v-model="searchTerm"
      placeholder=" Search"
    />
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
        d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" stroke-width="1"/>
    </svg>
  </section>
    <h2>Portfolio</h2>
    <p>
      Ci-dessous, quelques exemples de réalisations effectuées durant la
      formation :
    </p>
    <div class="swiper">
      <i 
        @click="scrollLeft"
        class="fa-solid fa-chevron-left"
        ></i>
      <div class="items"  ref="scrollContainer">
        <div 
          class="item" 
          v-for="item in items"
          :key="item.id"
          >
          id {{ item.id }}
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
    color: black;
    transform: translate(-130%, 25%);
  }
  .srch-input {
    padding: .5rem 1rem;
    border-radius: 50px;
    border: 1px solid var(--quaternary-color);
    font-size: 1rem;
    &:focus {
        outline: none;
        border: 1px solid var(--secondary-color);
      }
  }
}


  .swiper {
  background-color: aquamarine;
  width: 100vw;
  height: 40vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 2rem;
    padding: 2rem;
    cursor: pointer;
  }



  .items {
    display: flex;
    align-items: center;
    background-color: bisque;
    height: 80%;
    gap: 1rem;
    width: 1000px;
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

    mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);




    .item {
      background-color: burlywood;
      padding: 100px;
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
