<template>
  <section class="sb-about-text sb-p-90-0">
    <div class="container">
      <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go back to Home</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 20px;
}

.not-found h1 {
  font-size: 3rem;
  color: #ff6b6b;
}

.not-found p {
  font-size: 1.2rem;
  margin: 20px 0;
}

.not-found a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
