
$(document).ready(function() {
  var myPlayer = document.getElementById('movie_player');
  console.log(myPlayer);
  console.log("document ready");
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
          console.log(fullTitle);
          var firstIndex = 1000;
          var secondIndex = 1000;
          var thirdIndex = 1000;
          var fourthIndex = 1000;

          if (fullTitle.indexOf(" (") != -1 ) { firstIndex = fullTitle.indexOf(" ("); }
          if (fullTitle.indexOf(" - ") != -1) {secondIndex = fullTitle.indexOf(" - "); }
          if (fullTitle.indexOf(" Official") != -1) {thirdIndex = fullTitle.indexOf(" Official"); }
          if (fullTitle.indexOf(" Trailer") != -1) {fourthIndex = fullTitle.indexOf(" Trailer"); }
          var truncateAt = Math.min( firstIndex,
                                     secondIndex,
                                     thirdIndex,
                                     fourthIndex
                                   );
          // console.log(truncateAt);



          var trimmedString = fullTitle.substring(0, truncateAt);

          console.log(trimmedString);

          var RatingApiUrl = "https://65d039e8.ngrok.io/rating/?name=" + trimmedString;

          $.getJSON(RatingApiUrl).then(function(data) {
            console.log(data);
            var videoRating = parseInt(data.age);
            console.log("rating result");
            console.log(videoRating);

          // console.log(data.results[6].formatted_address);

          chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
            // THIS IS THE LOCAL STORAGE AGE PARAM
            var ageSetting = parseInt(response.ageParam);
            var oldEnoughToWatch = (ageSetting >= videoRating);

            // console.log("age setting");
            // console.log("allowed?");
            // console.log(ageSetting);
            // console.log(videoRating);
            // console.log(ageSetting >= videoRating);
            // console.log(oldEnoughToWatch);


            console.log(!isNaN(videoRating))
            if(!isNaN(videoRating)){
              if(!oldEnoughToWatch) {
                myPlayer.innerHTML = ' ';
                show_pop_up(videoRating, oldEnoughToWatch);
              // chrome.runtime.sendMessage({type:'show_pop_up_new'});
              }
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
