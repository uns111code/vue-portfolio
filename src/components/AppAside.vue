<script setup>
import { ref, onMounted, watch } from "vue";

const setting = ref(false);
const themes = ref("primary");
const modes = ref(false);

const openSetting = () => {
  setting.value = !setting.value;
};

document.querySelectorAll("main, footer, header").forEach((el) => {
  el.addEventListener("click", () => {
    setting.value = false;
  });
});

/* ************************** changement de theme ************************** */
const colors = [
  "rgb(255, 111, 97)",   // coral
  "rgb(30, 30, 30)",     // dark gray
  "rgb(13, 17, 23)",     // github dark
  "rgb(51, 51, 51)",     // soft dark
  "rgb(201, 209, 217)",  // github gray
  "rgb(139, 148, 158)",  // secondary text
  "rgb(2,53,98)",  // light gray
  "rgb(242, 242, 242)",  // light bg
  "rgb(237, 237, 237)",  // light neutral
  "rgb(255, 255, 255)",  // white
  "rgb(88, 166, 255)",   // accent blue
  "rgb(127, 219, 255)",  // light blue
  "rgb(76, 175, 80)",    // green
  "rgb(0, 191, 166)",    // teal
  "rgb(136, 176, 75)",   // soft green
  "rgb(255, 180, 0)",    // accent yellow
  "rgb(162, 155, 254)",  // lavender
  "rgb(107, 91, 149)",   // deep purple
  // ******************** dark mode ********************************* //
  "rgb(37, 37, 37)",     // dark gray
  "rgb(18, 18, 18)",     // orange
  "rgb(246, 108, 0)",    // near-black
];

function changePrimaryColor(index) {
  const root = document.querySelector(":root");
  const selectedColor = colors[index];
  root.style.setProperty("--primary-color", selectedColor);
  localStorage.setItem("primaryColor", selectedColor);
}

function changeTextColor(index) {
  const root = document.querySelector(":root");
  const selectedColorText = colors[index];
  root.style.setProperty("--quaternary-color", selectedColorText);
  localStorage.setItem("textColor", selectedColorText);
}

function changeBgColor(index) {
  const root = document.querySelector(":root");
  const selectedColorBg = colors[index];
  root.style.setProperty("--secondary-color", selectedColorBg);
  localStorage.setItem("bgColor", selectedColorBg);
}

function changeHeaderColor(index) {
  const root = document.querySelector(":root");
  const selectedColorHeader = colors[index];
  root.style.setProperty("--tertiary-color", selectedColorHeader);
  localStorage.setItem("headerColor", selectedColorHeader);
}

function changeTitleColor(index) {
  const root = document.querySelector(":root");
  const selectedColorTitle = colors[index];
  root.style.setProperty("--quinary-color", selectedColorTitle);
  localStorage.setItem("titleColor", selectedColorTitle);
}

function changeBtnColor(index) {
  const root = document.querySelector(":root");
  const selectedColorBtn = colors[index];
  root.style.setProperty("--senary-color", selectedColorBtn);
  localStorage.setItem("btnColor", selectedColorBtn);
}


watch(modes, (value) => {
  const root = document.querySelector(":root");

  if (value) {
    // Mode sombre
    root.style.setProperty("--secondary-color", "#252525");
    root.style.setProperty("--quaternary-color", "#F5F5F5");
    root.style.setProperty("--tertiary-color", "#121212");
    root.style.setProperty("--primary-color", "#f66c00");
  } else {
    // Mode clair
    root.style.setProperty("--secondary-color", localStorage.getItem("bgColor"));
    root.style.setProperty("--quaternary-color", localStorage.getItem("textColor"));
    root.style.setProperty("--tertiary-color", localStorage.getItem("headerColor"));
    root.style.setProperty("--primary-color", localStorage.getItem("primaryColor"));
    // handleColorChange(0) 
  };
  localStorage.setItem('modes', value)
});






