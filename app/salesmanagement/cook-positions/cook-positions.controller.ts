import {PositionStateNotificationService} from '../common/services/position-state-notification.service';

export class CookPositionsCtrl {

  private buttonDefs:any[];
  private positionsAvailableSelected = [];
  private positionsAssignedSelected = [];
  private positions:any;

  constructor(private positionStateNotification:PositionStateNotificationService, private globalSpinner:any, currentPositions:any) {
    this.setUpButtonDefs();
    this.registerPositionStateNotification();
    this.positions = currentPositions;
  }

  private registerPositionStateNotification() {
    this.positionStateNotification.connect().then(function () {
      this.positionStateNotification.subscribe(function () {
        this.positions.get();
      });
    });
  }

  private setUpButtonDefs() {
    this.buttonDefs = [
      {
        label: 'SALES_MGMT.DONE',
        onClick: function () {
          if (this.assignedPositionSelected()) {
            this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {
              var result = this.positions.setPositionStatusToPrepared(this.positionsAssignedSelected[0].id);
              this.positionsAssignedSelected.length = 0;
              return result;
            });
          }
        },
        isActive: function () {
          return this.assignedPositionSelected();
        }
      },
      {
        label: 'SALES_MGMT.REJECT',
        onClick: function () {
          if (this.assignedPositionSelected()) {
            this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {
              var result = this.positions.makePositionAvailable(this.positionsAssignedSelected[0].id);
              this.positionsAssignedSelected.length = 0;
              return result;
            });
          }
        },
        isActive: function () {
          return this.assignedPositionSelected();
        }
      }
    ];
  }

  getButtonDefs() {
    return this.buttonDefs;
  }

  assignCookToPosition() {
    if (this.availablePositionSelected()) {
      this.globalSpinner.decorateCallOfFunctionReturningPromise(function () {
        return this.positions.assignCookToPosition(this.positionsAvailableSelected[0].id);
      });
    }
  }

  assignedPositionSelected():boolean {
    return (this.positionsAssignedSelected && this.positionsAssignedSelected.length > 0) ? true : false;
  }

  availablePositionSelected():boolean {
    return (this.positionsAvailableSelected && this.positionsAvailableSelected.length > 0) ? true : false;
  }
}
