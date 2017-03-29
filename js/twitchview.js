var TWITCHY = TWITCHY || {};


/**
   - [ ] User Story 1: I can see whether Free Code Camp is currently streaming on Twitch.tv

   - [ ] User Story 2: I can click the status output and be sent directly to the Free Code Camp Twitch.tv channel

   - [ ] User Story 3: If a Twitch user is currently streaming, I can see additional details about what they are streaming

   - [ ] User Story 4: I will see a placeholder navigation if a streamer has closed their Twitch account
                       (or the account never existed).  (Test with brunofin and comster404).
 */



TWITCHY.Main = (function() {
    var streams = [
	"ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
	"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
	"brunofin", "comster404",
    ];

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiurl = 'https://wind-bow.gomix.me/twitch-api';  // channels/freecodecamp/';
    var cardtemplate =
	'<div class="col-sm-4"> \
            <div class="card-block">\
              <img class="card-img-top" src="{{STREAMIMAGE}}" width="300" alt="Card image cap">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <p class="card-text">{{STREAMTEXT}}</p>\
              <a href="#" class="btn btn-primary">Go somewhere</a>\
            </div>\
          </div>\
        </div>';

    //              <img  style="float:right; margin:1em;" src="{{STREAMIMAGE}}"  alt="Image for twitch stream"> \

    function hello() {
	console.log('hello from twitchy');
    }

    function listStreams() {
	console.log('listStreams ENTER');
	var url = proxy + apiurl + '/streams/featured';
	var fccurl = proxy + apiurl + '/streams/freecodecamp';
	var queeneurl = proxy + apiurl + '/streams/QueenE';

	for (var i=0; i < streams.length; i++) {
	    console.log('---', streams[i], '---');
	    url = proxy + apiurl + '/streams/' + streams[i];
	    $.getJSON(url, function(data) {
		var streamname = data._links.channel.split('/').pop();
		if (data.stream === null) {
		    console.log(streamname, 'is offline');
		} else {
		    console.log(streamname, 'is currently streaming');
		}
	    	console.log(data);
	    }).fail(function() {
	    	console.log("streaminfo call failed");
	    });
	}

	/*
	$.getJSON(queeneurl, function(data) {
	    console.log("fcc info---------------------------");
	    console.log(data);

	    // if (data.stream === null) {
	    // 	console.log("fcc is offline channel url:", data._links.channel);
	    // 	$.getJSON(proxy+apiurl+'/channels/QueenE', function(data) {
	    // 	  console.log("channel info ----------------------------");
	    // 	  console.log(data);

	    // 	  var markup = cardtemplate
	    // 	    .replace("{{STREAMTITLE}}", data.display_name)
	    // 	    .replace("{{STREAMTEXT}}", data.status)
	    // 	    .replace("{{STREAMIMAGE}}", data.logo);
	    // 	  $(markup).appendTo(streams);

	    // 	}).fail(function() {
	    // 	  console.log('getting channel info failed');
	    // 	});
	    // }

	    $.getJSON(proxy+apiurl+'/channels/freecodecamp', function(data) {
		console.log("channel info ----------------------------");
		console.log(data);

		var markup = cardtemplate
		    .replace("{{STREAMTITLE}}", data.display_name)
		    .replace("{{STREAMTEXT}}", data.status)
		    .replace("{{STREAMIMAGE}}", data.profile_banner);
		$(markup).appendTo(streams);

	    }).fail(function() {
		console.log('getting channel info failed');
	    });

	    $.getJSON(proxy+apiurl+'/channels/queene', function(data) {
		console.log("channel info ----------------------------");
		console.log(data);

		var markup = cardtemplate
		    .replace("{{STREAMTITLE}}", data.display_name)
		    .replace("{{STREAMTEXT}}", data.status)
		    .replace("{{STREAMIMAGE}}", data.profile_banner);
		$(markup).appendTo(streams);

	    }).fail(function() {
		console.log('getting channel info failed');
	    });

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
	*/
	/*
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
        */

    } // listStreams()

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
