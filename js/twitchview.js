var TWITCHY = TWITCHY || {};


/**
   - [x] User Story 1: I can see whether Free Code Camp is currently streaming on Twitch.tv

   - [x] User Story 2: I can click the status output and be sent directly to the Free Code Camp Twitch.tv channel

   - [x] User Story 3: If a Twitch user is currently streaming, I can see additional details about what they are streaming

   - [x] User Story 4: I will see a placeholder navigation if a streamer has closed their Twitch account
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

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiurl = 'https://wind-bow.gomix.me/twitch-api';
    var api = proxy + apiurl;

    var cardtemplate =
        '<div class="col-sm-3"> \
            <div class="card-block">\
              <img class="card-img-top" src="{{STREAMIMAGE}}" width="200" alt="Card image cap">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <p class="card-text"><strong>Status</strong>: <a href="{{CHANNELURL}}" target="_blank">{{STREAMSTATUS}}</a></p>\
              <p class="card-text">{{STREAMINFO}}</p>\
              <a href="{{CHANNELURL}}" target="_blank" class="btn btn-primary">Visit Channel</a>\
            </div>\
          </div>\
        </div>';

    var cardtemplate_noexist =
        '<div class="col-sm-3"> \
            <div class="card-block">\
              <img class="card-img-top" src="http://placehold.it/200x200" width="200" alt="Card image cap">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <p class="card-text">Does not exist</p>\
            </div>\
          </div>\
        </div>';

    var simpletemplate = "<li></li>";

    /**
     */
    function handleChannelInfo(data) {
        var streamDiv = $('#streams'),
	    matches,
	    status,
	    streaminfo,
	    streamData,
	    re,
	    logo,
	    channelURL,
	    markup,
	    channelName;

        if (data.hasOwnProperty('error')) {
	    re = /Channel \'([a-zA-Z0-9_]+)\' does not exist/g;
	    matches = re.exec(data.message);

	    if (matches && matches.length == 2) {
		channelName = matches[1];
		channelInfo[channelName] = {'status': 404, 'message': data.message};
	    }

            markup = cardtemplate_noexist.replace(/{{STREAMTITLE}}/g, channelName);
            $(markup).appendTo(streamDiv);

        } else {
            channelInfo[data.name] = data;

	    streamData = streamStatus[data.name];
	    if ((streamData === undefined) || (streamData.stream === null) ){
		status = "Currently Offline";
		streaminfo = "&nbsp;";
	    } else {
		status = "Currently Streaming";
		streaminfo = data.status;
	    }

	    logo = data.logo || "https://placebear.com/200/200";
	    channelURL = data.url;

            markup = cardtemplate
                .replace(/{{STREAMTITLE}}/g, data.display_name)
                .replace(/{{STREAMSTATUS}}/g, status)
                .replace(/{{STREAMINFO}}/g, streaminfo)
		.replace(/{{CHANNELURL}}/g, channelURL)
                .replace(/{{STREAMIMAGE}}/g, logo);
            $(markup).appendTo(streamDiv);
        }
    }


    /**
     * Callback for stream info API call.  Stores info about each stream
     * and gets info about each channel.
     */
    function handleStreamInfo(data) {
        var streamname;

        streamname = data._links.channel.split('/').pop();
        streamStatus[streamname] = data;

        $.getJSON(api + '/channels/' + streamname, handleChannelInfo).fail(function() {
            console.log("Get channel info for", streamname, "failed");
        });
    }


    /**
     */
    function listStreams() {
        var url;

        for (var i=0; i < streams.length; i++) {
            url = api + '/streams/' + streams[i];
            $.getJSON(url, handleStreamInfo).fail(function() {
                console.log("--- channelData call failed ----");
            });
        }
    }

    return {
        listStreams: listStreams
    };

})();


TWITCHY.Main.listStreams();
