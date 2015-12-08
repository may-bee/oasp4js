/// <reference path="../typings/tsd.d.ts" />

import 'jquery';
import * as angular from 'angular';

angular.module('app',
    ['ui.select', 'app.main', 'app.table-mgmt', 'app.offer-mgmt', 'app.sales-mgmt', 'app.form-samples-mgmt'])
    .config(function ($locationProvider: ng.ILocationProvider, uiSelectConfig: any) {
        'use strict';
        $locationProvider.html5Mode(false);
        uiSelectConfig.theme = 'bootstrap';
    })
    .run(function (globalSpinner: any) {
        'use strict';
        globalSpinner.showOnRouteChangeStartAndHideWhenComplete();
    });
