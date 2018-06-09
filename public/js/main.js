// Application-specific javascript.
var mainApplicationModuleName = 'main';
var mainApplicationModule = angular.module(mainApplicationModuleName, [
  'ngRoute',
  'ngResource',
  'pascalprecht.translate',
  'ngSanitize',
  'Core'
]);

// Configure this site to use hashbang navigation, for SEO of links inside the
// single-page application
mainApplicationModule.config([
  '$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

// Configure language translations.
mainApplicationModule.config([
  '$translateProvider',
  function($translateProvider) {
    $translateProvider
      .translations('us', english)
      .useSanitizeValueStrategy('sanitizeParameters')
      .preferredLanguage('us');
  }
]);

// Solve Facebook's redirect bug that adds a hash part to the application's URL
// after the OAuth authentication round trip.
if (window.location.hash === '#_=_') {
  window.location.hash = '#!';
}

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
  // $('.button-collapse').sideNav({
  //   closeOnClick: true
  // });
  $('.collapsible').collapsible();
  // $('.datepicker').pickadate({
  //   selectMonths: true, // Creates a dropdown to control month
  //   selectYears: 75, // Creates a dropdown of 75 years to control year
  //   max: new Date(),  // Sets the max date to today.
  // });
  $('.dropdown-button').dropdown({hover: true});
});
