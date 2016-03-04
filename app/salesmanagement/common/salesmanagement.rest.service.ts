export class SalesmanagementRestService {

  private restServiceUri:string;

  /* @ngInject */
  constructor(currentContextPath:any, private $http:ng.IHttpService) {
    this.restServiceUri = currentContextPath.ofApp() + 'services/rest/salesmanagement/v1';
  }

  findOrders(params:any) {
    return this.$http.post(this.restServiceUri + '/order/search', params);
  }

  saveOrder(order:any) {
    return this.$http.post(this.restServiceUri + '/order', order);
  }

  updateOrderPosition(orderPosition:any) {
    return this.$http.post(this.restServiceUri + '/orderposition', orderPosition);
  }

  findOrderPositions(params:any) {
    return this.$http.get(this.restServiceUri + '/orderposition', {
      params: params
    });
  }
}
