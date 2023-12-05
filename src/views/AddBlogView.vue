<template>
  <div class="about">
    <h1 class="mt-5 text-center">Add New Blog or Post As You Want</h1>

    <div class="container mt-5">
      <div class="row">
        <form class="was-validated">
          <div class="mb-3">
            <input type="text" class="form-control" v-model="title" placeholder="enter the title" />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              v-model="description"
              placeholder="enter the description"
            />
          </div>
          <div class="mb-3">
            <input
              type="file"
              @change="selectedFile"
              class="form-control"
              placeholder="enter the url for the image"
            />
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              @change.prevent="checkedBtn()"
              v-model="isFeatured"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1"
              >If you want the blog is featured
            </label>
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="addBlog()">Post</button>
        </form>
        <pre>{{ isFeatured }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      description: '',
      img: null,
      isFeatured: false,
      authenticated: this.isAllow
    }
  },

  methods: {
    selectedFile(image) {
      this.img = image.target.files[0]
    },
    checkedBtn() {
      if (this.isFeatured) {
        return (this.isFeatured = true)
      } else {
        return (this.isFeatured = false)
      }
    },

    async addBlog() {
      const formData = new FormData()
      formData.append('files', this.img, this.img.name)

      const responseImg = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.authenticated}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('Image added successfully:', responseImg.data)

      const blogInfo = {
        title: this.title,
        description: this.description,
        isFeatured: this.isFeatured,
        img: responseImg.data[0].id
      }

      console.log(responseImg.data[0].url)

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/blogs`,
        {
          data: blogInfo
        },
        {
          headers: {
            Authorization: `Bearer ${this.authenticated}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('Blog added successfully:', response.data)
      this.title = ''
      this.description = ''
      this.img = ''
    }
  }
}
</script>

<style></style>
