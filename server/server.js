Meteor.startup(function(){
  if (Images.find().count() == 0) {
    Images.insert({
      img_name: "Lodge Lounge",
      img_src:"lounge.jpg",
      img_alt:"Lounge",
      createdOn:new Date()
    });
  }
});

Meteor.publish('images', function() {
  return Images.find();
});

Meteor.publish('chats', function() {
  return Chats.find();
});

Meteor.publish('blogs', function() {
  return Blog.Post.find();
});

///////////
/// METHODS
///////////

  Meteor.methods({
    'addChat':function(chat_topic, userId, name){
      console.log("server");
      var data = {
        chat_topic:chat_topic,
        createdBy:userId,
        createdByName:name,
        createdOn:new Date()
      }
      Chats.insert(data);
    },
    'addImage': function(img_name, img_src, img_alt, userId, name) {
      var data = {
        img_name:img_name,
        img_src:img_src,
        img_alt:img_alt,
        createdBy:userId,
        createdByName:name,
        createdOn:new Date()
      }
      Images.insert(data);
    },
    'sendMessage': function(chatId, data) {
      Chats.update(chatId, data);
    }
  });
