<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push({ name: 'login' })
      }
    })

    return {
      router
    }
  }
}
</script>
