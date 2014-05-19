window.Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, 'sync' , this.render);
  },

  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    });


    this.$el.html(renderedContent);

    var $ul_content = this.$('#boards_ul');
    var $div_form = this.$('#form_div');

    var form_view = new window.Trellino.Views.BoardsNew();
    $div_form.append(form_view.render().$el);

    this.collection.each(function(board){
      var view = new window.Trellino.Views.BoardsIndexPiece({ model: board });
      $ul_content.append(view.render().$el);
    });

    return this;
  }
});

window.Trellino.Views.BoardsIndexPiece = Backbone.View.extend({
  template: JST["boards/index_piece"],

  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    return this;
  }
});