////////////
/// ACCOUNTS
////////////

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

///////////
/// HELPERS
///////////

Template.images.helpers({
  images:Images.find({}, {sort:{img_name:1}})
});

// think helper for displaying messages
Template.chat.helpers({
  messages:function(){
    var chat = Chats.findOne({_id:this._id});
    if (!chat){
      return;
    } else {
      return chat.messages;
    }
  }
})

Template.chats.helpers({
  chats:Chats.find({}, {sort:{createdOn:-1}})
});

//////////
/// EVENTS
//////////

Template.images.events({
  'click .js-show-image-form':function(event) {
    $("#image_add_form").modal('show');
  },
  'click .js-del-image':function(event) {
    var image_id = this._id;
    var currentUser = Meteor.userId();
    var image_creator = this.createdBy;
    if (currentUser != image_creator) {
      sAlert.warning("You must have added an image to delete it!");
    } else {
      $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
      })
    }
  }
});

Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_name, img_src, img_alt, img_desc;
      img_name = event.target.img_name.value;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      var userId = Meteor.userId();
      var user = Meteor.users.findOne({_id: userId});
      var name = user.username;
      console.log(name);
      Images.insert({
        img_name:img_name,
        img_src:img_src,
        img_alt:img_alt,
        createdBy:userId,
        createdByName:name,
        createdOn:new Date()
      });
      $("#image_add_form").modal('hide');
      return false;
    }
  });

  Template.chats.events({
    'click .js-show-chat-form':function(event) {
      $("#chat_add_form").modal('show');
    }
  });

  Template.chat_add_form.events({
      'submit .js-add-chat':function(event){
        event.preventDefault();
        var chat_topic;
        chat_topic = event.target.chat_topic.value;
        event.target.chat_topic.value = "";
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});
        var name = user.username;
        console.log(name);
        Chats.insert({
          chat_topic:chat_topic,
          createdBy:userId,
          createdByName:name,
          createdOn:new Date()
        });
        $("#chat_add_form").modal('hide');
        return false;
      }
    });

    Template.chat.events({
      'submit .js-send-chat':function(event){
        event.preventDefault();
        var chat = Chats.findOne({_id:this._id});
          var msgs = chat.messages;
        var message = event.target.chat.value;
        event.target.chat.value = "";
        if (!Meteor.userId()){
          sAlert.error("You must be logged in to send a message!");
        } else {
          var msgs = chat.messages;
          var userId = Meteor.userId()
          var user = Meteor.users.findOne({_id: userId});
          var username = user.username;
          if (!msgs) {
            msgs = [];
          }
          msgs.push({user:username, text:message, createdOn:new Date()})
          chat.messages = msgs;
          Chats.update(chat._id, chat);
        }
      }
    });
