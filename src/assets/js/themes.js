import { ref, onMounted, watch } from "vue";

const setting = ref(false);
const themes = ref("primary");
const modes = ref(false);

const openSetting = () => {
  setting.value = !setting.value;
};

// Fermer le menu en cliquant ailleurs
document.querySelectorAll("main, footer, header").forEach((el) => {
  el.addEventListener("click", () => {
    setting.value = false;
  });
});

/* ************************** Palette de couleurs ************************** */
const colors = [
  "rgb(255, 111, 97)",   // coral
  "rgb(30, 30, 30)",     // dark gray
  "rgb(13, 17, 23)",     // github dark
  "rgb(51, 51, 51)",     // soft dark
  "rgb(201, 209, 217)",  // github gray
  "rgb(139, 148, 158)",  // secondary text
  "rgb(245, 245, 245)",  // light gray
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
  // Dark mode extras
  "rgb(37, 37, 37)",
  "rgb(18, 18, 18)",
  "rgb(246, 108, 0)",
];

/* ************************** Fonctions de changement de couleur ************************** */
function changePrimaryColor(index) {
  setRootColor("--primary-color", colors[index]);
}
function changeTextColor(index) {
  setRootColor("--text-color", colors[index]);
}
function changeBgColor(index) {
  setRootColor("--bg-color", colors[index]);
}
function changeHeaderColor(index) {
  setRootColor("--header-color", colors[index]);
}

function setRootColor(variable, color) {
  const root = document.querySelector(":root");
  root.style.setProperty(variable, color);
  localStorage.setItem(variable, color);
}

/* ************************** Gestion des modes (clair/sombre) ************************** */
watch(modes, (value) => {
  const root = document.querySelector(":root");

  const themeColors = value
    ? {
        '--bg-color': '#252525',
        '--text-color': '#F5F5F5',
        '--header-color': '#121212',
        '--primary-color': '#f66c00',
      }
    : {
        '--bg-color': '#F5F5F5',
        '--text-color': '#252525',
        '--header-color': '#FFFFFF',
        '--primary-color': '#f66c00',
      };

  for (const [varName, color] of Object.entries(themeColors)) {
    root.style.setProperty(varName, color);
    localStorage.setItem(varName, color);
  }

  localStorage.setItem("darkMode", value);
});

/* ************************** Changement global via selecteur ************************** */
function handleColorChange(index) {
  if (themes.value === "primary") {
    changePrimaryColor(index);
  } else if (themes.value === "text") {
    changeTextColor(index);
  } else if (themes.value === "bg") {
    changeBgColor(index);
  } else if (themes.value === "header") {
    changeHeaderColor(index);
  }
}

/* ************************** Chargement au démarrage ************************** */
onMounted(() => {
  const root = document.querySelector(":root");

  const savedColors = [
    "--primary-color",
    "--text-color",
    "--bg-color",
    "--header-color",
  ];

  savedColors.forEach((varName) => {
    const saved = localStorage.getItem(varName);
    if (saved) {
      root.style.setProperty(varName, saved);
    }
  });

  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) {
    modes.value = savedMode === "true";
  }
});

/* ************************** Exports ************************** */
export {
  setting,
  themes,
  modes,
  openSetting,
  colors,
  handleColorChange,
  changePrimaryColor,
  changeTextColor,
  changeBgColor,
  changeHeaderColor,
};
