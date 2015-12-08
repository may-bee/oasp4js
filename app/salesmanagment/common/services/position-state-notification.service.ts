import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket'; // https://github.com/jmesnil/stomp-websocket/issues/61

export class PositionStateNotificationService {

    private positionStompClient: any;

    /* @ngInject */
    constructor(private currentContextPath: any, private $q: ng.IQService) {

    }

    connect() {
        var deferredConnection,
            connectionPromise,
            positionWebSocketUrl,
            positionSocket,
            headers = {},
            successCallback = function() {
                deferredConnection.resolve();
            },
            failureCallback = function() {
                deferredConnection.reject();
            },
            notConnectedYet = this.positionStompClient ? false : true;

        if (notConnectedYet) {
            deferredConnection = this.$q.defer();
            connectionPromise = deferredConnection.promise;
            positionWebSocketUrl = this.currentContextPath.get() + 'websocket/positions';
            positionSocket = new SockJS(positionWebSocketUrl);
            this.positionStompClient = Stomp.over(positionSocket);
            this.positionStompClient.connect(headers, successCallback, failureCallback);
        } else {
            connectionPromise = this.$q.when();
        }

        return connectionPromise;
    }

    subscribe(callbackFn) {
        var internalCallback = function(message) {
            var parsedMessage = JSON.parse(message.body);

            if (angular.isFunction(callbackFn)) {
                callbackFn(parsedMessage);
            }
        };

        if (this.positionStompClient) {
            this.positionStompClient.subscribe('/topic/positionStatusChange', internalCallback);
        }
    }

    notify(positionId, newStatus) {
        var positionStatusChange = {
            id: positionId,
            status: newStatus
        };

        if (this.positionStompClient) {
            this.positionStompClient.send('/sample/positions', {},
                JSON.stringify(positionStatusChange));
        }
    }
}
