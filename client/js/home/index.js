'use strict'                                                                                                                                                 
import '../../scss/home.scss'

var app = angular.module('homePage', []);

app.controller('homePageController', function($scope) {
  $scope.HTML = '<b>Hello</b>';
  $scope.trips = [
    { 
      title: 'The most wonderful trip', 
      citiesVisited: 'Copenhagen, Stockholm, Amsterdam', 
      time: '2 weeks',
      body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }, {
      title: 'iusto odio dignissimos ducimus', 
      citiesVisited: 'qui blanditiis praesentium voluptatum deleniti atque', 
      time: '5 months',
      body: 'quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }, {
      title: 'Too many cities, too fast', 
      citiesVisited: 'unde omnis iste natus',
      time: '1 week',
      body: '. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }
  ];
});

