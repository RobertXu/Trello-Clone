window.Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    "submit #list_form": "submit"
  },

  render: function(){
    /*
    The model is actually the board and not the list. wai life so hard.

    WAIIIIIIII?

    Look at da lists function of board.js
    */
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newList = new window.Trellino.Models.BoardList(params.list);

    /*

    Wai I have to use params.list.board_id and not newList.board_id?
    */

    listBoard = window.Trellino.Collections.boards.get(params.list.board_id);

    newList.board_id = listBoard.id;

    newList.save({}, {
      success: function(){
        listBoard.lists().add(newList);
        // Backbone.history.navigate("#boards/"+listBoard.id, {trigger: true});
      }
    })
  }
})