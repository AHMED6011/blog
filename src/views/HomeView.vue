<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-10 offset-1">
          <div class="card mb-3" v-for="featured in featuredBlogs" :key="featured.id">
            <img
              v-for="img in featured.attributes.img.data"
              :key="img.id"
              :src="`${img.attributes.url}`"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ featured.attributes.title }}
              </h5>
              <p class="card-text">
                {{ featured.attributes.description }}
              </p>
              <p class="card-text">
                <small class="text-body-secondary">
                  {{ formatDate(featured.attributes.createdAt).formattedDate }}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-center justify-content-between">
        <div v-for="blog in blogs" :key="blog.id" class="col-3">
          <div class="card" style="width: 18rem">
            <img
              v-for="img in blog.attributes.img.data"
              :key="img.id"
              :src="`${img.attributes.url}`"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ blog.attributes.title }}
              </h5>
              <p class="card-text">
                {{ blog.attributes.description }}
              </p>
              <p class="card-text">
                <small class="text-body-secondary">
                  {{ formatDate(blog.attributes.createdAt).formattedDate }}
                </small>
              </p>
              <button class="btn btn-danger">
                <RouterLink
                  class="link-underline link-underline-opacity-0 text-light fw-bold"
                  :to="{
                    name: 'editblog',
                    params: { id: blog.id }
                  }"
                >
                  Edit Blog
                </RouterLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      blogs: [],
      featuredBlogs: [],
      apiUrl: import.meta.env.VITE_APP_BASE_URL,
      year: 0,
      month: 0,
      day: 0
    }
  },
  methods: {
    async fetchBlogs(params) {
      const response = await axios.get(`${this.apiUrl}/api/blogs?populate=*${params}`)
      return response.data
    },
    async fetchAllBlogs() {
      const [featuredResponse, response] = await Promise.all([
        this.fetchBlogs('&filters[isFeatured][$eq]=true'),
        this.fetchBlogs('&filters[isFeatured][$eq]=false')
      ])
      this.featuredBlogs = featuredResponse.data
      this.blogs = response.data
    },
    formatDate(d) {
      const date = new Date(d)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return {
        formattedDate: `${year}-${month}-${day}`,
        year,
        month,
        day
      }
    }
  },
  created() {
    this.fetchAllBlogs()
  }
}
</script>
