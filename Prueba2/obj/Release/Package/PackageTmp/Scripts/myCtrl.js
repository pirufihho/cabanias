//app.controller("myCtrl", function($scope, $sessionStorage) {

//    console.log(".....");

//    //AKI VAN LAS FUNCIONES DE NUESTRO CONTROLADOR

//    $scope.Logueado = false;
//    $scope.User = "";
//    $scope.Pass = "";


//    $scope.Cabanas = {
//        Titulo: "",
//        Descripcion: "",
//        Url: "",
//    }

//    $scope.cabaniasList = [
//        Cabanas = { Titulo: 'Clean House', Descripcion: 'xxxxxxxx', Url: '../img/imagen1.jpg' }
//    ];

//    $scope.todoAdd = function () {
//        $scope.cabaniasList.push({ Titulo: $scope.Cabanas.Titulo, Descripcion: $scope.Cabanas.Descripcion, Url: $scope.Cabanas.Url });
//        $sessionStorage.Lista = $scope.cabaniasList;

//        $scope.Cabanas.Titulo = "";
//        $scope.Cabanas.Descripcion = "";
//        $scope.Cabanas.Url = "";
//    };

//    $scope.remove = function () {
//        var oldList = $scope.todoList;
//        $scope.todoList = [];
//        angular.forEach(oldList, function (x) {
//            if (!x.done) $scope.todoList.push(x);
//        });
//    };


//    $scope.Login = function () {
//        //LOGICA DEL LOGIN
//        if ($scope.User == "Admin" && $scope.Pass == "Admin")
//        {
//            $scope.Logueado = true;
//            $scope.User = "";
//            $scope.Pass = "";
//        }
//    }

//    $scope.Logout = function () {
//        $scope.Logueado = false;
//    }


//});