function handleColorChange(index) {
  if (themes.value === "primary") {
    changePrimaryColor(index);    
  } else if (themes.value === "text") {
    changeTextColor(index);
  } else if (themes.value === "bg") {
    changeBgColor(index);
  } else if (themes.value === "header") {
    changeHeaderColor(index);
  } else if (themes.value === "title") {
    changeTitleColor(index);
  } else if (themes.value === "btn") {
    changeBtnColor(index);
  }
}

onMounted(() => {
  const root = document.querySelector(":root");
  const savedColor = localStorage.getItem("primaryColor");
  const savedColorText = localStorage.getItem("textColor");
  const savedColorBg = localStorage.getItem("bgColor");
  const savedColorHeader = localStorage.getItem("headerColor");
  const savedColorBtn = localStorage.getItem("btnColor");
  const savedColorTitle = localStorage.getItem("titleColor");
  const selectedMode = localStorage.getItem('modes')
  if (selectedMode === 'true') {
  modes.value = true
} else {
  modes.value = false
}

  if (savedColor) {
    root.style.setProperty("--primary-color", savedColor);
  }
  if (savedColorText) {
    root.style.setProperty("--quaternary-color", savedColorText);
  }
  if (savedColorBg) {
    root.style.setProperty("--secondary-color", savedColorBg);
  }
  if (savedColorHeader) {
    root.style.setProperty("--tertiary-color", savedColorHeader);
  }
  if (savedColorBtn) {
    root.style.setProperty("--senary-color", savedColorBtn);
  }
  if (savedColorTitle) {
    root.style.setProperty("--quinary-color", savedColorTitle);
  }
});


</script>

<template>
  <aside>
    <section
      class="setting"
      :style="{ '--right-value': setting ? '0' : '-110px' }"
    >
      <select name="themes" id="themes" v-model="themes">
        <option value="bg">1.Fond</option>
        <option value="header">2.Fond</option>
        <option value="btn">Bouton</option>
        <option value="primary">Principal</option>
        <option value="text">Text</option>
        <option value="title">Titre</option>
      </select>
      <ul class="setting-list">
        <li
          v-for="(color, index) in colors"
          :key="color + index"
          @click="handleColorChange(index)"
          :style="{ backgroundColor: color }"
        ></li>
      </ul>
      <!-- From Uiverse.io by MRez321 -->
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
.setting {
  background-color: var(--tertiary-color);
  position: fixed;
  top: 50%;
  right: var(--right-value);
  transform: translateY(-50%);
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
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
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

.setting-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 0.5rem;
  gap: 2px;
  li {
    // border: 1px solid var(--secondary-color);
    padding: 10px;
    max-width: 5px;
  }
}

select {
  appearance: none;
  background-color: transparent;
  border: 1px solid var(--border-color);
  padding: 0.5em 1em;
  border-radius: 8px;
  color: var(--quaternary-color);
  cursor: pointer;
  transition: all 0.3s ease;

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
  color: var(--quaternary-color);
}
}



select {
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
  border: 1px solid var(--border-color);
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
  color: #3a3a3a;
}

#theme-checkbox + label span:last-of-type {
  color: #cecece;
}



/* ************************** socials ************************** */

.socials {
  position: fixed;
  z-index: 9999;
  bottom: -3%;
  left: 65%;
  transform: translateX(-50%);
}

/***section class="buttons"***/

.aside-buttons {
  position: relative; /* to apply posittion absolute on .button */
  padding: 5rem 5rem 5rem 1rem; /* increasing hover area effect */
  opacity: 0.5;
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
  z-index: 9999;
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
  translate: 50px 0px;
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
  translate: 32px -28px;
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
  translate: 0px -40px;
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
  translate: -32px -28px;
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
  translate: -50px 0px;
}

/* --- Responsive --- */
@media (min-width: 1024px) {
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
</style>
