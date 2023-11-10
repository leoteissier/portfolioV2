<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      submitted: false
    }
  },
  props: {
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    resetForm() {
      this.submitted = false
    },
    async onSubmit(event) {
      event.preventDefault();
      const email = document.querySelector('input[name="email"]').value;
      const subject = document.querySelector('input[name="subject"]').value;
      const message = document.querySelector('textarea[name="message"]').value;

      try {
        // Here the code to send the email
        // const mail = useMail()
        // await mail.send({
        //   from: email,
        //   subject: subject,
        //   text: message,
        // })

        this.submitted = true
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    document.getElementById("contact-form").addEventListener("submit", this.onSubmit);
  },
}
</script>


<template>
  <div v-if="submitted === true" id="confirmation-message">
    <h2>Thank you! 🤘</h2>
    <p>Your message has been accepted. You will recieve answer really soon!</p>
    <button @click="resetForm">send-new-message</button>
  </div>
  <form v-else id="contact-form" class="text-sm">
    <div class="flex flex-col">
      <label for="email" class="mb-3">_email:</label>
      <input type="email" id="email-input" name="email" :placeholder="email" class="p-2 mb-5 placeholder-slate-600" required>
    </div>
      <div class="flex flex-col">
          <label for="subject" class="mb-3">_subject:</label>
          <input type="text" id="subject-input" name="subject" :placeholder="subject" class="p-2 mb-5 placeholder-slate-600" required>
      </div>
      <div class="flex flex-col">
          <label for="message" class="mb-3">_message:</label>
          <textarea id="message-input" name="message" :placeholder="message" class="placeholder-slate-600" required></textarea>
      </div>
      <button id="submit-button" type="submit" class="py-2 px-4">submit-message</button>
  </form>
</template>

<style>

form {
    @apply font-fira_retina text-menu-text
}
input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    
}
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(190, 190, 190);
  transition: background-color 5000s ease-in-out 0s;
  border: 2px solid #607b96;
}

#message-input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    resize: none;
    height: 150px;
    padding: 10px;
}

#submit-button {
    @apply font-fira_retina text-white text-sm;
    background-color: #1E2D3D;
    border-radius: 7px;
    margin-top: 20px;
    cursor: pointer;
}

#submit-button:hover {
    background-color: #263B50;
}

input:focus, #message-input:focus {
    outline: none;
    transition: none;
    border: 2px solid #607b96;
    box-shadow: #607b9669 0px 0px 0px 2px;
  }

#contact-form {
    max-width: 600px;
    width: 100%;
}

#confirmation-message{
    @apply font-fira_retina text-menu-text;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#confirmation-message h2{
  color: #fff;
  font-size: 2em;
  text-align: center;
}

#confirmation-message p{
  text-align: center;
  margin: 10px 0;
}

#confirmation-message button{
  @apply font-fira_retina text-white text-sm;
  background-color: #1E2D3D;
  border-radius: 7px;
  margin-top: 20px;
  cursor: pointer;
  padding: 10px 20px;
}

@media (max-width: 1920px) {
    #contact-form {
        max-width: 500px;
        max-height: 500px;
    }
    #submit-button {
        /* width: 100%; */
        font-size: 12px;
    }
    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }
    input {
        font-size: 13px;
    }
}
</style>