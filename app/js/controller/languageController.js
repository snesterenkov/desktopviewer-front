'use strict';

app.controller( 'LanguageController',['$scope','$translate', function($scope,$translate) {
    $scope.languages = [
        { name: 'ru'},
        { name: 'en'}
    ];

    $scope.selectedLanguage = $scope.languages[0];

    $scope.changeLanguageListener = function() {
        $translate.use($scope.selectedLanguage.name);
    };
}]);
