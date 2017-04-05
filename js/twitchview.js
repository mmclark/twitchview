var TWITCHY = TWITCHY || {};


/**
   - [x] User Story 1: I can see whether Free Code Camp is currently streaming on Twitch.tv

   - [ ] User Story 2: I can click the status output and be sent directly to the Free Code Camp Twitch.tv channel

   - [ ] User Story 3: If a Twitch user is currently streaming, I can see additional details about what they are streaming

   - [ ] User Story 4: I will see a placeholder navigation if a streamer has closed their Twitch account
                       (or the account never existed).  (Test with brunofin and comster404).
 */



TWITCHY.Main = (function() {
    var streams = [
        "freecodecamp", "esl_sc2", "OgamingSC2", "cretetion",
        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
        "brunofin", "comster404",
    ];

    var streamStatus = {};
    var channelInfo = {};
    var noExistRE = /Channel \'([a-zA-Z0-9_]+)\' does not exist/g;

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiurl = 'https://wind-bow.gomix.me/twitch-api';
    var api = proxy + apiurl;

    var cardtemplate =
        '<div class="col-sm-4"> \
            <div class="card-block">\
              <img class="card-img-top" src="{{STREAMIMAGE}}" width="300" alt="Card image cap">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <p class="card-text">Status: {{STREAMTEXT}}</p>\
              <a href="#" class="btn btn-primary">Go somewhere</a>\
            </div>\
          </div>\
        </div>';

    var simpletemplate = "<li></li>";

    /**
     */
    function handleChannelInfo(data) {
        var streamDiv = $('#streams'),
	    matches,
	    status;

        console.log('--- handleChannelInfo ---');
        // console.log(data);

        if (data.hasOwnProperty('error')) {
            // console.log(data);
            console.log(data.message);

	    matches = noExistRE.exec(data.message);
	    if (matches.length == 2) {
		var channelName = matches[1];
		console.log('****', channelName, ' does not exist ******');
		channelInfo[channelName] = {'status': 404, 'message': data.message};
	    }

        } else {
            // console.log('adding', data.name, 'to the channel list');
            channelInfo[data.name] = data;

	    console.log("streams in list:", streams.length, " channels collected:", Object.keys(channelInfo).length);

	    var streamInfo = streamStatus[data.name];
	    console.log(">>>>>>>>> stream info for", data.name, "is", streamInfo);
	    if ((streamInfo === undefined) || (streamInfo.stream === null) ){
		status = "Currently Offline";
	    } else {
		status = data.status;
	    }

            var markup = cardtemplate
                .replace("{{STREAMTITLE}}", data.display_name)
                .replace("{{STREAMTEXT}}", status)
                .replace("{{STREAMIMAGE}}", data.logo);
            $(markup).appendTo(streamDiv);
        }
    }


    /**
     * Callback for stream info API call.  Stores info about each stream
     * and gets info about each channel.
     */
    function handleStreamInfo(data) {
        var streamname;

        // console.log("--- handleStreamInfo ---");
        // console.log(data);

        streamname = data._links.channel.split('/').pop();
        streamStatus[streamname] = data;

        if (data.stream === null) {
            console.log(streamname, 'is offline');
        } else {
            console.log(streamname, 'is currently streaming');
        }

        $.getJSON(api + '/channels/' + streamname, handleChannelInfo).fail(function() {
            console.log("Get channel info for", streamname, "failed");
        });
    }


    /**
     */
    function listStreams() {
        var url;

        for (var i=0; i < streams.length; i++) {
            console.log('---', streams[i], '---');
            url = api + '/streams/' + streams[i];
            $.getJSON(url, handleStreamInfo).fail(function() {
                console.log("--- channelData call failed ----");
            });
        }
    }

    /**
     * Get info about each channel
     */
    function listChannels() {
        var url, i;

        for (i=0; i < streams.length; i++) {
            console.log('---', streams[i], '---');
            url = api + '/channels/' + streams[i];
            $.getJSON(url, handleChannelInfo).fail(function() {
                console.log("--- channelData call failed ----");
            });
        }
    }


    return {
        listStreams: listStreams,
        listChannels: listChannels
    };

})();


TWITCHY.Main.listStreams();
//TWITCHY.Main.listChannels();
