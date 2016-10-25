var myApp = angular.module('myApp', [
    'ngDialog',
    '720kb.datepicker'
]);

myApp.controller('MainController', function($scope, $log, $filter, ngDialog) {
    console.log('MainController')

    $scope.currentDate = new Date();
    $scope.currentDate =  $filter('date')($scope.currentDate,'dd MMM yy');

    $scope.status = false;

    if (typeof(Storage) == "undefined") {
        alert(' your bowser not support ');
        return;
    };

    $scope.First = function(){
        $scope.saved = localStorage.getItem('todos');
        $scope.todos = (localStorage.getItem('todos')!==null) ?
            JSON.parse($scope.saved) :
            '';    //{id: '-', title: 'nodata' , date :'-' ,detail: '-'}

    }
    $scope.First();

    var _idList = [];

    localStorage.setItem('todos', JSON.stringify($scope.todos));
    //console.log("AA",localStorage);
    //console.log("$scope.saved",$scope.saved);
    //console.log("$scope.todos",$scope.todos);

    //run id
    angular.forEach($scope.todos,function(e){
        _idList.push(e.id);
    });


    if(_idList == '' || _idList == undefined){
        $scope.maxId = 0;
    }else{
        $scope.maxId = Math.max.apply(null, _idList);
    }
    console.log('_idList',_idList)
    console.log('$scope.maxId',$scope.maxId)
    $scope.todo = {}

    $scope.addTodo = function() {


        if(($scope.todoText == '' || $scope.todoText == undefined)||
            ($scope.todoDetail == '' || $scope.todoDetail == undefined)){
            return;
        };
        $scope.maxId += 1;

        console.log('$scope.maxId before push',$scope.maxId);

        $scope.todos.push({
            id: $scope.maxId !== null ? $scope.maxId : 1,
            text: $scope.todoText,
            detail: $scope.todoDetail,
            date: $scope.currentDate,
            done: false
        });
        $scope.todoText = '';
        $scope.todoDetail = '';
        localStorage.setItem('todos', JSON.stringify($scope.todos));
        console.log('localStorage',localStorage);
    };

    $scope.total = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo){
            count+= todo.done ? 0 : 1;
        });
        return count;
    };


    $scope.watchCheckbox = function(obj){
        console.log('watchCheckbox obj',obj)
        if (!$scope.todo.done){
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        }
    };

    $scope.toggleFilter = function(v){
        if(v == 'complete'){
            $scope.status = true;
        }
        if(v == 'onTime'){
            $scope.status = false;
        }
    }


    $scope.removeItem = function() {
        let oldTodos = $scope.todos;
        $scope.todos = [];
        console.log('$scope.todos',$scope.todos);

        angular.forEach(oldTodos, function(todo){
            console.log('todo AA ',todo);
            console.log('todo.done AA ',todo.done);
            if (!todo.done){
                $scope.todos.push(todo);
            }
        });
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
    $scope.removeByid = function(obj){
        console.log('removeByid obj',obj);

        $scope.temps = JSON.parse(localStorage.todos);

        for(var v = 0;v <= $scope.temps.length - 1;v++){
            if(obj.text == $scope.temps[v].text){

                $scope.temps.splice(v,1)
                console.log('last $scope.temps ',$scope.temps);

                localStorage.setItem('todos', JSON.stringify($scope.temps));

                $scope.First();

            };
        };

    };


    $scope.openDetail = function (obj) {
        console.log('openDetail',obj);

        ngDialog.open({
            showClose: false,
            animation: true,
            closeByDocument: false,
            closeByEscape: false,
            templateUrl: '../popup-detail.html',
            controller: 'popupDetailController',
            resolve:{
                dataDetail: function(){
                    return obj;
                }
            },
            preCloseCallback: function(value) {
                console.log('return value',value);
                    $scope.First();
            }
        });



    };





});

