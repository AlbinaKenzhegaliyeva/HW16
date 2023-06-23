<template>
  <main>
    <h1>Top 20 out of 250</h1>
    <div v-for="(movie, index) in movies" :key="index">
      <p @click="goToMovie(movie.id)">{{ movie.title }}</p>
    </div>
    <br /><br />
    <div class="movieList">
      <div class="movieList_raiting">
        <div v-for="(result, index) in results" :key="index">
          <p>{{ result.title }}</p>
        </div>
        <button @click="getRating">Show rating 9+</button>
      </div>
      <div class="movieList_year">
        <div v-for="(year, index) in years" :key="index">
          <p>{{ year.title }}</p>
        </div>
        <button @click="getYear">Show 2000's movies</button>
      </div>
      <div>
        <button @click="goToSearch">Search movie</button>
      </div>
    </div>
    <div v-for="searchMoive in searchMoives" :key="searchMoive.id">
      <p>{{ searchMoive.title }}</p>
      <!-- <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path" width="100px" /> -->
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default (await import('vue')).defineComponent({
  name: 'MovieList',
  props: ["searchMoives"],
  mounted() {
    this.getMovies()
  },
  data() {
    return {
      movies: [],
      results: '',
      years: ''
    }
  },
  methods: {
    getMovies() {
      axios
        .get('https://imdb-api.com/en/API/Top250Movies/k_w802a7tr')
        .then((res) => {
          console.log(res.data.items.slice(0, 20))
          this.movies = res.data.items.slice(0, 20)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    goToMovie(id) {
      router.push({ path: `/movies/${id}` })
      console.log(id)
    },
    getRating() {
      this.results = this.movies.filter((movie) => movie.imDbRating > 9)
      for (let i = 0; i < this.results.length; i++) {
        console.log(this.results[i].title)
      }
    },
    getYear() {
      this.years = this.movies.filter((movie) => movie.year > 2000)
      for (let i = 0; i < this.years.length; i++) {
        console.log(this.years[i].title)
      }
    },
    goToSearch() {
      router.push({ path: `/movies` })
    }
  }
})
</script>

<style>
h1 {
  color: red;
  padding-bottom: 20px;
}
#film {
  width: 250px;
  height: 250px;
}
.movieList {
  display: flex;
  gap: 250px;
}
</style>
