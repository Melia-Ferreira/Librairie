<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");

const emit = defineEmits(["ajouterL"]);
</script>

<template>
  <form @submit.prevent="$emit('ajouterL', libelle)">
    <input
      type="titre"
      v-model="libelle"
      placeholder="Renseignez le titre du livre"
    />
    <input type="submit" value="ajouter" />
  </form>
</template>

<style scoped>
</style>
