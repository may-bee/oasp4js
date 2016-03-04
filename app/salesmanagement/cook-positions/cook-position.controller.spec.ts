/// <reference path="../../../typings/tsd.d.ts" />
import 'angular';
import IControllerService = ng.IControllerService;
import IQService = ng.IQService;
import IRootScopeService = ng.IRootScopeService;
import IScope = ng.IScope;
import {CookPositionsCtrl} from './cook-positions.controller';
import {PositionStateNotificationService} from '../common/services/position-state-notification.service';
import {PositionsService} from '../common/services/positions.service';

xdescribe('Module: Salesmanagement, Controller: CookPositionsCtrl', function () {
  let cookPositionsCtrl:CookPositionsCtrl, $controller:IControllerService;

  var $scope:IScope, currentPositionsMock, deferred, positionStateNotification, positions;

  beforeEach(angular.mock.module('app.salesmanagement'));

  beforeEach(inject(function (_$controller_:IControllerService, $rootScope:IRootScopeService, _positionStateNotification_:PositionStateNotificationService, _positions_:PositionsService, $q:IQService, $controller:IControllerService) {
    // given
    deferred = $q.defer();
    positionStateNotification = _positionStateNotification_;
    positions = _positions_;
    spyOn(positionStateNotification, 'connect').and.returnValue(deferred.promise);
    spyOn(positionStateNotification, 'subscribe').and.callThrough();
    spyOn(positions, 'assignCookToPosition').and.returnValue(deferred.promise);
    spyOn(positions, 'setPositionStatusToPrepared').and.returnValue(deferred.promise);
    spyOn(positions, 'makePositionAvailable').and.returnValue(deferred.promise);
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('CookPositionsCtrl', {
      $scope: $scope,
      currentPositions: currentPositionsMock,
      positionStateNotification: positionStateNotification,
      positions: positions
    });
  }));

  it('should call positionStateNotification functions on controller initialization', function ($controller:IControllerService) {
    // given when
    deferred.resolve();
    $scope.$digest();
    // then
    expect(positionStateNotification.connect).toHaveBeenCalled();
    expect(positionStateNotification.subscribe).toHaveBeenCalled();
  });

  describe('testing Controller functions', function () {
    it('should return true when there are available positions selected', function () {
      // given
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when then
      expect(cookPositionsCtrl.availablePositionSelected()).toBeTruthy();

      // when
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: []
      });
      // then
      expect(cookPositionsCtrl.availablePositionSelected()).toBeFalsy();
    });

    it('should return true when there are assigned positions selected', function () {
      // given
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAssignedSelected: [{id: 1}]
      });
      // when then
      expect(cookPositionsCtrl.assignedPositionSelected()).toBeTruthy();

      // when
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAssignedSelected: []
      });
      // then
      expect(cookPositionsCtrl.assignedPositionSelected()).toBeFalsy();
    });

    it('should assign cook to position', inject(function (globalSpinner:any) {
      // given
      spyOn(globalSpinner, 'decorateCallOfFunctionReturningPromise').and.callThrough();
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when
      cookPositionsCtrl.assignCookToPosition();
      // then
      expect(globalSpinner.decorateCallOfFunctionReturningPromise).toHaveBeenCalled();
      expect(positions.assignCookToPosition).toHaveBeenCalledWith(1);
    }));
  });

  describe('testing button definitions', function () {
    it('should call positions.setPositionStatusToPrepared when Done button is clicked', inject(function (globalSpinner:any) {
      // given
      spyOn(globalSpinner, 'decorateCallOfFunctionReturningPromise').and.callThrough();
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when
      cookPositionsCtrl.getButtonDefs()[0].onClick();
      // then
      expect(globalSpinner.decorateCallOfFunctionReturningPromise).toHaveBeenCalled();
      expect(positions.setPositionStatusToPrepared).toHaveBeenCalledWith(1);
    }));

    it('should activate Done button where there is an assigned position selected', function () {
      // given
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when then
      expect(cookPositionsCtrl.getButtonDefs()[0].isActive()).toBeTruthy();
    });

    it('should call positions.makePositionAvailable when Reject button is clicked', inject(function (globalSpinner:any) {
      // given
      spyOn(globalSpinner, 'decorateCallOfFunctionReturningPromise').and.callThrough();
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when
      cookPositionsCtrl.getButtonDefs()[1].onClick();
      // then
      expect(globalSpinner.decorateCallOfFunctionReturningPromise).toHaveBeenCalled();
      expect(positions.makePositionAvailable).toHaveBeenCalledWith(1);
    }));

    it('should activate Reject button where there is an assigned position selected', function () {
      // given
      cookPositionsCtrl = $controller('CookPositionsCtrl', {
        positionsAvailableSelected: [{id: 1}]
      });
      // when then
      expect(cookPositionsCtrl.getButtonDefs()[1].isActive()).toBeTruthy();
    });
  });
});
