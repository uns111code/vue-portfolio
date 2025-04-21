<script setup></script>

<template>
  <footer>
    <p>&copy; 2025 Younes Amini</p>

    <nav>
      <a href="#about">À propos</a> | <a href="#projects">Projets</a> |
      <a href="#contact">Contact</a>
    </nav>

    <div class="socials">
      <a href="https://github.com/mohamedbenali" target="_blank">GitHub </a>
      <a href="https://linkedin.com/in/mohamedbenali" target="_blank"
        > LinkedIn</a
      >
    </div>

    <p>
      Contact : <a href="mailto:uns.code111@gmail.com">uns.code111@gmail.com</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  text-align: center;
  padding: 1rem;
  justify-self: flex-end;
}






/* --- Responsive --- */
@media (min-width: 1024px) {
  footer {
    display: none;
    > *:not(:first-child) {
      display: none;
  }
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
</style>
