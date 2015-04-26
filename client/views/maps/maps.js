if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });

    var xsarus, routes, directionsDisplay, directionsService, directionsDisplay2, directionsService2, waypoints;

    Template.maps_route.helpers({
        exampleMapOptions: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                xsarus = new google.maps.LatLng(51.75246099, 4.17467905);
                routes = {
                    "default" : [
                        {
                            location: new google.maps.LatLng(51.75388564, 4.17336477),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75440036, 4.17558564),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75354691, 4.17582704),
                            stopover: false
                        }
                    ],
                    "long" : [
                        {
                            location: new google.maps.LatLng(51.75388564, 4.17336477),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75331446, 4.17096687),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.754583, 4.16985107),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75563234, 4.1726513),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75579837, 4.17387439),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75563234, 4.17623473),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.7546627, 4.17679263),
                            stopover: false
                        },
                        {
                            location: new google.maps.LatLng(51.75437711, 4.17564465),
                            stopover: false
                        }
                    ]
                };

                waypoints = [
                    {
                        location: new google.maps.LatLng(51.75388564, 4.17336477),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75331446, 4.17096687),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.754583, 4.16985107),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75563234, 4.1726513),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75579837, 4.17387439),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75563234, 4.17623473),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.7546627, 4.17679263),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75437711, 4.17564465),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75223097, 4.16598022),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.7528088, 4.16560471),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75298979, 4.16713893),
                        stopover: false
                    },
                    {
                        location: new google.maps.LatLng(51.75356927, 4.16882336),
                        stopover: false
                    }
                ];
                // Map initialization options
                return {
                    center: xsarus,
                    zoom: 18
                };
            }
        }
    });

    Template.maps_route.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('exampleMap', function(map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            directionsDisplay = new google.maps.DirectionsRenderer(),
                directionsService = new google.maps.DirectionsService();

            directionsDisplay.setMap(map.instance);
        });
    });

    Template.maps_route.events = {
        'click .routes a': function(ev) {
            ev.preventDefault();

            var request = {
                origin:xsarus,
                destination:xsarus,
                travelMode: google.maps.TravelMode.WALKING,
                waypoints: routes[$(ev.target).data('route')]
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
    };


    Template.maps_pinpoint.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('exampleMap2', function(map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            directionsDisplay2 = new google.maps.DirectionsRenderer(),
                directionsService2 = new google.maps.DirectionsService();

            directionsDisplay2.setMap(map.instance);

            generateRoute();
        });
    });

    function generateRoute() {
        var suffledWaypoints = _.shuffle(waypoints),
            request = {
                origin:xsarus,
                destination:xsarus,
                travelMode: google.maps.TravelMode.WALKING,
                waypoints: [
                    suffledWaypoints[0],
                    suffledWaypoints[1]
                ],
                optimizeWaypoints: true
            };
        directionsService2.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay2.setDirections(response);
            }
        });
    }

    Template.maps_pinpoint.helpers({
        exampleMap2Options: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                return {
                    center: xsarus,
                    zoom: 18
                };
            }
        }
    });

    Template.maps_pinpoint.events = {
        'click #GenerateNewRoute': function(ev) {
            ev.preventDefault();

            generateRoute();
        }
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
