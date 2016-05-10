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
