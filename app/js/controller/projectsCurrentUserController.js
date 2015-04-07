/**
 * Created by human on 06.04.2015.
 */
'use strict';

app.controller('ProjectsCurrentUserController',['$scope','user_projects',function($scope, user_projects){

    $scope.getProjects = function(){
        var successProjects = function(projects){
            $scope.userProjects = projects;
        }
        user_projects.getUserProjects().success(successProjects);
    };

    $scope.getProjects();
}]);