/// <reference path="../typings/tsd.d.ts" />

import 'jquery';
import * as angular from 'angular';
import 'tmp/app/app.templates.js';

import uiRouterModuleName from 'ui-router';
import angularJsUriModuleName from 'angular-jsuri';
import angularUiBootstrapModuleName from 'angular-ui-bootstrap';
import angularTranslateModuleName from 'angular-translate';
import angularTranslateLoaderModuleName from 'angular-translate-loader-static-files';
import valdrModuleName from 'valdr';

import 'jsuri';
import 'valdr-message';
import 'angular-ui-grid';
import 'angular-ui-select';
import 'angular-spinner';

angular.module('app',
  ['app.main',
    'app.table-mgmt',
    'app.offer-mgmt',
    'app.salesmanagement',
    'app.form-samples-mgmt',
    uiRouterModuleName,
    angularJsUriModuleName,
    angularUiBootstrapModuleName,
    angularTranslateModuleName,
    angularTranslateLoaderModuleName,
    valdrModuleName,
    'ui.grid',
    'ui.select',
    'angularSpinner'])

  .config(function ($locationProvider:ng.ILocationProvider, uiSelectConfig:any) {
    'use strict';
    $locationProvider.html5Mode(false);
    uiSelectConfig.theme = 'bootstrap';
  })
  .run(function (globalSpinner:any) {
    'use strict';
    globalSpinner.showOnRouteChangeStartAndHideWhenComplete();
  });
