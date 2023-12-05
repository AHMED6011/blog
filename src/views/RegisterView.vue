<template>
  <div class="container">
    <div class="row mt-5 pb-4">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <h2>You're in the sign-up page</h2>
      </div>
      <div class="col-3"></div>
    </div>
    <form class="was-validated">
      <div class="mb-3">
        <label for="validationEmail" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="validationEmail"
          placeholder="Enter your email"
          v-model="email"
          required
        />
        <div class="invalid-feedback">Please enter your email.</div>
      </div>
      <div class="mb-3">
        <label for="validationpassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="validationpassword"
          placeholder="Enter your password"
          v-model="password"
          required
        />
        <div class="invalid-feedback">Please enter your password.</div>
      </div>
      <div class="mb-3">
        <label for="validationusername" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="validationusername"
          placeholder="Enter your name"
          v-model="username"
          @input="checkUsernameExists"
          required
        />
        <div class="invalid-feedback">Please enter your name.</div>
        <div v-if="usernameExists" class="alert alert-danger" role="alert">
          Username already exists. Please choose a different one.
        </div>
      </div>

      <div class="mb-3">
        <button
          @click.prevent="handleSignup"
          :disabled="usernameExists"
          class="btn btn-primary"
          type="submit"
        >
          Sign Up
        </button>
      </div>
      <div class="mb-3">
        <RouterLink to="/signin" class="btn btn-primary" type="submit">
          I already have an account
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      usernameExists: false,
      errMes: '',
      cookies: useCookies().cookies
    }
  },
  methods: {
    async checkUsernameExists() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/users?filters[username][$eq]=${this.username}`
      )
      this.usernameExists = response.data.length > 0
    },
    async handleSignup() {
      if (this.usernameExists) {
        console.log('Username already exists. Please choose a different one.')
        return
      }

      const userInfo = {
        email: this.email.trim(),
        password: this.password.trim(),
        username: this.username.trim()
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/auth/local/register`,
          userInfo,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200 && response.data.jwt) {
          this.cookies.set('myCookie', response.data.jwt, { expires: new Date(0) })
        } else {
          console.log('Registration failed. Please try again.')
          this.errMes = 'Registration failed. Please try again.'
        }

        location.replace('/')
      } catch (error) {
        console.error('Error during registration:', error)
        // Handle registration error (show an error message, etc.)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
