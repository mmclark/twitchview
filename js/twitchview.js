console.log("hello to twitch");

var proxy = 'https://cors-anywhere.herokuapp.com/';
var url = 'https://wind-bow.gomix.me/twitch-api/channels/freecodecamp/';

$.getJSON(proxy + url, function(data) {
    console.log(data);
}).done(function() {
    console.log("done");
}).fail(function() {
    console.log("fail");
    console.log(arguments);
});
