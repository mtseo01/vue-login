<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
      <v-list density="compact">
        <v-list-item
          title="Home"
          value="home"
          router
          :to="{ name: 'home' }"
        ></v-list-item>
        <v-list-item
          title="Login"
          value="login"
          router
          :to="{ name: 'login' }"
        ></v-list-item>
        <v-list-item
          title="MyPage"
          value="myPage"
          router
          :to="{ name: 'myPage' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Study Vue</v-toolbar-title>
      <template v-slot:append>
        <v-btn
          v-if="isLogin === false"
          router
          :to="{ name: 'login' }"
          append-icon="mdi-login"
          variant="text"
        >
          로그인
        </v-btn>
        <v-btn
          v-else
          append-icon="mdi-logout"
          variant="text"
          @click="$store.dispatch('logout')"
        >
          로그아웃
        </v-btn>
        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn id="menu-activator" icon="mdi-dots-vertical"></v-btn>
        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item title="Click Me 1" value="Click Me 1"> </v-list-item>
            <v-list-item title="Click Me 2" value="Click Me 2"> </v-list-item>
            <v-list-item title="Click Me 3" value="Click Me 3"> </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    items: [
      {
        name: 'Home',
        id: 1,
        router: '/'
      },
      {
        name: 'Login',
        id: 2,
        router: '/login'
      },
      {
        name: 'My Page',
        id: 3
      }
    ]
  }),
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    // ...mapActions(['logout'])
  }
}
</script>
