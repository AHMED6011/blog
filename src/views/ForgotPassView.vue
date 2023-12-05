<template>
  <div>
    <form class="was-validated">
      <div class="mb-3">
        <label for="validationEmail" class="form-label">email</label>
        <input
          type="email"
          class="form-control"
          id="validationEmail"
          placeholder="enter your email"
          v-model="email"
          required
        />
        <div class="invalid-feedback">Please enter your email.</div>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" @click.prevent="forgetPass">Forget Password</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      userInfo: [],
      apiUrl: import.meta.env.VITE_APP_BASE_URL
    }
  },
  methods: {
    async forgetPass() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/auth/forgot-password

`,
          {
            email: this.email
          }
        )

        this.userInfo = response.data
      } catch (error) {
        console.log('There Is An Error', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
