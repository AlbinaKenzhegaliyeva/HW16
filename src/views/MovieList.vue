<template>
  <main>
    <Header />
    <div v-for="searchMoive in searchMoives" :key="searchMoive.id" class="searchMovie">
      <p>{{ searchMoive.title }}</p>
    </div>
    <div class="top20">
      <div class="search">
        <button @click="goToSearch">Go to search a movie</button>
      </div>
      <h2>Top 20</h2>
      <div v-for="(movie, index) in movies" :key="index" class="movie">
        <p @click="goToMovie(movie.id)">{{ movie.title }}</p>
      </div>
    </div>
    <div class="movieList">
      <div>
        <div v-for="(result, index) in results" :key="index" class="movieList_raiting">
          <p>{{ result.title }}</p>
        </div>
        <br />
        <button @click="getRating">Show rating 9+</button>
      </div>
      <div>
        <div v-for="(year, index) in years" :key="index" class="movieList_year">
          <p>{{ year.title }}</p>
        </div>
        <br />
        <button @click="getYear">Show 2000's movies</button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import router from '@/router'
import Header from '../components/Header.vue'


export default (await import('vue')).defineComponent({
  name: 'MovieList',
  components: { Header},
  props: ['searchMoives'],
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
        .get('https://imdb-api.com/en/API/Top250Movies/k_fy8lbsmd')
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
  padding: 5px 0 5px 0;
}
h2 {
  color: blueviolet;
  padding: 0 0 20px 20px;
}
p {
  font-size: 15px;
  font-weight: bold;
}
.top20 {
  background-color: rgb(179, 156, 200);
}
.movie {
  padding: 20px 0 20px 20px;
}
.movieList {
  display: flex;
  gap: 250px;
  padding: 0 0 10px 250px;
  background-color: lightpink;
}
.movieList_raiting {
  padding-top: 50px;
}
.search {
  padding: 30px 0 20px 600px;
}
button {
  width: 100px;
  border: 3px solid palevioletred;
  border-radius: 15px;
  background-color: plum;
  font-size: 14px;
}
.searchMovie {
  background-color: rgb(179, 156, 200);
  padding: 20px 0 20px 20px;
}
</style>
