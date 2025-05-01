<script setup>
import { ref } from 'vue'

const isHovered = ref(false);

const name = ref('');
const email = ref('');
const message = ref('');
const status = ref('');
const isSending = ref(false);
const isSuccess = ref(false);

const WEB3FORMS_ACCESS_KEY = 'cf4df417-93e9-4ac3-842a-1744701b0daf'; 

const submitForm = async () => {
  if (!name.value || !email.value || !message.value) {
    status.value = 'Tous les champs sont requis.';
    isSuccess.value = false;
    return;
  }

  isSending.value = true;
  status.value = '';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const result = await response.json();
    if (result.success) {
      status.value = '✅ Message envoyé avec succès !';
      isSuccess.value = true;
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      status.value = '❌ Une erreur est survenue.';
      isSuccess.value = false;
    }
  } catch (error) {
    status.value = '❌ Une erreur réseau est survenue.';
    isSuccess.value = false;
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <section class="contact-page">
    <div class="conatct-title">
      <h2 class="title">CONTACTEZ-MOI ...</h2>
      <p class="text-color">Vous pouvez me contacter via le formulaire ou les liens proposés, je vous répondrai dans les meilleurs délais.</p>
    </div>
    <div class="contact-field">
      <ul class="contact">
        <li
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false">
          <i class="icon fa-solid fa-location-dot"  :class="{ 'fa-bounce': isHovered }"></i>
          <a href="https://www.google.com/maps/place/38200+Vienne/@45.5220692,4.8391338,13z/data=!3m1!4b1!4m6!3m5!1s0x47f4df0824f5f985:0xc4e1bb60b45a03c3!8m2!3d45.525587!4d4.874339!16zL20vMDJtcnhz?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D"  class="text-color">38200 Vienne</a>
        </li>
        <li>
          <i class="icon fa-solid fa-envelope"></i>
          <a href="mailto:uns.code111@gmail.com" class="text-color">uns.code111@gmail.com</a>
        </li>
        <li>
          <i class="icon fa-brands fa-linkedin"></i>
          <a href="https://www.linkedin.com/in/younes-amini-82a555356/"
          class="text-color">linkedin.com/younes-amini</a
          >
        </li>
        <li>
          <i class="icon fa-solid fa-at"></i>
          <a href="mailto:younesamini38@proton.me" class="text-color">younesamini38@proton.me</a>
        </li>
      </ul>
      <div class="form">
        <label class="name-field">
          <b class="text-color">Votre nom</b>
        </label>
        <input type="text" id="name" v-model="name" placeholder="Robert" required />
        <label for="email"><b class="text-color">votre adresse e-mail</b></label>
        <input
          name="email"
          id="email"
          v-model="email"
          type="text"
          placeholder="you@example.com"
          required
        />
        <label for="message"><b class="text-color">Votre message</b></label>
        <textarea
          class="message-contact"
          name="message"
          id="message"
          v-model="message"
          placeholder="Bonjour...."
        ></textarea>
        <button @click="submitForm" :disabled="isSending" class="btn">
      <span v-if="isSending">Envoi...</span>
      <span v-else>Envoyer</span>
    </button>
    <p v-if="status" :class="{ success: isSuccess, error: !isSuccess }" class="status-message">
      {{ status }}
    </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


.contact-page {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .conatct-title {
    padding-top: 5rem;
  }

  div {
      padding: 2rem 1rem;
      > * {
        padding: 1rem 0;
      }
  }

  .contact-field {
    .contact {
      li {
        padding: 1rem 0 1rem 4rem;
        text-align: left;
        a, i {
          padding: 0 .3rem;
        }
      }
    }

    .form {
      position: relative; // for status message
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      input {
        background: transparent;
        border: none;
        border-bottom: var(--border);
        width: 20rem;
        padding: .5rem 0;
        caret-color: var(--primary-color);
        &:focus {
        outline: none;
        border-bottom-color: var(--primary-color);
      }


      
    }

    .message-contact {
        background: transparent;
        outline: none;
        width: 20rem;
        height: 10rem;
        padding: 1rem .5rem;
        resize: none;
        border-radius: 8px;
        border: var(--border);
        &:focus {
          border-color: var(--primary-color);
      }
      }
      button {
        padding: .5rem 2rem;
        border: none;
        align-self: center;
      }
    }
  }
}




button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  color: green;
}
.error {
  color: red;
}
.status-message {
        position: absolute;
        bottom: 0;
        transform: translateY(80%);
      }



/* --- Responsive --- */
@media (min-width: 1024px) {
  .contact-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 87.2px - 18.4px);

  .conatct-title {
    padding-bottom: 0;
    padding-top: 0;
    p {
    padding: 0;
  }
  }

  .contact-field {
    display: flex;
    justify-content: center;
    gap: 10rem;
    padding-bottom: 0;
    padding-top: 1rem;
    .contact {
      li {
        padding: 1rem 0;
      }
    }

    .form {
      label {
        display: none;
      }
      input {
          border: var(--border);
          border-radius: 6px;
          padding-left: .5rem;
          &:focus {
          outline: none; // pour enléver le  Le contour 
          border-color: var(--primary-color);
      }
        }

    .message-contact {
        height: 6rem;
      }
    .status-message {
        position: absolute;
        top: 0;
        bottom: 80%;
        transform: translateY(-80%);
      }
    }
  }
}
}

</style>
