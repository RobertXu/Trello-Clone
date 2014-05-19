window.Trellino.Views.BoardsNew = Backbone.View.extend({
  template: JST["boards/new"],

  events: {
    "submit #board_form": "submit"
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new window.Trellino.Models.Board(params.board);

    newBoard.save({}, {
      success: function (){
        window.Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("#boards/"+newBoard.id, {trigger: true});
      }
    })
  }
});