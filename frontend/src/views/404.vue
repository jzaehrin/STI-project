<template>
  <div style="width: 50%; margin: 30px auto;">
    <h1 class="display-2 primary--text">Whoops, 404</h1>
    <p>The page you were looking for does not exist</p>
    <v-btn
      to="/"
      outlined
      primary
    >
      Get me out of here!
    </v-btn>
  </div>
</template>

<script>
export default {
  name: '404',
};
</script>
