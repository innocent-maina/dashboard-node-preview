<template>
  <div class='home'>
    Hello world
    <ul v-for='recipe in recipes' :key='recipe.title'>
      <li>
        {{ recipe.description }}
      </li>
    </ul>
    <button @click="save()">
      Send and Save
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      recipes:
      {
        sessionId: Math.floor(Math.random() * 10) + 1,
        name: 'Pizza',
        description: 'Yummy pizza for those lazy days',
      },
    }
  },
  methods: {
    save() {
      console.log('save button clicked')
      return axios.post('http://localhost:3000/api/v1/projects', this.recipes
      ), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers:': 'content-type',
          'Sec-Fetch-Mode': 'cors',
          'Accept': '*/*'
        }
      }
    }
  }
};
</script>
