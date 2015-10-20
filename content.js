
$(document).ready(function() {
  console.log("document ready");
  var myPlayer = document.getElementById('movie_player');
              // myPlayer.stopVideo();
  var lati;
  var longi;
  var url;
  var data;

  var locationFinder = function() { navigator.geolocation.getCurrentPosition(function(position) {
        lati = position.coords.latitude;
        longi = position.coords.longitude;
        // url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lati + ',' + longi + '&key=AIzaSyAo8c47NS0NynIW1tzlu3MTHqUakcPzWzk';
        bingurl = 'https://dev.virtualearth.net/REST/v1/Locations/' + lati + ',' + longi + '?o=json&key=AnubGj32WoWIlLRjLyKZUHh3KNF5lhRwNT2TTEJ3p-E92TKDcgMFs4MY_aNHCsoe';
        $.getJSON(bingurl).then(function(data) {
          console.log(data.resourceSets[0].resources[0].address.countryRegion);
          var fullTitle = $("title").text();
          var truncateAt = fullTitle.indexOf(" (");
          var trimmedString = fullTitle.substring(0, truncateAt);
          console.log(trimmedString);

          var RatingApiUrl = "https://cd4a7834.ngrok.io/rating/?name=" + trimmedString;

          $.getJSON(RatingApiUrl).then(function(data) {
            var videoRating = data.age;
            console.log("rating result");
            console.log(videoRating);


          // console.log(data.results[6].formatted_address);

          chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
            // THIS IS THE LOCAL STORAGE AGE PARAM
            var ageSetting = response.ageParam;
            var oldEnoughToWatch = response.ageParam >= data.age;
            console.log("age setting");
            console.log(ageSetting);
            console.log("allowed?");
            console.log(oldEnoughToWatch);

            if(!oldEnoughToWatch) {

            }


            if(videoRating != "Failure"){
              show_pop_up(videoRating, oldEnoughToWatch);
            }


          });
          });

        });
      });
  };

  locationFinder();
  // console.log($("title").text);
  // get_rating_id("Batman");
});

// var get_rating_id = function (name) {
//     console.log('get rating called');
//   var apiUrl = "http://api.kijkwijzer.nl/hackathon/suggest.php?term=" + name;
//   console.log(apiUrl);
//   $.getJSON(apiUrl).then(function(data) {
//     console.log(data[0].value);
//   });
// };



// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     var lati;
//     var longi;
//     var local;
//
//
//     if( request.message === "find_location" ) {
//
//       var nav = function() { navigator.geolocation.getCurrentPosition(function(position) {
//             console.log(position);
//             lati = position.coords.latitude;
//             longi = position.coords.longitude;
//             console.log(lati);
//             console.log(longi);
//           });
//       };
//       nav();
//
//       console.log("goodbye");
//     }
//
//   }
// );
