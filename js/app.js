(function($) {

/////////
//Database design
////////
//List all the databases in the application. 
//Create the applicaiton 

    var ScrippsRanchLocation = new google.maps.LatLng(32.88916, -117.25316);

    var Map = Backbone.Model.extend({
        defaults: {
            // latitude: 32.88916,
            latitude: ScrippsRanchLocation.lat(),
            longitude: ScrippsRanchLocation.lng(),
            centered: false
            
        }

    });

    //Create the surf marker model. right now, all it is
    //is a url
    //The url for the client goes in the collection init method, since we
    //are trying to create 
    var SurfMarker = Backbone.Model.extend({
        // url: 'http://localhost:8080/messages'
    })

    var Markers = Backbone.Collection.extend({
        model: SurfMarker,
        url: 'http://localhost:8080/markers'

    })
    
    var MapView = Backbone.View.extend({
        map: null,
        model: null,

        initialize: function(model) {
            this.model = model
            
            _.bindAll(this, 'render');
            this.render();
            google.maps.event.addListener(this.map, 'click', function(event) {
                console.log(event); 
                //self.model.set({"location": event.latLng, "centered": false});
            }); 
        },

        render: function() {
            // console.log(this.model.get('latitude')); 
            //render th emodel

            var latlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
            var options = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            this.map = new google.maps.Map($('.map')[0], options); 
            //bind the model to the map
            this.model.bind('change', this.render);

            return this;
        },
    });

    var HeaderView = Backbone.View.extend({

        //Store a reference for the view
        thisMapView: null,
        geocoder: new google.maps.Geocoder(),
        //Stands for element!
        el: $('header'),
        
        events: {
            // Whenever theres a key press,
            // we get that event and place it in the query
            // function.
            "keypress #query-address": "query"
        },

        initialize: function(view) {

            _.bindAll(this, "query")
            thisMapView = view;

            return this;
        },
        //Method Goal: to take the user input from theiry key code,
        //and return the user query 
        query: function(e) {
            //if the key code doesn't equal enter, don't do anyting
            if (e.keyCode !== 13) { return; }
            //cancel's the event in jquery. 
            e.preventDefault();

            var input = $('#query-address');
            var address = input.val();
            
            if (address) { 
                var self = this;
                this.geocoder.geocode( {'address': address}, function(results, status) {
                    if (status === "OK") {
                        var position = results[0].geometry.location;
                        if (position) {

                            console.log(mapView.model);
                            mapView.model.set({"latitude":position.lat(), "longitude":position.lng(), "centered":true });

                        }
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });

            } else {
                input.val('');
            } 
        }

    });
    // Create the app 
    var AppRouter = Backbone.Router.extend({
        mapModel: null,
        headerView: null, 
        mapView: null,

        routes: {
            "": "index"
        },

        initialize: function() {
            this.mapModel = new Map({});
            mapView = new MapView(this.mapModel);
            headerView = new HeaderView({view:this});

            ///////
            //Test out the server api by decalre and instance of 
            //a map marker collection

            markerCollection = new Markers({});
            console.log(markerCollection.url); 
            //////
            return this;
        },
        index: function() {
            var position = ScrippsRanchLocation;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    console.log(position); 
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                });
                this.mapModel.set({"latitude":position.lat(),
                                   "longitude":position.lng(),
                                   "centered":true });
            }
        }    
  
    });


var app = new AppRouter();
Backbone.history.start();
    

}(jQuery))