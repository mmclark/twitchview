var TWITCHY = TWITCHY || {};


TWITCHY.Main = (function() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiurl = 'https://wind-bow.gomix.me/twitch-api';  // channels/freecodecamp/';
  var cardtemplate =
      '<div class="col-sm-6"> \
          <div class="card"> \
            <div class="card-block">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <img  style="float:right; margin:1em;" src="{{STREAMIMAGE}}"  alt="Image for twitch stream"> \
              <p class="card-text">{{STREAMTEXT}}</p>\
              <a href="#" class="btn btn-primary">Go somewhere</a>\
            </div>\
          </div>\
        </div>';

  function hello() {
    console.log('hello from twitchy');
  }

  function listStreams() {
    console.log('listStreams ENTER');
    var url = proxy + apiurl + '/streams/featured';
    var fccurl = proxy + apiurl + '/streams/freecodecamp';

    $.getJSON(fccurl, function(data) {
      console.log("fcc info---------------------------");
      console.log(data);
      if (data.stream === null) {
	console.log("fcc is offline channel url:", data._links.channel);
	$.getJSON(proxy+apiurl+'/channels/freecodecamp', function(data) {
	  console.log("channel info ----------------------------");
	  console.log(data);

	  var markup = cardtemplate
	    .replace("{{STREAMTITLE}}", data.display_name)
	    .replace("{{STREAMTEXT}}", data.status)
	    .replace("{{STREAMIMAGE}}", data.logo);
	  $(markup).appendTo(streams);

	}).fail(function() {
	  console.log('getting channel info failed');
	});
      }

      // var streams = $('#streams');
      // for (var i=0; i < data.featured.length; i++) {
      // 	var markup = cardtemplate
      // 	    .replace("{{STREAMTITLE}}", data.featured[i].title)
      // 	    .replace("{{STREAMTEXT}}", data.featured[i].text)
      // 	    .replace("{{STREAMIMAGE}}", data.featured[i].image);
      // 	$(markup).appendTo(streams);
      // }
    }).fail(function() {
      console.log('call to', url, 'failed');
    });

    $.getJSON(url, function(data) {
      console.log("featured info---------------------------");
      console.log(data);
      var streams = $('#streams');
      for (var i=0; i < data.featured.length; i++) {
	var markup = cardtemplate
	    .replace("{{STREAMTITLE}}", data.featured[i].title)
	    .replace("{{STREAMTEXT}}", data.featured[i].text)
	    .replace("{{STREAMIMAGE}}", data.featured[i].image);
	$(markup).appendTo(streams);
      }
    }).fail(function() {
      console.log('call to', url, 'failed');
    });
  }

  return {
    hello: hello,
    listStreams: listStreams
  };

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
TWITCHY.Main.listStreams();
