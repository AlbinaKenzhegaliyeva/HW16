<template>
  <div>
    <h3>SEARCH</h3>
    <input type="text" v-model="query" @keyup="getResult(query)" />
    <MovieList :searchMoives="searchMoives" />
  </div>
</template>


<script>
import axios from 'axios'
import MovieList from './MovieList.vue'

export default (await import('vue')).defineComponent({
  name: 'SearchForm',
  components: { MovieList },
  data() {
    return {
      query: '',
      searchMoives: ''
    }
  },
  methods: {
    getResult(query) {
      axios
        .get(`https://imdb-api.com/en/API/SearchMovie/k_w802a7tr/${query}`)
        .then((res) => {
          this.searchMoives = res.data.results
          console.log(this.searchMoives)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
})
</script>

<style>
h3 {
  margin-left: 600px;
  color: red;
}
input {
  margin: 0 0 50px 600px;
  border-radius: 10px;
  padding: 3px;
}
</style>
