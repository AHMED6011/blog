<template>
  <div class="container">
    <div class="row mt-5 pb-4">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <h2>You're in the sign in page</h2>
      </div>
      <div class="col-3"></div>
    </div>
    <form v-if="!authenticated" class="was-validated">
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
        <label for="validationpassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="validationpassword"
          placeholder="enter your password"
          v-model="password"
          required
        />
        <div class="invalid-feedback">Please enter your password.</div>
      </div>

      <div class="mb-3">
        <button @click.prevent="handlelogin()" class="btn btn-primary" type="submit">
          Sign In
        </button>
      </div>
      <div class="mb-3">
        <RouterLink class="btn btn-primary" to="/signup">Create An Account</RouterLink>
      </div>
      <div class="mb-3">
        <RouterLink class="btn btn-primary" to="/forgotpass">I Forgot My Password</RouterLink>
      </div>
    </form>

    <div v-if="authenticated" class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center d-flex justify-content-center">
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <h3>{{ userInfo.id }}</h3>
            <input
              class="form-control mb-3"
              :placeholder="userInfo.email"
              type="email"
              v-model="email"
            />
            <input
              class="form-control mb-3"
              :placeholder="userInfo.username"
              type="text"
              v-model="username"
            />
            <input
              class="form-control mb-3"
              placeholder="password"
              type="Password"
              v-model="password"
            />
            <input
              class="form-control mb-3"
              placeholder="Confirm Password"
              type="password"
              v-model="confirmPassword"
            />
            <button class="btn btn-primary" @click="updateUserInfo">Edit My Account</button>
            <button class="btn btn-primary m-3" @click.prevent="logOut">Log Out</button>

            <button class="btn btn-primary" @click.prevent="deleteAccount">
              Delete Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import swal from 'sweetalert'

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      errMes: '',
      userInfo: [],
      authenticated: this.isAllow,
      apiUrl: import.meta.env.VITE_APP_BASE_URL,
      cookies: useCookies().cookies
    }
  },
  methods: {
    async handlelogin() {
      const loginInfo = {
        identifier: this.email,
        password: this.password
      }

      const login = await axios.post(`${this.apiUrl}/api/auth/local`, loginInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const loginResponse = login.data

      this.cookies.set('myCookie', loginResponse.jwt, { expires: new Date(0) })
      location.reload()

      if (loginResponse) {
        this.$router.push('/addBlog')
      } else {
        console.error('There is error')
      }
    },
    async getUserInfo() {
      if (this.authenticated) {
        const response = await axios.get(`${this.apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${this.authenticated}`
          }
        })

        this.userInfo = response.data
      } else {
        console.log('There is another error with your code')
      }
    },
    async logOut() {
      await axios.get(`${this.apiUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${this.authenticated}`
        }
      })
      location.reload()
      this.cookies.set('myCookie', '', { expires: new Date(0) })
    },
    async deleteAccount() {
      const confirmation = await swal('Are you sure you want to delete your account?', {
        buttons: {
          cancel: 'Cancel',
          confirm: {
            text: 'Delete',
            value: 'delete'
          }
        },
        dangerMode: true
      })

      if (confirmation === 'delete') {
        await axios.delete(`${this.apiUrl}/api/users/${this.userInfo.id}`, {
          headers: {
            Authorization: `Bearer ${this.authenticated}`
          }
        })
        this.cookies.set('myCookie', '', { expires: new Date(0) })
        this.$router.push('/signup')
      } else {
        swal('Deletion canceled', 'The blog was not deleted.', 'info')
      }
    },
    async updateUserInfo() {
      const userData = {}

      if (this.email) {
        userData.email = this.email
      }

      if (this.username) {
        userData.username = this.username
      }

      if (this.password && this.confirmPassword) {
        userData.password = this.password
        userData.passwordConfirmation = this.confirmPassword
      }

      try {
        const response = await axios.put(`${this.apiUrl}/api/users/${this.userInfo.id}`, userData, {
          headers: {
            Authorization: `Bearer ${this.cookies.get('myCookie')}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 200) {
          this.userInfo = response.data
          console.log('User info updated successfully')
        } else {
          console.error('Failed to update user info')
        }
      } catch (error) {
        console.error('An error occurred while updating user info:', error)
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped></style>
