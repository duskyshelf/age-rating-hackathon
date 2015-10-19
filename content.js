$(document).ready(function() {
  console.log("document ready");
  var lati;
  var longi;
  var url;
  var data;

  var locationFinder = function() { navigator.geolocation.getCurrentPosition(function(position) {
        lati = position.coords.latitude;
        longi = position.coords.longitude;
        console.log(lati);
        console.log(longi);
        url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lati + ',' + longi + '&key=AIzaSyAo8c47NS0NynIW1tzlu3MTHqUakcPzWzk';

        $.getJSON(url).then(function(data) {

          console.log(data.results[6].formatted_address);
          
          chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
            console.log(response.status);
          });

        });
      });
  };

  locationFinder();
});



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
