import {SalesmanagementRestService} from "./../salesmanagement.rest.service.ts";

export class SalesmanagementService {

    constructor(private salesmanagementRestService:SalesmanagementRestService) {

    }

    loadOrderForTable(tableId) {
        var orderSearchCriteria = {
            state: 'OPEN',
            tableId: tableId
        };
        return this.salesmanagementRestService.findOrders(orderSearchCriteria).then(function (response) {
            return response.data.result && response.data.result.length ? response.data.result[0] : undefined;
        });
    }


    saveOrUpdateOrder(order) {
        var promise;
        //with the new REST API, there is no destinction between updating and creating an order
        promise = this.salesmanagementRestService.saveOrder(order).then(function (response) {
            return response.data;
        });
        return promise;
    }
}
