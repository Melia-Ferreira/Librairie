// on définit ce qu'est un livre
export default class Livre {
  constructor(id, titre, quantiteStock, prix) {
    this._id = id;
    this._titre = titre;
    this._quantiteStock = quantiteStock;
    this._prix = prix;
  }
  // les getters
  get id() {
    return this._id;
  }
  get titre() {
    return this._titre;
  }
  get quantiteStock() {
    return this._quantiteStock;
  }
  get prix() {
    return this._prix;
  }

  // les setters
  set titre(titre) {
    this._titre = titre;
  }
  set prix(prix) {
    this._prix = prix;
  }

  afficher() {
    return `--> ${this._titre} ${this._prix} ${this._quantiteStock}`;
  }
}
