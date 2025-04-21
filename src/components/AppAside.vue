<script setup>
import { ref } from "vue";

const setting = ref(false);

const openSetting = () => {
  setting.value = !setting.value;
}

document.querySelectorAll('main, footer, header').forEach(el => {
  el.addEventListener('click', () => {
    setting.value = false;
  });
});
</script>

<template>
  <aside>
    <section class="setting" :style="{ '--left-value': setting ? '0' : '-40px' }">
      <ul class="setting-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
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
          <i class="fa-solid fa-diagram-project"></i>
        </button>
        <button class="discord-button aside-button" onclick="location.href='https://discord.com/channels/uns.111'">
          <i class="fa-brands fa-discord"></i>
        </button>
        <button class="twitter-button aside-button" onclick="location.href='https://x.com/Unscode111'">
          <i class="fa-brands fa-square-x-twitter"></i>
        </button>
        <button class="github-button aside-button" onclick="location.href='https://github.com/uns111code'">
          <i class="fa-brands fa-github"></i>
        </button>
        <button class="dev-button aside-button" onclick="location.href='https://dev.to/younes_amini_9ca6d523d301'">
          <i class="fa-brands fa-dev"></i>
        </button>
        <button class="whatsapp-button aside-button" onclick="location.href='https://www.whatsapp.com/'">
          <i class="fa-brands fa-whatsapp"></i>
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
  left: var(--left-value);
  transform: translateY(-50%);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: var(--box-shadow);
  transition: left .5s ease;
  z-index: 999;
  cursor: pointer;
  
  ul {
    li {
      padding: 1rem;
    }
  }


  div {
    box-shadow: var(--box-shadow);
    background-color: var(--tertiary-color);
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: .5rem .3rem .2rem .3rem;
    svg {
      animation: setting 5s linear infinite;
      path {
      fill: var(--secondary-color);
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
  


.socials {
  position: fixed;
  z-index: 9999;
  bottom: -3%;
  left: 50%;
  transform: translateX(-50%);
}

/***section class="buttons"***/

.aside-buttons {
  position: relative;       /* to apply posittion absolute on .button */
  padding: 5rem 5rem 5rem 1rem;          /* increasing hover area effect */
  opacity: .2;
  transition: all 1s ease;
}

.aside-buttons:hover {
  opacity: 1;
}


/***all buttons***/

.aside-button {
  position: absolute;    /* to apply possition => hover */
  background: red;
  transition: var(--transition);
  border-radius: var(--radius-100);
  font-size: 25px;
  height: 3rem;
  width: 3rem;
  color: var(#ffffff);
  background-color: var(--secondary-color);
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
  transition-property: translate
}
.dev-button:hover {
 background: #FFFC00;
}
.aside-buttons:hover .dev-button {
 translate: 70px 0px;
}

/***whatsapp button***/

.whatsapp-button {
  transition-delay: 0.2s, 0s, 0.2s;
  transition-property: translate
}
.whatsapp-button:hover {
 background: #25D366;
}
.aside-buttons:hover .whatsapp-button {
 translate: 47px -47px;
}

/***discord button***/

.discord-button {
  transition-delay: 0.3s, 0s, 0.3s; 
  transition-property: translate;
}
.discord-button:hover {
  background: #5865F2;
}
.aside-buttons:hover .discord-button {
  translate: 0px -70px;
}

/***twitter button***/

.twitter-button {
  transition-delay: 0.4s, 0s, 0.4s; 
  transition-property: translate
}
.twitter-button:hover {
  background: #001aff;
}
.aside-buttons:hover .twitter-button {
  translate: -47px -47px;
}

/***github button***/

.github-button {
   transition-delay: 0.5s, 0s, 0.5s;
   transition-property: translate
}
.github-button:hover {
  background: #FF4500;
}
.aside-buttons:hover .github-button {
  translate: -70px 0px;
}





/* --- Responsive --- */
@media (min-width: 1024px) {
  
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    
}

</style>