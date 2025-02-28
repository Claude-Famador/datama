<template>
  <div class="home">
    <h1>Welcome to Our Dental Clinic</h1>
    
    <div v-if="user">
      <p>Hello, {{ user.email }}</p>
      <p>Manage your profile and appointments:</p>
      <div class="actions">
        <router-link to="/profile">Go to Your Profile</router-link>
        <router-link to="/appointments">Book an Appointment</router-link>
      </div>
      <button @click="logOut">Log Out</button>
    </div>

    <div v-else>
      <p>To access our services, please sign up or log in:</p>
      <div class="actions">
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/login">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key')

export default {
  name: 'Home',
  setup() {
    const user = ref(null)
    const router = useRouter()

    onMounted(() => {
      // Check for authenticated user
      const currentUser = supabase.auth.user()
      if (currentUser) {
        user.value = currentUser
      }
    })

    const logOut = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error.message)
      } else {
        user.value = null
        router.push('/')
      }
    }

    return {
      user,
      logOut
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #4CAF50;
}

.actions {
  margin-top: 20px;
}

.actions a {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.actions a:hover {
  background-color: #45a049;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #e53935;
}
</style>
