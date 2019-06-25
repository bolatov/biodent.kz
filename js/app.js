(function() {
    'use strict';

    angular.module('biodent', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap' /*, 'bootstrapLightbox'*/
        ,
        'mgcrea.ngStrap'
    ])
        .config([
            '$routeProvider',
            '$httpProvider',
            '$locationProvider',
            function($routeProvider, $http, $location) {
                $routeProvider.when('/about',
                                    {templateUrl : 'partials/about.html'})
                    .when('/services',
                          {templateUrl : 'partials/services.html'})
                    // .when('/members', {templateUrl : 'partials/members.html'})
                    .when('/contact',
                          {
                            templateUrl : 'partials/contact.html'
                            // ,
                            // controller : 'ContactCtl'
                          })
                    .when('/404', {templateUrl : 'partials/404.html'})
                    .when('/', {templateUrl : 'partials/main.html'})
                    .otherwise({redirectTo : '/404'});

                $location.html5Mode({
                    enabled : true,
                    requireBase : false,
                    rewriteLinks : true
                });
            }
        ])
        // .directive('googleMap',
        //            function() {
        //                // Runs during compile
        //                // https://www.youtube.com/watch?v=9Zfwq_yPWDQ
        //                // TODO:
        //                // 1. update API credentials. Restrict to a certain
        //                // domain.
        //                // 2. Multiple markers:
        //                //
        //                http://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
        //                return {
        //                    restrict : 'E',
        //                    template : '<div></div>',
        //                    replace : true,
        //                    link : function(scope, element, attrs) {
        //                        var myLatLng =
        //                            new google.maps.LatLng(attrs.lat,
        //                            attrs.lon);
        //                        var mapOptions = {
        //                            zoom : 17,
        //                            center : myLatLng
        //                        };
        //                        var map = new google.maps.Map(
        //                            document.getElementById(attrs.id),
        //                            mapOptions);
        //                        var marker = new google.maps.Marker({
        //                            //
        //                            position : myLatLng, //
        //                            map : map,           //
        //                            title : attrs.title, //
        //                            // animation :
        //                            google.maps.Animation.BOUNCE,
        //                        });
        //                        marker.setMap(map);
        //                    }
        //                };
        //            })
        .directive(
             'googleMap',
             function() {
                 // Runs during compile
                 // https://www.youtube.com/watch?v=9Zfwq_yPWDQ
                 // TODO:
                 // 1. update API credentials. Restrict to a certain
                 // domain.
                 // 2. Multiple markers:
                 // http://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
                 return {
                     restrict : 'E',
                     template : '<div></div>',
                     replace : true,
                     link : function(scope, element, attrs) {
                         var bounds = new google.maps.LatLngBounds();
                         var mapOptions = {
                             mapTypeId : google.maps.MapTypeId.ROADMAP
                         };

                         // Display a map on the page
                         var map = new google.maps.Map(
                             document.getElementById(attrs.id), mapOptions);
                         map.setTilt(45);

                         // Multiple Markers
                         var markers = [
                             [
                               'Биодент ЭК, г.Экибастуз',
                               51.71682,
                               75.331498
                             ],
                             [
                               'Биодент ЭК+, г.Павлодар',
                               52.290788,
                               76.9684119
                             ],
                             [
                                 'Медицинский центр, г.Нур-Султан',
                                 51.0954853,
                                 71.4181603
                             ]
                         ];

                         // Info Window Content
                         var infoWindowContent = [

                             ['<div class="info_content">' +
                                 '<h3>Биодент ЭК</h3>' +
                                 '<p>Клиника в г.Экибастуз</p>' +
                                 '<ul class="list-unstyled">' +
                                 '    <li>Пн-Пт. 08:00 - 20:00</li>' +
                                 '    <li>Сб. 08:00 - 17:00</li>' +
                                 '    <li>Вс. 10:00 - 17:00</li>' +
                                 '</ul>' +
                                 '</div>'],
                             ['<div class="info_content">' +
                                 '<h3>Биодент ЭК+</h3>' +
                                 '<p>Клиника в г.Павлодар</p>' +
                                 '<ul class="list-unstyled">' +
                                 '    <li>Пн-Пт. 09:00 - 20:00</li>' +
                                 '    <li>Сб. 09:00 - 18:00</li>' +
                                 '    <li>Вс. Выходной</li>' +
                                 '</ul><!-- /.list-unstyled -->' +
                                 '</div>']
                         ];

                         // Display multiple markers on a map
                         var infoWindow = new google.maps.InfoWindow(), marker,
                             i;

                         // Loop through our array of markers & place each one
                         // on the map
                         for (i = 0; i < markers.length; i++) {
                             var position = new google.maps.LatLng(
                                 markers[i][1], markers[i][2]);
                             bounds.extend(position);
                             marker = new google.maps.Marker({
                                 position : position,
                                 map : map,
                                 title : markers[i][0]
                             });

                             // Allow each marker to have an info window
                             google.maps.event.addListener(
                                 marker, 'click', (function(marker, i) {
                                     return function() {
                                         infoWindow.setContent(
                                             infoWindowContent[i][0]);
                                         infoWindow.open(map, marker);
                                     }
                                 })(marker, i));

                             // Automatically center the map fitting all markers
                             // on the screen
                             map.fitBounds(bounds);
                         }

                         // Override our map zoom level once our fitBounds
                         // function runs (Make sure it only runs once)
                         var boundsListener = google.maps.event.addListener(
                             (map), 'bounds_changed', function(event) {
                                 this.setZoom(8);
                                 google.maps.event.removeListener(
                                     boundsListener);
                             });
                     }
                 };
             })
        .controller('CarouselCtrl',
                    function($scope) {
                        $scope.myInterval = 3000; // 3000
                        $scope.noWrapSlides = false;
                        $scope.slides = [
                            'img/slider/img1.jpg', //
                            'img/slider/img2.jpg', //
                            'img/slider/img3.jpg'  //
                        ];
                    })
        // .controller(
        //      'CurrDateCtrl',
        //      [ '$scope', function($scope) { $scope.date = new Date(); } ])
        // .controller('ScrollCtrl', [
        //     '$scope',
        //     '$location',
        //     '$anchorScroll',
        //     function($scope, $location, $anchorScroll) {
        //         $scope.scrolltoHref = function(id) {
        //             // set the location.hash to the id of
        //             // the element you wish to scroll to.
        //             $location.hash(id);

        //             // call $anchorScroll()
        //             $anchorScroll();
        //         };
        //     }
        // ])
        // .controller('HeaderCtrl',
        //             function($scope, $location) {
        //                 $scope.isActive = function(viewLocation) {
        //                     return viewLocation === $location.path();
        //                 };
        //             })
        // .config(function(LightboxProvider) {
        //     // set a custom template
        //     LightboxProvider.templateUrl = 'partials/lightbox.html'
        // })
        // .controller(
        //      'GalleryCtrl',
        //      function($scope, Lightbox) {
        //          $scope.images = [
        //              {'url' : 'img/member1.jpg', 'caption' : 'Member 1'},
        //              {'url' : 'img/member2.jpg', 'caption' : 'Member 2'},
        //              {'url' : 'img/member3.jpg', 'caption' : 'Member 3'},
        //          ];

        //          $scope.openLightboxModal = function(index) {
        //              Lightbox.openModal($scope.images, index)
        //          };
        //      })
        .controller('MembersCtrl', function($scope) {
            // http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
            var members = [
                {
                  name : "Ордабаева Бибигуль Толегеновна",
                  position :
                      "Врач высшей категории. Стоматолог, парадонтолог, хирург, лазерный врач, детский стоматолог",
                  profilePicture : "img/members/ordabayeva_bibigul.jpg",
                  // experience: "30 лет"
                },
                {
                  name : "Молдажанов Талгат Толепбергенович",
                  position :
                      "Магистр медицины. Врач хирург-имплантолог, челюстно-лицевой хирург",
                  profilePicture : "img/members/moldazhanov_talgat.jpg"
                },
                {
                  name : "Молдажанов Жаркен Толепбергенович",
                  position : "Врач-стоматолог общей практики",
                  profilePicture : "img/members/moldazhanov_zharken.jpg"
                },
                {
                  name : "Абенов Азамат Толеуович",
                  position : "Дантист, терапевт, ортопед",
                  profilePicture : "img/members/abenov_azamat.jpg"
                },
                {
                  name : "Дементьева Галина Викторовна",
                  position : "Зубной врач-терапевт",
                  profilePicture : "img/members/dementyeva_galina.jpg"
                },
                {
                  name : "Легущенко Елена Сергеевна",
                  position : "Ассистент врача",
                  profilePicture : "img/members/legushenko_elena.jpg"
                },
                {
                  name : "Зарипова Зарина Рустамовна",
                  position : "Врач-стоматолог, терапевт (взрослый, детский)",
                  profilePicture : "img/members/zaripova_zarina.jpg"
                },
                {
                  name : "Жумагулова Гульбаршин Абдуллаевна",
                  position : "Врач-стоматолог, терапевт (взрослый, детский)",
                  profilePicture : "img/members/zhumagulova_gulbarshin.jpg"
                },
                {
                  name : "Кузембаева Айнура Толегеновна",
                  position : "Врач-стоматолог, терапевт (взрослый, детский)",
                  profilePicture : "img/members/kuzembayeva_aynura.jpg"
                },
                {
                  name : "Сорокина Диана Георгиевна",
                  position : "Косметолог-эстетист",
                  profilePicture : "img/members/sorokina_diana.jpg"
                },
                {
                  name : "Ерболатов Колганат Нургабылович",
                  position : "Зубной техник",
                  profilePicture : "img/members/erbolatov_kolkanat.jpg"
                },
                {
                  name : "Орлов Александр Александрович",
                  position : "Зубной техник",
                  profilePicture : "img/members/orlov_alexandr.jpg"
                },
                {
                  name : "Ордабаева Баян Толегеновна",
                  position : "Администратор",
                  profilePicture : "img/members/ordabayeva_bayan.jpg"
                },
                {
                  name : "Аншиц Юлия Сергеевна",
                  position : "Администратор",
                  profilePicture : "img/members/yuliya.jpg"
                },
            ];

            function chunk(arr, size) {
                var newArr = [];
                for (var i = 0; i < arr.length; i += size) {
                    newArr.push(arr.slice(i, i + size));
                };
                return newArr;
            }

            $scope.members = chunk(members, 3);
        });
}());
