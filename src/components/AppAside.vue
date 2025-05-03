<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const setting = ref(false);
const themes = ref('primary');
const modes = ref(false);
const hue = ref(0);
const lightness = ref(50);
const saturation = ref(100);

const openSetting = () => {
  setting.value = !setting.value
}

// Fermer la section de paramètre en cliquant à l’extérieur
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.setting') && !e.target.closest('.btn-setting')) {
      setting.value = false
    }
  })
})

// Navigation simple
const goTo = (url) => {
  window.open(url, '_blank')
}

// Génère une couleur HSLA
const hslaColor = computed(() => {
  // const alpha = lightness.value
  return `hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 1)`
})

// Change la couleur CSS selon le thème sélectionné
function handleColorChange(color) {
  const root = document.documentElement
  const map = {
    primary: '--primary-color',
    text: '--quaternary-color',
    bg: '--secondary-color',
    header: '--tertiary-color',
    title: '--quinary-color',
    btn: '--senary-color',
  }

  const variable = map[themes.value]
  if (variable) {
    root.style.setProperty(variable, color)
    localStorage.setItem(variable, color)
  }
}

// Appliquer le changement à chaque modification
watch([hue, lightness, saturation], () => {
  handleColorChange(hslaColor.value);
})

// Mode sombre / clair
watch(modes, (value) => {
  const root = document.documentElement
  if (value) {
    root.style.setProperty('--secondary-color', 'hsla(0, 100%, 0%, 1)')
    root.style.setProperty('--quaternary-color', 'hsl(0, 0%, 100%)')
    root.style.setProperty('--tertiary-color', 'hsl(248, 10%, 16%)')
    root.style.setProperty('--primary-color', 'hsla(27, 100%, 48%, 1)')
    root.style.setProperty('--quinary-color', 'hsla(27, 100%, 48%, 1)')
    root.style.setProperty('--senary-color', 'hsla(27, 100%, 48%, 1)')
  } else {
    root.style.setProperty('--secondary-color', localStorage.getItem('--secondary-color'))
    root.style.setProperty('--quaternary-color', localStorage.getItem('--quaternary-color'))
    root.style.setProperty('--tertiary-color', localStorage.getItem('--tertiary-color'))
    root.style.setProperty('--primary-color', localStorage.getItem('--primary-color'))
  }
  localStorage.setItem('modes', value)
})

// Initialiser les couleurs sauvegardées
onMounted(() => {
  const root = document.documentElement
  const vars = ['--primary-color', '--quaternary-color', '--secondary-color', '--tertiary-color', '--quinary-color', '--senary-color']
  vars.forEach((v) => {
    const val = localStorage.getItem(v)
    if (val) root.style.setProperty(v, val)
  })

  const savedMode = localStorage.getItem('modes')
  modes.value = savedMode === 'true'
})
</script>


