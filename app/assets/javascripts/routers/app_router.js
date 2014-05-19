window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/:id": "boardShow"
  },

  boardsIndex: function() {
    window.Trellino.Collections.boards.fetch();

    var indexView = new window.Trellino.Views.BoardsIndex({
      collection: window.Trellino.Collections.boards
    });
    this._swapView(indexView)
  },

  boardShow: function(id){

    var board = window.Trellino.Collections.boards.getOrFetch(id);
    var showView = new window.Trellino.Views.BoardShow({
      model: board
    });
    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this.currentViewt){
      this.currentView.remove();
    }

    $("#content").html(newView.render().$el);

    this.currentView = newView;
  }
});