window.Trellino.Collections.Boards = Backbone.Collection.extend({
  model: window.Trellino.Models.Board,
  url: "/api/boards",

  allUsers: [],

  containsUser: function(email){
    return this.members.indexOf(email) > -1;
  },

  parse: function(jsonResp){

    if (jsonResp.users){
      var currentUsers = [];
      for (var i = 0; i < jsonResp.users.length; i++){
        currentUsers.push(jsonResp.users[i].email);
      }
      this.allUsers = currentUsers;
    }
    return jsonResp.boards
  },

  getOrFetch: function(id){
    var boards = this;
    var board;

    if (board = this.get(id)){
      board.fetch();
    } else{

      board = new window.Trellino.Models.Board({ id: id});
      board.fetch({
        success: function() { boards.add(board); }
      });
    }

    return board;
  }
});

window.Trellino.Collections.boards = new window.Trellino.Collections.Boards();