<template>

  <aside>
    <section
      class="setting"
      :style="{ '--right-value': setting ? '0' : '-108.79px' }"
    >
      <select name="themes" id="themes" v-model="themes">
        <option value="btn">Boutons</option>
        <option value="header">En-tête</option>
        <option value="bg">Fond</option>
        <option value="primary">Icons</option>
        <option value="text">Texts</option>
        <option value="title">Titres</option>
      </select>
      <div class="color-range">
        <div class="hue-container"><input type="range" id="hue" v-model="hue" min="0" max="360" /></div>
        <div class="lightness-container">
          <input 
            type="range" 
            id="lightness" 
            v-model="lightness" 
            min="0" 
            max="100" 
            class="lightness-slider" 
            :style="`background: linear-gradient(to right, rgba(0, 0, 0, 1), ${hslaColor}, white);`"
          />
        </div>
        <div class="saturation-container">
          <input 
            type="range" 
            id="saturation" 
            v-model="saturation"
            min="0" 
            max="100"
            :style="`background: linear-gradient(to right, white, ${hslaColor});`"
            ></div>
      </div>

      <div class="theme-switch">
        <input type="checkbox" id="theme-checkbox" v-model="modes"/>
        <label for="theme-checkbox">
          <div></div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
              ></path>
            </svg>
          </span>
        </label>
      </div>

      <div @click="openSetting" class="btn-setting">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M13.984 2.542c.087.169.109.386.152.82c.082.82.123 1.23.295 1.456a1 1 0 0 0 .929.384c.28-.037.6-.298 1.238-.82c.337-.277.506-.415.687-.473a1 1 0 0 1 .702.035c.175.076.33.23.637.538l.894.894c.308.308.462.462.538.637a1 1 0 0 1 .035.702c-.058.181-.196.35-.472.687c-.523.639-.784.958-.822 1.239a1 1 0 0 0 .385.928c.225.172.636.213 1.457.295c.433.043.65.065.82.152a1 1 0 0 1 .47.521c.071.177.071.395.071.831v1.264c0 .436 0 .654-.07.83a1 1 0 0 1-.472.522c-.169.087-.386.109-.82.152c-.82.082-1.23.123-1.456.295a1 1 0 0 0-.384.929c.038.28.299.6.821 1.238c.276.337.414.505.472.687a1 1 0 0 1-.035.702c-.076.175-.23.329-.538.637l-.894.893c-.308.309-.462.463-.637.538a1 1 0 0 1-.702.035c-.181-.058-.35-.196-.687-.472c-.639-.522-.958-.783-1.238-.82a1 1 0 0 0-.929.384c-.172.225-.213.635-.295 1.456c-.043.434-.065.651-.152.82a1 1 0 0 1-.521.472c-.177.07-.395.07-.831.07h-1.264c-.436 0-.654 0-.83-.07a1 1 0 0 1-.522-.472c-.087-.169-.109-.386-.152-.82c-.082-.82-.123-1.23-.295-1.456a1 1 0 0 0-.928-.384c-.281.037-.6.298-1.239.82c-.337.277-.506.415-.687.473a1 1 0 0 1-.702-.035c-.175-.076-.33-.23-.637-.538l-.894-.894c-.308-.308-.462-.462-.538-.637a1 1 0 0 1-.035-.702c.058-.181.196-.35.472-.687c.523-.639.784-.958.821-1.239a1 1 0 0 0-.384-.928c-.225-.172-.636-.213-1.457-.295c-.433-.043-.65-.065-.82-.152a1 1 0 0 1-.47-.521C2 13.286 2 13.068 2 12.632v-1.264c0-.436 0-.654.07-.83a1 1 0 0 1 .472-.522c.169-.087.386-.109.82-.152c.82-.082 1.231-.123 1.456-.295a1 1 0 0 0 .385-.928c-.038-.281-.3-.6-.822-1.24c-.276-.337-.414-.505-.472-.687a1 1 0 0 1 .035-.702c.076-.174.23-.329.538-.637l.894-.893c.308-.308.462-.463.637-.538a1 1 0 0 1 .702-.035c.181.058.35.196.687.472c.639.522.958.783 1.238.821a1 1 0 0 0 .93-.385c.17-.225.212-.635.294-1.456c.043-.433.065-.65.152-.82a1 1 0 0 1 .521-.471c.177-.07.395-.07.831-.07h1.264c.436 0 .654 0 .83.07a1 1 0 0 1 .522.472M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </section>

    <section class="socials">
      <div class="aside-buttons">
        <button class="social-button aside-button">
          <i class="icon fa-solid fa-diagram-project"></i>
        </button>
        <button
          class="discord-button aside-button"
          onclick="location.href='https://discord.com/channels/uns.111'"
        >
          <i class="icon fa-brands fa-discord"></i>
        </button>
        <button
          class="twitter-button aside-button"
          onclick="location.href='https://x.com/Unscode111'"
        >
          <i class="icon fa-brands fa-square-x-twitter"></i>
        </button>
        <button
          class="github-button aside-button"
          onclick="location.href='https://github.com/uns111code'"
        >
          <i class="icon fa-brands fa-github"></i>
        </button>
        <button
          class="dev-button aside-button"
          onclick="location.href='https://dev.to/younes_amini_9ca6d523d301'"
        >
          <i class="icon fa-brands fa-dev"></i>
        </button>
        <button
          class="whatsapp-button aside-button"
          onclick="location.href='https://www.whatsapp.com/'"
        >
          <i class="icon fa-brands fa-whatsapp"></i>
        </button>
      </div>
    </section>
  </aside>
</template>

<style lang="scss" scoped>
.color-range {
  height: 14.5rem;

  position: relative;
  div {
    position: absolute;
    top: 45%;
  }
  .hue-container {
    transform: rotate(-90deg);
    width: 12rem;
    right: -25%;
  }
  .lightness-container {
    transform: rotate(90deg);
    width: 12rem;
    left: -53%;
  }
  .saturation-container {
    transform: rotate(90deg);
    width: 12rem;
    left: -20%;
  }
}


input[type="range"] {
  width: 100%;
  -webkit-appearance: none; /* Retirer l'apparence par défaut */
  appearance: none;
  height: 20px;
  border-radius: 4px;
  outline: none;
  // margin: 10px 0;
  background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
  
}


        /* Personnalisation du cercle (thumb) */
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; /* Retirer l'apparence par défaut */
            appearance: none;
            width: 10px; /* Largeur du cercle */
            height: 20px; /* Hauteur du cercle */
            background: transparent; /* Couleur du cercle */
            border: 2px solid var(--border-color);
            cursor: pointer; /* Curseur de main pour interaction */
            border-radius: 0;
        }

        /* Pour Firefox */
        input[type="range"]::-moz-range-thumb {
            width: 10px;
            height: 20px;
            cursor: pointer;
            background: transparent; /* Couleur du cercle */
            border: 2px solid var(--border-color);
            border-radius: 0;
        }

        /* Pour Internet Explorer */
        input[type="range"]::-ms-thumb {
            width: 10px;
            height: 20px;
            cursor: pointer;
            background: transparent; /* Couleur du cercle */
            border: 2px solid var(--border-color);
            border-radius: 0;
        }


