Router.configure({
  layoutTemplate:'layout'
});

Router.route('/', function() {
  this.render('home')
});

Router.route('/trabajo_lodge', function() {
  this.render('trabajo_lodge')
});

Router.route('/image_gallery', function() {
  this.render('image_gallery')
});

Router.route('/club_chat', function() {
  this.render('chat')
});
