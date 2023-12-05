<template>
  <div class="about">
    <h1 class="mt-5 text-center">Here You Can Edit The Blog As You Want</h1>

    <div class="container mt-5">
      <div class="row">
        <form class="was-validated">
          <div class="mb-3">
            <input type="text" class="form-control" v-model="title" placeholder="edit the title" />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              v-model="description"
              placeholder="edit the description"
            />
          </div>
          <div class="mb-3">
            <input type="file" @change="selectedFile" class="form-control" />
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
          <button type="submit" class="btn btn-primary me-4" @click.prevent="Update()">
            Update
          </button>
          <button type="submit" class="btn btn-primary" @click.prevent="Delete()">Delete</button>
        </form>
        <pre>{{ isFeatured }}</pre>
      </div>

      <div class="row text-center justify-content-between">
        <div class="col-3">
          <div class="card" style="width: 18rem" v-if="blogs.attributes">
            <img :src="`${blogs.attributes.img.data[0].attributes.url}`" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">
                {{ blogs.attributes.title }}
              </h5>
              <p class="card-text">
                {{ blogs.attributes.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  props: ['id'],

  data() {
    return {
      apiUrl: import.meta.env.VITE_APP_BASE_URL,
      blogs: [],
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
    async fetchBlogs() {
      const response = await axios.get(`${this.apiUrl}/api/blogs/${this.id}?populate=*`)
      this.blogs = response.data.data
    },
    async Delete() {
      const confirmation = await swal('Are you sure you want to delete this blog?', {
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
        await axios.delete(`${this.apiUrl}/api/blogs/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.authenticated}`
          }
        })

        this.$router.push('/')
      } else {
        swal('Deletion canceled', 'The blog was not deleted.', 'info')
      }
    },
    async Update() {
      try {
        const updateData = {}

        this.title && (updateData.title = this.title)
        this.description && (updateData.description = this.description)
        this.isFeatured !== null && (updateData.isFeatured = this.isFeatured)

        if (this.img) {
          const formData = new FormData()
          formData.append('files', this.img, this.img.name)

          const responseImg = await axios.post(`${this.apiUrl}/api/upload`, formData, {
            headers: {
              Authorization: `Bearer ${this.authenticated}`,
              'Content-Type': 'multipart/form-data'
            }
          })
          updateData.img = responseImg.data[0].id
        }

        console.log(updateData)

        const response = await axios.put(
          `${import.meta.env.VITE_APP_BASE_URL}/api/blogs/${this.id}`,
          { data: updateData },
          {
            headers: {
              Authorization: `Bearer ${this.authenticated}`,
              'Content-Type': 'application/json'
            }
          }
        )
        this.blogs = response.data
        location.reload()
      } catch (error) {
        console.error('Error updating blog:', error)
      }
    }
  },
  created() {
    this.fetchBlogs()
  }
}
</script>

<style lang="scss" scoped></style>
