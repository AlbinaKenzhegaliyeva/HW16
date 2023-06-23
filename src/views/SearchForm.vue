<template>
  <div>
    <h1>SEARCH</h1>
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
