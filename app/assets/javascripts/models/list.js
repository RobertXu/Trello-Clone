window.Trellino.Models.BoardList = Backbone.Model.extend({
  urlRoot: "api/boards/" + this.board_id +"/lists",

  cards: function(){
    if (!this._cards){
      this._cards = new window.Trellino.Collections.ListCards([], {
        list: this
      });
    }
    return this._cards
  },

  nextRank: function(){
    if(!this._cards){
      return 1;
    } else{
      return this._cards.length + 1;
    }
  },

  parse: function(jsonResp){
    if (jsonResp.cards){
      this.cards().set(jsonResp.cards, {parse:true });
      delete jsonResp.cards;
    }
    return jsonResp
  }
});