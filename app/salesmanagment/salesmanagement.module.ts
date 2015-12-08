import * as angular from 'angular';
import { CookAssignmentCtrl } from './cook-assigment/cook-assigment.controller';
import {SalesmanagementRestService} from "./common/salesmanagement.rest.service";
import {SalesmanagementService} from "./common/services/sales.service";
import {PositionStateNotificationService} from "./common/services/position-state-notification.service";
import {PositionsService} from "./common/services/positions.service";
import {CookPositionsCtrl} from "./cook-positions/cook-positions.controller";

angular.module('app.salesmanagement', ['app.main', 'app.offer-mgmt', 'app.sales-mgmt.templates', 'ui.grid', 'ui.grid.selection'])
    .config(function ($stateProvider: angular.ui.IStateProvider, oaspAuthorizationServiceProvider:any, ROLES:any, oaspTranslationProvider:any) {
        'use strict';
        oaspTranslationProvider.enableTranslationForModule('salesmanagement');

        $stateProvider.state('salesmanagement', {
            abstract: true,
            url: '/salesmanagement',
            template: '<ui-view/>'
        });

        $stateProvider.state('salesmanagement.cookPositions',
            oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.COOK).mayGoToStateDefinedAs(
                {
                    url: '/cook-positions',
                    templateUrl: 'salesmanagement/cook-positions/cook-positions.html',
                    controller: 'CookPositionsCtrl',
                    resolve: {
                        currentPositions: ['positions', function (positions) {
                            return positions.get();
                        }]
                    }
                }
            )
        );

        $stateProvider.state('salesmanagement.cookAssigment',
            oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.COOK).mayGoToStateDefinedAs(
                {
                    url: '/cook-assigment',
                    templateUrl: 'salesmanagement/cook-assigment/cook-assigment.html',
                    controller: 'CookAssignmentCtrl',
                    resolve: {
                        currentPositions: ['positions', function (positions) {
                            return positions.get();
                        }]
                    }
                }
            )
        );
    })
    .service('SalesmanagementRestService', SalesmanagementRestService)
    .service('SalesmanagementService', SalesmanagementService)
    .service('PositionStateNotificationService', PositionStateNotificationService)
    .service('PositionsService', PositionsService)
    .controller('CookAssignmentCtrl', CookAssignmentCtrl)
    .controller('CookPositionsCtrl', CookPositionsCtrl);

export default angular.module('app.salesmanagement').name;

