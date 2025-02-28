<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="first_name">First Name</label>
        <input v-model="first_name" type="text" id="first_name" required />
      </div>
      <div>
        <label for="last_name">Last Name</label>
        <input v-model="last_name" type="text" id="last_name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key')

export default {
  name: 'SignUp',
  setup() {
    const first_name = ref('')
    const last_name = ref('')
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const signUp = async () => {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })
        
        if (error) {
          errorMessage.value = error.message
        } else {
          // Optionally add user data to your table
          await supabase
            .from('users')
            .insert([
              { first_name: first_name.value, last_name: last_name.value, email: email.value }
            ])
          alert('Sign up successful!')
        }
      } catch (error) {
        errorMessage.value = 'Error signing up: ' + error.message
      }
    }

    return {
      first_name,
      last_name,
      email,
      password,
      errorMessage,
      signUp
    }
  }
}
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: 0 auto;
}
.error {
  color: red;
}
</style>
