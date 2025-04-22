<script setup>
import { ref } from 'vue'

const isHovered = ref(false);



const name = ref('');
const email = ref('');
const message = ref('');
const status = ref('');
const isSending = ref(false);
const isSuccess = ref(false);

const WEB3FORMS_ACCESS_KEY = 'cf4df417-93e9-4ac3-842a-1744701b0daf'; // Remplace ça par ta clé

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
      <h2>CONTACTEZ-MOI ...</h2>
      <p>Vous pouvez me contacter via le formulaire ou les liens proposés, je vous répondrai dans les meilleurs délais.</p>
    </div>
    <div class="contact-field">
      <ul class="contact">
        <li
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false">
          <i class="fa-solid fa-location-dot"  :class="{ 'fa-bounce': isHovered }"></i>
          <a href="">38200 Vienne</a>
        </li>
        <li>
          <i class="fa-solid fa-envelope"></i>
          <a href="mailto:uns.code111@gmail.com">uns.code111@gmail.com</a>
        </li>
        <li>
          <i class="fa-brands fa-linkedin"></i>
          <a href="https://www.linkedin.com/in/younes-amini-82a555356/"
            >linkedin.com/younes-amini</a
          >
        </li>
        <li>
          <i class="fa-solid fa-at"></i>
          <a href="mailto:younesamini38@proton.me">younesamini38@proton.me</a>
        </li>
      </ul>
      <div class="form">
        <label class="name-field">
          <b>Votre nom</b>
          <!-- <div class="name-inputs">
            <input type="text" placeholder="First Name" required /> -->
          <!-- </div> -->
        </label>
        <input type="text" id="name" v-model="name" placeholder="Doe" required />
        <label for="email"><b>votre adresse e-mail</b></label>
        <input
          name="email"
          id="email"
          v-model="email"
          type="text"
          placeholder="you@example.com"
          required
        />
        <label for="message"><b>Votre message</b></label>
        <textarea
          class="message-contact"
          name="message"
          id="message"
          v-model="message"
          placeholder="Votre message"
        ></textarea>
        <button @click="submitForm" :disabled="isSending">
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
        border-bottom: 1px solid var(--border-color);
        width: 20rem;
        padding: .5rem 0;
        caret-color: var(--primary-color);
        &:focus {
        outline: none;
        border-bottom: 1px solid var(--primary-color);
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
        border: 1px solid var(--border-color);
        &:focus {
          border: 1px solid var(--primary-color);
      }
      }
      button {
        background-color: var(--primary-color);
        padding: .5rem 2rem;
        border: none;
        border-radius: 8px;
        color: var(--text-color);
        font-size: 1.3rem;
        align-self: center;
        &:hover {
          background-color: var(--primary-color);
        }
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
  height: clamp(70vh, 80vh, 90vh);
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
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding-left: .5rem;
          &:focus {
          outline: none;
          border: 1px solid var(--primary-color);
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

#name {
  background-image: url(/src/assets/styles/img/address-card-regular.svg);
  background-repeat: no-repeat;
  background-position: 98% 50%;
  background-size: 1.5rem;
}
#email {
  background-image: url(/src/assets/styles/img/at-solid.svg);
  background-repeat: no-repeat;
  background-position: 98% 50%;
  background-size: 1.3rem;
}
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
</style>
