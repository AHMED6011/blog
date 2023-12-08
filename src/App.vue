<template>
  <main>
    <header class="container-fluid p-0 justify-content-center bg-primary">
      <ul class="nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active fs-5" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/addBlog" class="nav-link fs-5">Add New Blog or Post</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/signin" class="nav-link fs-5">Sign In</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/signup" class="nav-link fs-5">Sign Up</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/test" class="nav-link fs-5">Test</RouterLink>
        </li>
      </ul>
    </header>
    <RouterView />
  </main>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.nav-link {
  color: #ccc;
}
.router-link-active.router-link-exact-active {
  color: #eee !important;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
