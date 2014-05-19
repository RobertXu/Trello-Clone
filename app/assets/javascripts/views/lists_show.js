window.Trellino.Views.ListShow = Backbone.View.extend({
  template: JST["lists/show"],

  className: 'col-xs-3',

  events: {
    "keypress .new_card": "makeCard"
  },

  initialize: function(){
    this.listenTo(this.model.cards(), 'sync add', this.render);
  },

  makeCard: function(event){
    if (event.which === 13) {
      var title = $(event.target).val();
      var list = this.model

      var newCard = new window.Trellino.Models.ListCard({title: title});
      newCard.attributes.list_id = list.id;
      newCard.attributes.rank = this.model.nextRank();

      newCard.save({}, {
        success: function(){
          list.cards().add(newCard);
        }
      })
    }
  },

  render: function(){
    renderedContent = this.template({
      list: this.model
    });

    this.$el.css({
         'border' : '2px solid black',
         'float'  : 'left'
        });

   this.$el.html(renderedContent);

    $attach_cards = this.$('#cards_go_here');

    var sortedCards = this.model.cards().sort();

    sortedCards.each(function(card)
      {
        var view = new window.Trellino.Views.CardShow({
          model: card
        });
        $attach_cards.append(view.render().$el);
      })

    return this;
  }
});