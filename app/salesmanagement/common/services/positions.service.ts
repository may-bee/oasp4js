import {SalesmanagementRestService} from '../salesmanagement.rest.service.ts';
import IPromise = angular.IPromise;
import IQService = angular.IQService;

export class PositionsService {

    private positionsCache:PositionsCache;

    constructor(private salesmanagementRestService:SalesmanagementRestService, private $q:IQService, private appContext:any, private offers:any) {
    }

    get():IPromise {
        var deferredPositions = this.$q.defer(), cookId;

        this.appContext.getCurrentUser().then(function (currentUser:any) {
            cookId = currentUser.getUserId();
            if (cookId) {
                this.$q.all([
                    this.salesmanagementRestService.findOrderPositions({state: 'ORDERED', mealOrSideDish: true}),
                    this.offers.loadAllOffers(),
                    this.offers.loadAllProducts()
                ]).then(function (allResults:any) {
                    this.positionsCache = new PositionsCache()
                        .currentUserId(cookId)
                        .allPositions(allResults[0].data)
                        .offers(allResults[1])
                        .products(allResults[2]);
                    deferredPositions.resolve(this.positionsCache.getAvailableAndAssignedPositions());
                }, function (reject:any) {
                    deferredPositions.reject(reject);
                });
            } else {
                deferredPositions.reject();
            }
        });

        return deferredPositions.promise;
    }

    assignCookToPosition(positionId:number) {
        var cookId;
        return this.appContext.getCurrentUser().then(function (currentUser:any) {
            cookId = currentUser.getUserId();
            return this.salesmanagementRestService.updateOrderPosition(this.positionsCache.assignCookToPosition(cookId, positionId))
                .then(function () {
                    return this.get();
                });
        });
    }

    makePositionAvailable(positionId:number) {
        return this.salesmanagementRestService.updateOrderPosition(this.positionsCache.makePositionUnassigned(positionId))
            .then(function () {
                return this.get();
            });
    }

    setPositionStatusToPrepared(positionId:number) {
        return this.salesmanagementRestService.updateOrderPosition(this.positionsCache.setStatusOfPosition('PREPARED',
            positionId))
            .then(function () {
                return this.get();
            });
    }
}

class PositionsCache {

    private allPositions:Array = [];
    private cookId:number;
    private allOffers:any = [];
    private allProducts:any = [];
    private availableAndAssignedPositions:any = {};

    private findItemById(items:Array, id:number) {
        var j, currentItem;
        if (items && id) {
            for (j = 0; j < items.length; j += 1) {
                currentItem = items[j];
                if (currentItem.id && currentItem.id === id) {
                    return currentItem;
                }
            }
        }
    }

    private createDetailedPosition(position:any) {
        var currentOffer, currentMeal, currentSideDish;

        if (position) {
            currentOffer = this.findItemById(this.allOffers, position.offerId);
            if (currentOffer) {
                currentMeal = this.findItemById(this.allProducts, currentOffer.mealId);
                currentSideDish = this.findItemById(this.allProducts, currentOffer.sideDishId);
            }

            return {
                id: position.id,
                orderId: position.orderId,
                offerName: position.offerName,
                mealName: currentMeal && currentMeal.description,
                sideDishName: currentSideDish && currentSideDish.description
            };
        }
    }

    allPositions(allPositionsToSet:Array) {
        this.allPositions = allPositionsToSet;
    }

    currentUserId(cookIdToSet:number) {
        this.cookId = cookIdToSet;
    }

    offers(offersToSet:Array) {
        this.allOffers = offersToSet;
    }

    products(productsToSet:Array) {
        this.allProducts = productsToSet;
    }

    assignCookToPosition(cookIdToSet:number, positionId:number) {
        var position = this.findItemById(this.allPositions, positionId);
        if (position) {
            position.cookId = cookIdToSet;
        }
        return position;
    }

    setStatusOfPosition(status:any, positionId:number) {
        var position = this.findItemById(this.allPositions, positionId);
        if (position) {
            position.state = status;
        }
        return position;
    }

    makePositionUnassigned(positionId:number) {
        var position = this.findItemById(this.allPositions, positionId);
        if (position) {
            position.cookId = undefined;
        }
        return position;
    }

    getAvailableAndAssignedPositions() {
        var available = [], assigned = [], i, currentPosition, noCookAssigned;
        if (this.allPositions) {
            for (i = 0; i < this.allPositions.length; i += 1) {
                currentPosition = this.allPositions[i];
                // 0 is falsy, but can be a valid ID
                noCookAssigned = currentPosition.cookId === null || currentPosition.cookId === undefined;
                if (noCookAssigned) {
                    available.push(this.createDetailedPosition(currentPosition));
                } else if (this.cookId === currentPosition.cookId) {
                    assigned.push(this.createDetailedPosition(currentPosition));
                } // ignoring positions assigned to other users
            }
        }
        this.availableAndAssignedPositions.availablePositions = available;
        this.availableAndAssignedPositions.positionsAssignedToCurrentUser = assigned;

        return this.availableAndAssignedPositions;
    }

}
