window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",

  currentMembers: [],

  lists: function() {

    if (!this._lists){
      this._lists = new window.Trellino.Collections.BoardLists([], {
          board: this
      });
    }
    return this._lists;
  },

  nextRank: function(){
    if(!this._lists){
      return 1;
    } else{
      return this._lists.length + 1;
    }
  },

  parse: function(jsonResp){
    if (jsonResp.lists){
      this.lists().set(jsonResp.lists, {parse: true});
      delete jsonResp.lists;
    }
    if (jsonResp.members){
      var currentMembers = [];
      for (var i = 0; i < jsonResp.members.length; i++){
        currentMembers.push(jsonResp.members[i].email);
    }
    this.currentMembers = currentMembers
  }
      return jsonResp;
  }
});