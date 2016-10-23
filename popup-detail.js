/**
 * Created by soranan on 23/10/2559.
 */

angular.module('myApp').controller('popupDetailController', function($scope, $log, dataDetail,ngDialog) {
    console.log('popupDetailController');

    $scope.canEdit = false;
    console.log('dataDetail',dataDetail);
    $scope.dataDetail = dataDetail;



    $scope.close = function () {
        ngDialog.close();
    };

    $scope.toggleEdit = function(){
        $scope.canEdit = !$scope.canEdit;
    };

    $scope.updateItem = function(obj) {
        console.log('updateItem  obj', obj);
        console.log('localStorage.todos AA', localStorage.todos);

        $scope.canEdit = !$scope.canEdit;


        $scope.temps = JSON.parse(localStorage.todos);
        var tempUpdate = [];
        console.log('temp BB', $scope.temps);

        for(var v = 0;v <= $scope.temps.length - 1;v++){
            console.log('for loop', $scope.temps[v]);
            if(obj.id == $scope.temps[v].id){
                console.log('match obj :',obj.detail)


                $scope.tempPush = ({
                    id :  $scope.dataDetail.id,
                    text: $scope.dataDetail.text,
                    detail: $scope.dataDetail.detail,
                    date: $scope.dataDetail.date,
                    done: $scope.dataDetail.done
                });
                console.log('$scope.tempPush :',$scope.tempPush)

                $scope.temps[v] = $scope.tempPush;

                localStorage.setItem('todos', JSON.stringify($scope.temps));
                console.log('last temps',$scope.temps);
                console.log('last localStorage',localStorage);

                $scope.close();
            };
        };





        //localStorage.setItem("todos", JSON.stringify(persons));

    }

    });
