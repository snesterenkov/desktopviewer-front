/**
 * Created by human on 16.04.2015.
 */
'use strict';

services
    .factory('projectTransfer',function(){
        var userProjectItem = {};

        userProjectItem.company = {};
        userProjectItem.department = {};
        userProjectItem.project = {};

        userProjectItem.setUserProject = function(company, department, project){
            userProjectItem.company = company;
            userProjectItem.department = department;
            userProjectItem.project = project;
        }

        return userProjectItem;
    });
