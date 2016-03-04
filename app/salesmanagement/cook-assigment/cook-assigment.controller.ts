import {PositionStateNotificationService} from '../common/services/position-state-notification.service.ts';
import {PositionsService} from '../common/services/positions.service.ts';
import IQService = angular.IQService;

export class CookAssignmentCtrl {

  private gridOptions:any;
  private gridOptionsAssigned:any;
  private gridApi:any;
  private buttonDefs:any[];
  private positionsAvailableSelected:any[] = [];
  private positionsAssignedSelected:any[] = [];

  /* @ngInject */
  constructor(private globalSpinner:any, private $q:IQService, private positionsService:PositionsService, private currentPositions:[any], positionStateNotificationService:PositionStateNotificationService) {
    this.setUpGrid();
    this.setUpButtonDefs();
    this.registerPositionStateNotifier(positionStateNotificationService);

    this.gridOptionsAssigned = angular.copy(this.gridOptions);
    this.assignPositionsToGrid();


    this.gridOptions.onRegisterApi = function (gridApi:any) {
      this.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged(this, function (row:any) {
        if (row.isSelected) {
          this.positionsAvailableSelected.push(row.entity);
        } else {
          this.positionsAvailableSelected.splice(this.positionsAvailableSelected.indexOf(row.entity), 1);
        }
      });
    };

    this.gridOptionsAssigned.onRegisterApi = function (gridApi:any) {
      this.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged(this, function (row:any) {
        if (row.isSelected) {
          this.positionsAssignedSelected.push(row.entity);
        } else {
          this.positionsAssignedSelected.splice(this.positionsAssignedSelected.indexOf(row.entity), 1);
        }
      });
    };
  }

  assignCookToPosition() {
    if (this.isAvailablePositionSelected()) {
      this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {
        var promises = [];
        angular.forEach(this.positionsAvailableSelected, function (element:any) {
          promises.push(this.positionsService.assignCookToPosition(element.id));
        });
        return this.$q.all(promises).then(function () {
          this.positionsAssignedSelected.length = 0;
          this.positionsAvailableSelected.length = 0;
          return this.refreshTable();
        });
      });
    }
  }

  isAvailablePositionSelected() {
    return (this.positionsAvailableSelected && this.positionsAvailableSelected.length > 0) ? true : false;
  }

  refreshTable() {
    this.assignPositionsToGrid();
    this.gridApi.core.refresh();
    return this.currentPositions;
  }

  isAssignedPositionSelected() {
    return (this.positionsAssignedSelected && this.positionsAssignedSelected.length > 0) ? true : false;
  };

  private assignPositionsToGrid() {
    this.gridOptions.data = this.currentPositions ? this.currentPositions.availablePositions : [];
    this.gridOptionsAssigned.data = this.currentPositions ? this.currentPositions.positionsAssignedToCurrentUser : [];
  }

  private registerPositionStateNotifier(positionStateNotification:PositionStateNotificationService) {
    positionStateNotification.connect().then(function () {
      positionStateNotification.subscribe(function () {
        this.positionsService.get();
      });
    });
  }

  private setUpGrid() {
    this.gridOptions = {
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      multiSelect: true,
      enableFullRowSelection: true,
      enableColumnMenus: false
    };

    this.gridOptions.columnDefs = [
      {name: 'id', displayName: 'ID', minWidth: 80},
      {name: 'orderId', displayName: 'Order ID', minWidth: 80},
      {name: 'mealName', displayName: 'Meal', minWidth: 100},
      {name: 'sideDishName', displayName: 'Side Dish', minWidth: 100}
    ];
  }

  private setUpButtonDefs() {
    this.buttonDefs = [
      {
        label: 'SALES_MGMT.DONE',
        onClick: function () {
          if (this.isAssignedPositionSelected()) {
            this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {


              var promises = [];
              angular.forEach(this.positionsAssignedSelected, function (element:any) {
                promises.push(this.positionsService.setPositionStatusToPrepared(element.id));
              });
              return this.$q.all(promises).then(function () {
                this.positionsAssignedSelected.length = 0;
                this.positionsAvailableSelected.length = 0;
                return this.refreshTable();
              });


            });
          }
        },
        isActive: function () {
          return this.isAssignedPositionSelected();
        }
      },
      {
        label: 'SALES_MGMT.REJECT',
        onClick: function () {
          if (this.isAssignedPositionSelected()) {
            this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {
              var promises = [];
              angular.forEach(this.positionsAssignedSelected, function (element:any) {
                promises.push(this.makePositionAvailable(element.id));
              });
              return this.$q.all(promises).then(function () {
                this.positionsAssignedSelected.length = 0;
                this.positionsAvailableSelected.length = 0;
                return this.refreshTable();
              });

            });
          }
        },
        isActive: function () {
          return this.isAssignedPositionSelected();
        }
      }
    ];
  }

  getGridOptions():any {
    return this.gridOptions;
  }

  getButtonDefs():any {
    return this.buttonDefs;
  }

}

