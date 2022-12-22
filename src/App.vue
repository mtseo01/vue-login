<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
      <v-card>
        <v-list :items="items" item-title="name" item-value="id"></v-list>
        <v-list title="home"></v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Study Vue</v-toolbar-title>
      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>

        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    items: [
      {
        name: 'Home',
        id: 1
      },
      {
        name: 'Login',
        id: 2
      },
      {
        name: 'My Page',
        id: 3
      }
    ]
  })
}
</script>
