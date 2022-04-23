<template>
  <div>
    <div id="error404">404</div>
    <div id="notFound">
      Page not found <br />
      <router-link to="/">Back Home</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#error404 {
  text-align: center;
  margin-right: 100px;
  margin-top: 100px;
  font-size: 5em;
}
#notFound {
  text-align: center;
  margin-right: 100px;
  margin-bottom: 500px;
}
@media (min-width: 1100px) {
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
}
@media screen and (max-width: 802px) and (min-width: 481px) {
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>