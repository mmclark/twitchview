
var twitchy = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    url: 'https://wind-bow.gomix.me/twitch-api/channels/freecodecamp/',

    test: function() {
        $.getJSON(this.proxy + this.url, function(data) {
            console.log(data);
        }).done(function() {
            console.log("done");
        }).fail(function() {
            console.log("fail");
            console.log(arguments);
        });
    },

    getChannels: function () {
        console.log("getChannels: not implemented yet");
    },

    getChannelInfo: function () {
        console.log("getChannelInfo not implemented yet");
    }
};

twitchy.test();


