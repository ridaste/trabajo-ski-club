Meteor.startup(function () {
    sAlert.config({
        effect: 'jelly',
        position: 'top-right',
        timeout: 2500,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 30,
        onClose: _.noop
    });
});
