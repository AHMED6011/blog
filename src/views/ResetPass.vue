<template>
  <div>
    <div class="row m-0 mt-5">
      <div class="col-3 p-0"></div>
      <div class="col-6 mt-5 p-0 text-center d-flex justify-content-center">
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <input class="form-control mb-3" placeholder="Email" type="email" v-model="email" />
            <input
              class="form-control mb-3"
              placeholder="Password"
              type="password"
              v-model="password"
            />
            <input
              class="form-control mb-3"
              placeholder="Comfirm Password"
              type="password"
              v-model="confirmPassword"
            />
            <button class="btn btn-primary" @click.prevent="resetPassword()">Reset Password</button>
          </div>
        </div>
      </div>
      <div class="col-3 p-0"></div>
    </div>
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
      confirmPassword: '',
      apiUrl: import.meta.env.VITE_APP_BASE_URL,
      cookies: useCookies().cookies
    }
  },

  methods: {
    async resetPassword() {
      const configureData = {
        code: this.$route.query.code,
        password: this.password,
        passwordConfirmation: this.confirmPassword
      }
      try {
        const response = await axios.post(`${this.apiUrl}/api/auth/reset-password`, configureData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.cookies.set('myCookie', response.data.jwt, { expires: new Date() })
        this.$router.push('/')
      } catch (error) {
        console.log('there is error')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
