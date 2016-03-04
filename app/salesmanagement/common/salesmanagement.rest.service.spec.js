/*globals oasp*/
describe('Module: Salesmanagement, Service: salesmanagementRestService', function () {
  'use strict';
  var salesmanagementRestService, contextPath = '/contextPath/';

  beforeEach(module('app.salesmanagement', function ($provide) {
    $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
  }));

  beforeEach(inject(function (_salesManagementRestService_) {
    salesmanagementRestService = _salesManagementRestService_;
  }));

  it('should call $http.post when salesmanagementRestService.findOrders is called', inject(function ($http) {
    //given
    var params = {
      state: 'OPEN',
      tableId: 101
    };
    spyOn($http, 'post');
    //when
    salesmanagementRestService.findOrders(params);
    //then
    expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/salesmanagement/v1/order/search', params);
  }));

  it('should call $http.post when salesmanagementRestService.saveOrder is called', inject(function ($http) {
    //given
    var order = {description: 'desc'};

    spyOn($http, 'post');
    //when
    salesmanagementRestService.saveOrder(order);
    //then
    expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/salesmanagement/v1/order', order);
  }));

  it('should call $http.post when salesmanagementRestService.updateOrderPosition is called', inject(function ($http) {
    //given
    var orderPosition = 1;

    spyOn($http, 'post');
    //when
    salesmanagementRestService.updateOrderPosition(orderPosition);
    //then
    expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/salesmanagement/v1/orderposition', orderPosition);
  }));

  it('should call $http.get when salesmanagementRestService.findOrderPositions is called', inject(function ($http) {
    //given
    var params = {orderId: 'id'};

    spyOn($http, 'get');
    //when
    salesmanagementRestService.findOrderPositions(params);
    //then
    expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/salesmanagement/v1/orderposition', {params: params});
  }));
});
