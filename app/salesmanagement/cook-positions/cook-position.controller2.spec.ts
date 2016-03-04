/// <reference path="../../../typings/tsd.d.ts" />
import 'angular';

describe('test', function () {
    let $scope, $controller:IControllerService, ctrl;
    
    beforeEach(angular.mock.module('app.salesmanagement'));
    
    beforeEach(inject(function (_$controller_:IControllerService, $rootScope:IRootScopeService) {
    // given
    
    $scope = $rootScope.$new();
    $controller = _$controller_;
    ctrl = $controller('CookPositionsCtrl', {
      $scope: $scope
    });
  }));
    
    it('te', function() {
        expect(true).toBe(true);
    });
});