<template>
  <div>
    <BaseLoading type="grow" variant="warning" v-if="isLoading"/>
    <template v-if="profileData !== null">
      <MainBlock :profile-data="profileData"/>
      <ArtisansBlock :artisans-data="artisansData"/>
    </template>
  </div>
</template>

<script>
import BaseLoading from '@/components/BaseLoading'
import MainBlock from './MainBlock/Index'
import ArtisansBlock from './ArtisansBlock/Index'
// Traemos el mixin
import setError from '@/mixins/setError'
import { getApiAccount } from '@/api/search'

export default {
  name: 'ProfileView',
  // Damos de alta el mixin
  mixins: [
    setError
  ],
  components: {
    BaseLoading,
    MainBlock,
    ArtisansBlock
  },
  data () {
    return {
      isLoading: false,
      profileData: null
    }
  },
  created () {
    this.isLoading = true
    // Desestructuración -> this.$route.params -> { region: "eu", battleTag: "Horasohn-2399" }
    const { region, battleTag: account } = this.$route.params
    this.fetchData(region, account)
  },
  methods: {
    // Llamada API
    /**
       * Obtener los datos de la API
       * Guardarlos en 'profileData'
       * @param region {String}
       * @param account {String}
       */
    fetchData (region, account) {
      // Llamada a la API con los datos necesarios
      getApiAccount({ region, account })
        .then(({ data }) => {
          // Guardamos los datos en una variable local
          this.profileData = data
        })
        .catch((err) => {
          this.profileData = null
          // Creamos el objeto error
          const errObj = {
            routeParams: this.$route.params,
            message: err.message
          }
          if (err.response) {
            errObj.data = err.response.data
            errObj.status = err.response.status
          }
          // Hacemos uso del Mixin
          // Guardamos el objeto en el Store
          this.setApiErr(errObj)
          // Navegamos a la ruta de nombre 'Error'
          this.$router.push({ name: 'Error' })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  computed: {
    artisansData () {
      return {
        blacksmith: this.profileData.blacksmith,
        blacksmithHardcore: this.profileData.blacksmithHardcore,
        jeweler: this.profileData.jeweler,
        jewelerHardcore: this.profileData.jewelerHardcore,
        mystic: this.profileData.mystic,
        mysticHardcore: this.profileData.mysticHardcore
      }
    }
  }
}
</script>
