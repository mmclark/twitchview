var TWITCHY = TWITCHY || {};


TWITCHY.Main = (function() {

    function hello() {
        console.log('hello');
    }

    return {
        hello: hello
    }

})();

var oldtwitchy = {
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

TWITCHY.Main.hello();


