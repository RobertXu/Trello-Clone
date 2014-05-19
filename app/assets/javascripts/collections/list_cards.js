window.Trellino.Collections.ListCards = Backbone.Collection.extend({
  model: window.Trellino.Models.ListCard,

  comparator: function(card){
    return card.rank;
  },

  url: function() {
    return "/api/lists/" + this.list.id + "/cards"
  },

  initialize: function(models, options){
    this.list = options.list
  }
})