window.Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: window.Trellino.Models.BoardList,

  url: function() {
    return this.board.url() + "/lists";
  },

  initialize: function (models, options){
    this.board = options.board;
  }
});