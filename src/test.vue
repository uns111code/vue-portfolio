<script setup>
import { ref, computed, onBeforeMount, onMounted, onUnmounted, nextTick } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

const books = ref([]); // on stock la valeur de la fontion fetchAllbooks

const searchTerm = ref(""); // on stock la valeur de l'input de search

const apiBaseUrl = 'http://localhost:3000/books';
const fetchUrl = ref('http://localhost:3000/books?page=1&perPage=');

async function fetchAllbooks() {                 // on récupere les books
  try {
    const response = await fetch(fetchUrl.value);
    const data = await response.json();
    books.value = data;              // on stock les data(books) que on a récuperé dans ref de books
  } catch (error) {
    console.error('Erreur lors de la récupération des livres', error);
  }
}




//  Liste filtrée dynamiquement
const filteredBooks = computed(() => {
  const term = searchTerm.value.toLowerCase();  // On prend le terme de recherche en minuscules
  return books.value.filter(book =>
    book.title.toLowerCase().includes(term) ||  // Vérifier si le titre du livre contient le terme de recherche
    book.author.firstName.toLowerCase().includes(term) ||  // Vérifier si le prénom de l'auteur contient le terme de recherche
    book.author.lastName.toLowerCase().includes(term)  // Vérifier si le nom de l'auteur contient le terme de recherche
  );
});


const duplicatedBooks = computed(() => [...filteredBooks.value, ...filteredBooks.value]);


// const btnSlide = () => {
 
// };
const scrollContainer = ref(null);

const btnSlideRight = () => {
  const container = scrollContainer.value;
  if (!container) return;

  const half = container.scrollWidth / 2;
  container.scrollLeft += 300;

  if (container.scrollLeft >= half * 1.5) {
    container.scrollLeft -= half;
  }
};

const btnSlideLeft = () => {
  const container = scrollContainer.value;
  if (!container) return;

  const half = container.scrollWidth / 2;
  container.scrollLeft -= 300;

  if (container.scrollLeft <= half * 0.5) {
    container.scrollLeft += half;
  }
};


onBeforeMount(async () => {
  await fetchAllbooks();
});








let scrollCount = 0;
let resetTimeout;

const handleScroll = (event) => {
  if (!scrollContainer.value) return;

  event.preventDefault();
  const container = scrollContainer.value;

  const direction = Math.sign(event.deltaY);
  const scrollAmount = Math.min(Math.abs(event.deltaY) * 5, 1000);

  container.scrollLeft += direction * scrollAmount;

  const half = container.scrollWidth / 2;

  // rebouclage fluide
  if (container.scrollLeft >= half * 1.5) {
    container.scrollLeft -= half;
  }
  if (container.scrollLeft <= half * 0.5) {
    container.scrollLeft += half;
  }
};








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
  window.addEventListener('wheel', handleScroll, { passive: false });

  const container = scrollContainer.value;
  container.addEventListener('mousedown', handleDragStart);
  container.addEventListener('mousemove', handleDragging);
  container.addEventListener('mouseup', stopDragging);
  container.addEventListener('mouseleave', stopDragging);

  container.style.cursor = 'grab';

  nextTick(() => {
    setTimeout(() => {
      if (container) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    }, 100);
  });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);

  const container = scrollContainer.value;
  container.removeEventListener('mousedown', handleDragStart);
  container.removeEventListener('mousemove', handleDragging);
  container.removeEventListener('mouseup', stopDragging);
  container.removeEventListener('mouseleave', stopDragging);
});
</script>

<template>
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

  <section class="slider">
    <svg @click="btnSlideLeft" class="swipper" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path stroke="#fff" d="M39.583 43.75L29.167 25L39.583 6.25"/>
        <path stroke="#fff" d="M39.583 6.25h-18.75L10.417 25l10.416 18.75h18.75"/>
      </g>
    </svg>
    <section class="books-list" ref="scrollContainer">
    <article
      v-for="book in duplicatedBooks"
      :key="book._id + Math.random()"
      class="article"
    >
      <div class="book">
        <div class="img-container">
          <img :src="book.coverUri" alt="Couverture du livre" draggable="false" />
        </div>
        <div class="details-container">
            <div>Author: {{ book.author.firstName }} {{ book.author.lastName }}</div>
            <h2>{{ book.title }}</h2>
        </div>
        <div class="btn-book">
          <button class="update">
            <a href="#`">Update</a>
          </button>
        </div>
      </div>
    </article>
  </section>
  <svg @click="btnSlideRight"   class="swipper" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path stroke="#fff" d="M10.417 6.25L20.833 25L10.417 43.75"/>
      <path stroke="#fff" d="M10.417 43.75h18.75L39.583 25L29.167 6.25h-18.75"/>
    </g>
  </svg>
  </section>
</template>

<style scoped>
.search {
  text-align: right;
  position: relative;
  padding: 0 1rem;
  svg {
    color: black;
    position: absolute;
    transform: translate(-120%, 20%);
  }
  .srch-input {
    padding: .5rem 1rem;
    border-radius: 50px;
    border: none;
    font-size: 1rem;
  }
}


.title {
  font-size: 1rem;
  color: white;
  h1 {
    font-size: 3rem;
  }
}

.slider {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
}



.books-list {
  display: flex;
  gap: 1rem;
  padding-top: 3rem;
  width: clamp(250px, 80vw, 1200px);
  position: relative;
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
}

/* Cacher la barre de défilement sur les navigateurs WebKit (Chrome, Safari, etc.) */
.books-list::-webkit-scrollbar {
  display: none;
}



.book {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 2rem solid white;
  border-radius: 12px;
  background-color: white;
  height: 100%;
}
.book:hover {
  transform: scale(1.05);
}


.book h2 {
  align-self: center;
  font-size: 1rem;
}

.btn-book {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

}


.update {
  background-color: black;
  color: white;
  border: none;
  border-radius: 50px;
  padding: .5rem 1.8rem;
  cursor: pointer;
  border: 1px solid black;
}
.update:hover {
  background-color: white;
  color: black;
  
}

button.delete {
  background-color: red;
  color: white;
  padding: .5rem 1.8rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

button.delete:hover {
  background-color: rgb(255, 71, 71);
}

.swipper:hover {
  cursor: pointer;
  transform: scale(1.2);
}




@media screen and (min-width: 768px) and (max-width: 1023px) {
  .books-list {
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
}
}
@media screen and (max-width: 767px) {
  .books-list {
  grid-template-columns: 1fr;
  padding: 1rem;
}
}

</style>