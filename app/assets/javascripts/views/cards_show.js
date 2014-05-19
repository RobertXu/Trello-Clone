window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],

  className: "moveable",

  render: function(){
    renderedContent = this.template({
      card: this.model
    })

    this.$el.html(renderedContent);

    return this;
  }
})