aside {
  position: relative;
}
.setting {
  background-color: var(--tertiary-color);
  position: fixed;
  right: var(--right-value);
  bottom: 50%;
  transform: translateY(50%);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  box-shadow: var(--box-shadow);
  transition: right 0.5s ease;
  z-index: 999;
  cursor: pointer;
  padding: 1rem 0.5rem;


  .btn-setting {
    box-shadow: var(--box-shadow);
    background-color: var(--tertiary-color);
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    padding: 0.5rem 0.3rem 0.2rem 0.3rem;
    svg {
      animation: setting 5s linear infinite;
      path {
        fill: var(--primary-color);
      }
    }
  }
}

@keyframes setting {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--tertiary-color);
  border: var(--border);
  padding: 0.5em 1em;
  border-radius: var(--border-radius-sm);
  color: var(--primary-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    // background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  option {
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  
}

  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='gray' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75em center;
  padding-right: 2em;
}



/* *****************************Radio ******************************* */

.theme-switch {
  position: relative;
  display: flex;
  justify-content: center;
  direction: rtl;
}

#theme-checkbox {
  display: none;
}

#theme-checkbox + label {
  /* change the font-size below to change the size of the switch button*/
  font-size: 2rem;
  height: 1em;
  width: 2.5em;
  border-radius: 0.25em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  border: var(--border);
  &:hover {
    border-color: var(--primary-color);
    // background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

#theme-checkbox:checked + label {
  background-color: #3a3a3a;
}

#theme-checkbox + label:active {
  transform: scale(0.85);
  transition: transform 0.2s;
}

#theme-checkbox + label div {
  width: 0.8em;
  height: 0.8em;
  border-radius: inherit;
  position: absolute;
  top: 0.1em;
  left: 0.1em;
  z-index: 10;
  transition: 0.5s cubic-bezier(1, 0.33, 0.11, 1.34);
  background-color: #f2f2f2;
}

#theme-checkbox:checked + label div {
  /* left: calc(2.5em - .8em - .1em); */
  left: 1.6em;
  background-color: #212121;
}

#theme-checkbox + label span {
  display: flex;
}

#theme-checkbox + label svg {
  display: inline-block;
  height: 1em;
  width: 1em;
  padding: 0.15em;
  box-sizing: border-box;
}

#theme-checkbox + label span:first-of-type {
  color: var(--primary-color);;
}

#theme-checkbox + label span:last-of-type {
  color: var(--primary-color);;
}



/* ************************** socials ************************** */

.socials {
  position: fixed;
  z-index: 999;
  bottom: 50vh;
  left: -3%;
  transform: translateY(40%);
}

/***section class="buttons"***/

.aside-buttons {
  position: relative; /* to apply posittion absolute on .button */
  padding: 5rem 5rem 5rem 1rem; /* increasing hover area effect */
  opacity: 0.3;
  transition: all 1s ease;
}

.aside-buttons:hover {
  opacity: 1;
}

/***all buttons***/

.aside-button {
  position: absolute; /* to apply possition => hover */
  transition: var(--transition);
  border-radius: var(--radius-100);
  font-size: 1rem;
  height: 2rem;
  width: 2rem;
  color: var(--primary-color);
  background-color: var(--tertiary-color);
  box-shadow: var(--box-shadow);
  border: none;
}

/***main button***/

.social-button {
  z-index: 999;
}

.fa-diagram-project {
  margin-top: 3px;
}

/***dev button***/

.dev-button {
  transition-delay: 0s, 0s, 0s;
  transition-property: translate;
}
.dev-button:hover {
  background: #fffc00;
}
.aside-buttons:hover .dev-button {
  translate: 0px 50px;
}

/***whatsapp button***/

.whatsapp-button {
  transition-delay: 0.2s, 0s, 0.2s;
  transition-property: translate;
}
.whatsapp-button:hover {
  background: #25d366;
}
.aside-buttons:hover .whatsapp-button {
  translate: 28px 32px;
}

/***discord button***/

.discord-button {
  transition-delay: 0.3s, 0s, 0.3s;
  transition-property: translate;
}
.discord-button:hover {
  background: #5865f2;
}
.aside-buttons:hover .discord-button {
  translate: 40px 0px;
}

/***twitter button***/

.twitter-button {
  transition-delay: 0.4s, 0s, 0.4s;
  transition-property: translate;
}
.twitter-button:hover {
  background: #001aff;
}
.aside-buttons:hover .twitter-button {
  translate: 28px -32px;
}

/***github button***/

.github-button {
  transition-delay: 0.5s, 0s, 0.5s;
  transition-property: translate;
}
.github-button:hover {
  background: #ff4500;
}
.aside-buttons:hover .github-button {
  translate: 0px -50px;
}




@media (min-width: 1024px) {
  .socials {
  left: 0;
}
}

</style>
