<script setup>
import { reactive, onMounted } from "vue";
import LibrairieListe from "./LibrairieListe.vue";
//import LibrairieForm from "./LibraireForm.vue";
import Livre from "../Livre";

const listeL = reactive([]);

// on indique l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/19/livres";

// -- handler pour 'faire/défaire' une chose à prtir de l'index dans la liste
function handlerFaire(ch) {
  console.log(ch);
  // -- faire la chose
  ch.faire();
  // -- entête http pour la req AJAX
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(chose),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des choses
      getLivres();
    })
    .catch((error) => console.log(error));
}
// -- handle pour supprimer une chose à prtir de l'id de la chose
function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}
// handle pour ajouter un nouveau livre à partir de son titre, sa quantité et son prix
function handlerAjoutLivre(titre, quantiteStock, prix) {
  console.log(titre, quantiteStock, prix);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // le libelle de la nouvelle chose est envoyé au serveur via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(
      { titre: titre },
      { quantiteStock: quantiteStock },
      { prix: prix }
    ),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}
// -- req AJAX pour récupérer les todos
//    et les stocker dans le state listeC
function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // vider la liste des livres
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeL
      dataJSON.forEach((v) => listeL.push(new Livre(v.id, v.titre, v.prix)));
    })
    .catch((error) => console.log(error));
}
// fonction du cycle de vie du composant exécutée 1 seule fois à la création
onMounted(() => {
  getLivres();
});
</script>

<template>
  <h3>Liste des livres</h3>
  <LibrairieForm @addC="handlerAjoutLivre"></LibrairieForm>
  <ul>
    <LibrairieListe
      v-for="livre of listeL"
      :key="livre.id"
      :livre="livre"
      @suppL="handlerDelete"
      @faireC="handlerFaire"
    />
  </ul>
</template>

<style scoped>
</style>
