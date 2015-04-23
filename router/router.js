Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('homepage', {
        path: '/'
    });
    this.route('maps', {
        path: '/maps'
    });
    //
    //this.route('contacts.show', {
    //    path: '/contacts/:_id'
    //});
});

//Router.route('/', function () {
//    this.render('MyTemplate');
//});