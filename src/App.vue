<script setup>
import Header from "./components/AppHeader.vue";
import Aside from "./components/AppAside.vue";
import Footer from "./components/AppFooter.vue";
</script>

<template>
  <Header />
  <Aside />
  <main>
    <router-view></router-view>
  </main>
  <h1>fsdqfqs</h1>
  <Footer />
</template>


<style lang="scss" scoped>

/* --- Responsive --- */
@media (min-width: 1024px) {

}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>