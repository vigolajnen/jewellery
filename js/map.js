function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: activeCity.center,
    zoom: 9,
    styles: [{
      "featureType": "landscape",
      "stylers": [{
        "hue": "#FFBB00"
      },
      {
        "saturation": 43.400000000000006
      },
      {
        "lightness": 37.599999999999994
      },
      {
        "gamma": 1
      }
      ]
    },
    {
      "featureType": "road.highway",
      "stylers": [{
        "hue": "#FFC200"
      },
      {
        "saturation": -61.8
      },
      {
        "lightness": 45.599999999999994
      },
      {
        "gamma": 1
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [{
        "hue": "#FF0300"
      },
      {
        "saturation": -100
      },
      {
        "lightness": 51.19999999999999
      },
      {
        "gamma": 1
      }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [{
        "hue": "#FF0300"
      },
      {
        "saturation": -100
      },
      {
        "lightness": 52
      },
      {
        "gamma": 1
      }
      ]
    },
    {
      "featureType": "water",
      "stylers": [{
        "hue": "#0078FF"
      },
      {
        "saturation": -13.200000000000003
      },
      {
        "lightness": 2.4000000000000057
      },
      {
        "gamma": 1
      }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [{
        "hue": "#00FF6A"
      },
      {
        "saturation": -1.0989010989011234
      },
      {
        "lightness": 11.200000000000017
      },
      {
        "gamma": 1
      }
      ]
    }
    ]
  });

  var markers = activeCity.builds.map(function (build) {
    return new google.maps.Marker({
      map: map,
      position: build.location
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}

initMap();