var buildings={}, info_windows, map, bounding, target, marker_points;

marker_points = {
    black : new google.maps.Point(0,0),
    blue : new google.maps.Point(24,0),
    gray : new google.maps.Point(48,0),
    green : new google.maps.Point(72,0),
    lime : new google.maps.Point(96,0),
    magenta : new google.maps.Point(120,0),
    orange : new google.maps.Point(144,0),
    purple : new google.maps.Point(169,0),
    red : new google.maps.Point(192,0),
    teal : new google.maps.Point(216,0),
    white : new google.maps.Point(240,0),
    yellow : new google.maps.Point(264,0)
}

function initialize() {
    
    var mapOptions = {
        center: new google.maps.LatLng(36.767711595152576,-119.79276548410036),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom : 17,
        maxZoom : 19,
        streetViewControl: false,
        mapTypeControl : false
    };
    
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    bounding = new google.maps.LatLngBounds(
        new google.maps.LatLng(36.764914, -119.801037), 
        new google.maps.LatLng(36.770449, -119.786060)
    );
    
    createBuildingMarker( 'A',	    36.766766,	-119.798226,	'Administration Building' )
    createBuildingMarker( 'AC',	    36.766237,	-119.79637,	'Assessment Center' )
    createBuildingMarker( 'AH',	    36.766925,	-119.795941,	'Art/Home Economics' )
    createBuildingMarker( 'BE',	    36.767737,	-119.796934,	'Business Education' )
    createBuildingMarker( 'C',	    36.76836,	-119.797116,	'Cafeteria/Student Lounge' )
    createBuildingMarker( 'CDC',    36.767071,	-119.791574,	'Child Development Center' )
    createBuildingMarker( 'CS',	    36.768223,	-119.791296,	'Campus Service Center' )
    createBuildingMarker( 'CTC',    36.699763,	-119.776468,	'Career Technology Center' )
    createBuildingMarker( 'CW',	    36.767587,	-119.79475,	'CalWORKS' )
    createBuildingMarker( 'DO',	    36.768902,	-119.792712,	'District Office' )
    createBuildingMarker( 'EU',	    36.767337,	-119.7868,	'Euless Ball Park' )
    createBuildingMarker( 'F',	    36.768962,	-119.788506,	'Fieldhouse' )
    createBuildingMarker( 'FH',	    36.766805,	-119.79666,	'Forum Hall' )
    createBuildingMarker( 'FO',	    36.766237,	-119.795319,	'Humanities' )
    createBuildingMarker( 'FT',	    36.76757,	-119.787894,	'Football Practice Field' )
    createBuildingMarker( 'G',	    36.769392,	-119.796869,	'Gymnasium' )
    createBuildingMarker( 'HS',	    36.769159,	-119.793881,	'Health Sciences' )
    createBuildingMarker( 'LA',	    36.766246,	-119.795909,	'Language Arts' )
    createBuildingMarker( 'LI1',    36.766177,	-119.797454,	'Library' )
    createBuildingMarker( 'LI2',    36.766005,	-119.796746,	'Tutorial Center' )
    createBuildingMarker( 'LI3',    36.76622,	-119.796606,	'Learning Resources Center' )
    createBuildingMarker( 'MS',	    36.766908,	-119.79534,	'Speech/Music' )
    createBuildingMarker( 'OAB',    36.76738,	-119.797883,	'Old Administration Buildign' )
    createBuildingMarker( 'PA',	    36.768429,	-119.786253,	'Police Academy' )
    createBuildingMarker( 'PD',	    36.768343,	-119.791929,	'District Police' )
    createBuildingMarker( 'PG',	    36.769847,	-119.796005,	'Practice Gym' )
    createBuildingMarker( 'PPC',    36.769383,	-119.788678,	'Physical Performance Center' )
    createBuildingMarker( 'RS',	    36.767741,	-119.790083,	'Ratcliff Stadium' )
    createBuildingMarker( 'S',	    36.766134,	-119.794503,	'Math/Science' )
    createBuildingMarker( 'SC',	    36.76824,	-119.796081,	'Student Center/Bookstore' )
    createBuildingMarker( 'SF',	    36.769074,	-119.78974,	'Soccer Field' )
    createBuildingMarker( 'SO',	    36.767131,	-119.796896,	'Social Sciences' )
    createBuildingMarker( 'ST',	    36.766891,	-119.797379,	'Student Services' )
    createBuildingMarker( 'T',	    36.767269,	-119.79593,	'Applied Technology' )
    createBuildingMarker( 'TA',	    36.766736,	-119.794804,	'Theatre Arts' )
    createBuildingMarker( 'VM',	    36.768472,	-119.796606,	'Veterans Peace Memorial' )
    
    target = new google.maps.Marker({
        map     : map,
        position: buildings.BE.marker.getPosition(),
        icon    : {
            anchor : {x:24,y:36},
            url :"http://citzero.com/map/images/target.gif",
        },
        optimized: false,
        visible : false
    })
    
    google.maps.event.addListener( map, 'click', closeAllInfoWindows);
    google.maps.event.addListener( map, 'drag', checkBounds);
    
}

function createBuildingMarker( id, lat, lon, iwc, org ){
    var marker_org = org || marker_points.black;
    buildings[id] = {
        marker : new google.maps.Marker({
            map     : map,
            position: new google.maps.LatLng( lat, lon ),
            icon    : {
                origin: marker_org,
                size: new google.maps.Size( 24, 24 ),
                url:"http://citzero.com/map/images/markers.png"
            }
        }),
        info_window : new google.maps.InfoWindow({
            "content":iwc
        })
    }
    google.maps.event.addListener( buildings[id].marker, 'click', function(){
        closeAllInfoWindows();
        buildings[id].info_window.open( map, buildings[id].marker );
    });
}

function closeAllInfoWindows(){
    for( var i in buildings ){
        buildings[i].info_window.close();
    }
}

function checkBounds(){
    if( !bounding.contains( map.getCenter() ) ){
        var c = map.getCenter(),
        x = c.lng(),
        y = c.lat(),
        maxX = bounding.getNorthEast().lng(),
        maxY = bounding.getNorthEast().lat(),
        minX = bounding.getSouthWest().lng(),
        minY = bounding.getSouthWest().lat();

        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;
   
        map.setCenter(new google.maps.LatLng(y, x));
    }
}