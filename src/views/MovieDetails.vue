<template>
  <div class="details">
    <Header />
    <div class="movie_details">
      <h1>User's id: {{ this.$route.params.id }}</h1>
      <p>{{ this.movieDetails.title }}</p>
      <img :src="this.movieDetails.image" id="poster" />
      <p>Year: {{ this.movieDetails.year }}</p>
      <p>Rating: {{ this.movieDetails.imDbRating }}</p>
      <p>Genres: {{ this.movieDetails.genres }}</p>
      <br /><br />
      <p>CAST:</p>
      <div v-for="(actor, index) in this.actors" :key="index">
        <div class="cast">
          <img id="actor" :src="actor.image" />
          <p>{{ actor.name }} as character {{ actor.asCharacter }}</p>
        </div>
      </div>
      <p>WATCH ALSO:</p>
      <div v-for="(similar, index) in this.movieDetails.similars" :key="index" class="title">
        <img :src="similar.image" id="poster" />
        <p>{{ similar.title }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/router'
import axios from 'axios'
import Header from '../components/Header.vue'

export default (await import('vue')).defineComponent({
  name: 'MovieDetails',
  data() {
    return {
      movieDetails: '',
      actors: ''
    }
  },
  components: { Header },
  mounted() {
    console.log(router)

    axios
      .get(`https://imdb-api.com/en/API/Title/k_w802a7tr/${this.$route.params.id}`)
      .then((res) => {
        this.movieDetails = res.data
        this.actors = res.data.actorList.slice(0, 3)
        console.log(this.movieDetails)
        console.log(this.actors)
      })
      .catch((error) => {
        console.error(error)
      })
  }
})
</script>

<style>
.details {
  display: flex;
  flex-direction: column;
  text-align: center;
}
#poster {
  width: 300px;
  height: 300px;
}
#actor {
  width: 250px;
  height: 250px;
}
.cast {
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 30px 30px 30px 300px;
}
.title {
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 30px 30px 30px 300px;
}
p {
  font-size: 18px;
}
</style>
