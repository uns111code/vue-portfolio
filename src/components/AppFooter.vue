<script setup></script>

<template>
  <footer class="icon">
    <p>&copy; 2025 Younes Amini</p>

    <nav>
      <RouterLink to="/about">À propos</RouterLink> | <RouterLink to="/project">Projets</RouterLink> |
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>

    <div class="socials">
      <a href="https://github.com/uns111code" target="_blank">GitHub </a>
      <a href="https://www.linkedin.com/in/younes-amini-82a555356/" target="_blank"
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
  font-size: 12px;
  background-color: var(--tertiary-color);
}

/* --- Responsive --- */
@media (min-width: 1024px) {
  footer {
    > *:not(:first-child) {
      display: none;
  }

  padding: 0;
  }
}

</style>
