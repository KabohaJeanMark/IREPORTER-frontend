var marker

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(0.580584670867283, 32.53452250031705),

    zoom: 14,
  };

  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  google.maps.event.addListener(map, 'click', function (event) {
    selectedLocation = event.latLng

    if (marker && marker.setMap) {
      // hides already created marker
      marker.setMap(null);
    }
    // set marker on map
    marker = new google.maps.Marker({
      position: selectedLocation,
      map: map,
    });
    // Animate marker

    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 750);



    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latlng = {
      lat: selectedLocation.lat(),
      lng: selectedLocation.lng()
    }

    geocoder.geocode({
      'location': latlng
    }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          // hide already existing markers
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
          marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          var address_name = results[0].formatted_address
          infowindow.setContent(address_name);
          console.log(address_name)

          document.getElementById("set_location").value = "Latitude : " + selectedLocation.lat() + " Longitude : " + selectedLocation.lng()
          infowindow.open(map, marker);

          document.getElementById("latitude").value = selectedLocation.lat()
          infowindow.open(map, marker);
          document.getElementById("longitude").value = selectedLocation.lng()
          infowindow.open(map, marker);

          document.getElementById("street_address").value = address_name
          infowindow.open(map, marker);

        } else {
          window.alert('Please Select a valid location');
        }
      } else {
        window.alert('Please check your internet failed due to: ' + status);
      }
    });

  });
}

function initMap() {
  var myLatLng = {
    lat: 0.34238730737481193,
    lng: 32.589311599731445
  };

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 17,
    center: myLatLng,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    label: {
      fontWeight: 'bold',
      color: "#000",
      background: "white",
      fontSize: "13px",
      text: "Kobil Kamwokya Kampala Uganda",
    },
  });

}