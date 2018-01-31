var app = angular.module("myApp", []).controller("myCtrl", function ($scope, $http) {

    console.log("...");

    $scope.ErroresFront = {
        Obligatorio: "El campo es obligatorio.",
        InsertCabaniaOk: "¡Felicitaciones! Registraste la cabaña con éxito.",
        InsertCabaniaError: "La cabaña no pudo registrarse ¿Intentás en unos momentos?",
        EmailInvalid: "El formato de mail ingresado es invalido",
    }

    $scope.Cabanas = {
        Titulo: "",
        Descripcion: "",
        Url: "",
    }

    $scope.Contactos = {
        Email: "",
        Consulta: "",
    }

    $scope.User = "";
    $scope.Pass = "";
    $scope.Logueado = false;
    $scope.inputTitulo = false;
    $scope.inputDescripcion = false;
    $scope.inputUrl = false;
    $scope.inputEmailInalid = false;
    $scope.inputEmail = false;
    $scope.inputConsulta = false;
    $scope.DivHome = true;
    $scope.DivAdmin = false;
    $scope.DivCabanias = false;
    $scope.DivContacto = false;

    $scope.Login = function () {
        //LOGICA DEL LOGIN
        if ($scope.User == "Admin" && $scope.Pass == "Admin") {
            $scope.Logueado = true;
            $scope.User = "";
            $scope.Pass = "";
        }
    }

    $scope.Logout = function () {
        $scope.Logueado = false;
    }

    $scope.SwitchEditMode = function (Id) {
        $scope.IdSelec = Id;
    }

    $scope.MostrarDivHome = function () {
        $scope.DivAdmin = false;
        $scope.DivCabanias = false;
        $scope.DivHome = true;
        $scope.DivContacto = false;
    }

    $scope.MostrarDivAdmin = function () {
        $scope.DivAdmin = true;
        $scope.DivCabanias = false;
        $scope.DivHome = false;
        $scope.DivContacto = false;
    }

    $scope.MostrarDivGaleria = function () {
        $scope.DivAdmin = false;
        $scope.DivCabanias = true;
        $scope.DivHome = false;
        $scope.DivContacto = false;
    }

    $scope.MostrarDivContacto = function () {
        $scope.DivAdmin = false;
        $scope.DivCabanias = false;
        $scope.DivHome = false;
        $scope.DivContacto = true;
    }

    $scope.ValidarInsert = function () {
        //SE valida que ningun de los campos este vacio y luego se hace el insert

        var tituloLength = $scope.Cabanas.Titulo;
        var descripcionLength = $scope.Cabanas.Descripcion;
        var urlLegnth = $scope.Cabanas.Url;

        if (tituloLength === "") {
            $scope.inputTitulo = true;
        }
        else {
            $scope.inputTitulo = false;
        }

        if (descripcionLength === "") {
            $scope.inputDescripcion = true;
        }
        else {
            $scope.inputDescripcion = false;
        }

        if (urlLegnth === "") {
            $scope.inputUrl = true;
        }
        else {
            $scope.inputUrl = false;
        }

        if ($scope.inputTitulo == false && $scope.inputDescripcion == false && $scope.inputUrl == false) {
            $scope.Insert();
        }
    }

    $scope.ValidarContacto = function () {

        $scope.inputEmailInalid = false;
        $scope.inputEmail = false;
        $scope.inputConsulta = false;

        var emailLenght = $scope.Contactos.Email;
        var consultaLenght = $scope.Contactos.Consulta;

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var valid = emailReg.test(emailLenght);

        if (emailLenght === "") {
            $scope.inputEmail = true;
        }
        else {
            if (valid != true) {
                $scope.inputEmailInalid = true;
            }
            else {
                $scope.inputEmailInalid = false;
            }
        }


        if (consultaLenght === "") {
            $scope.inputConsulta = true;
        }


    }

    $scope.CancelarContacto = function () {
        $scope.inputEmailInalid = false;
        $scope.inputEmail = false;
        $scope.inputConsulta = false;
    }

    $scope.Load = function () {
        $http({
            method: 'GET',
            url: '/Home/Load'
        }).then(function successCallback(result) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.cabaniasList = result.data.Respuesta;

            $scope.PrepararPaginado();

        }, function errorCallback(result) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.Insert = function () {

        var _params = {
            pTitulo: $scope.Cabanas.Titulo,
            pDescripcion: $scope.Cabanas.Descripcion,
            pUrl: $scope.Cabanas.Url
        };

        $http.post('/Home/Insertar', _params)
            .then(function (result) {
                // success
                if (result.data.Respuesta == "OK") {
                    console.log('... Insert con exito.');

                    $scope.Cabanas.Titulo = "";
                    $scope.Cabanas.Url = "";
                    $scope.Cabanas.Descripcion = "";

                    $scope.Load();
                    $scope.MostrarDivGaleria();
                }
                else {
                    console.log('... Error en el insert.')
                }
            },
            function (result) {
                //Error
                console.log('... Error en el insert');

            });
    }

    $scope.Delete = function (Id) {

        var _params = {
            pId: Id
        };

        var r = confirm("Confirme si desea eliminar.");
        if (r == true) {

            $http.post('/Home/Eliminar', _params)
                .then(function (result) {
                    // success
                    if (result.data.Respuesta == "OK") {
                        console.log('... Delete con exito.');

                        $scope.Load();
                        $scope.Cabanas.Titulo = "";
                        $scope.Cabanas.Url = "";
                        $scope.Cabanas.Descripcion = "";
                    }
                    else {
                        console.log('... Error en el Delete.')
                    }
                },
                function (result) {
                    //Error
                    console.log('... Error en el insert');

                });

        } else {
            console.log("Presiono cancelar");
        }

    }

    $scope.Save = function (Id, Titulo, Descripcion, Url) {
        var _params = {
            pId: Id,
            pTitulo: Titulo,
            pDescripcion: Descripcion,
            pUrl: Url
        };

        $http.post('/Home/Editar', _params)
            .then(function (result) {
                // success
                if (result.data.Respuesta == "OK") {
                    console.log('... Insert con exito.');

                    $scope.Load();
                    $scope.SwitchEditMode();
                }
                else {
                    console.log('... Error en el insert.')
                }
            },
            function (result) {
                //Error
                console.log('... Error en el insert');

            });
    }

    //FUNCION DEL PAGER
    $scope.GetPager = function (totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 2
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    $scope.PrepararPaginado = function () {
        //debugger;
        var vm = this;
        vm.dummyItems = $scope.cabaniasList;
        vm.pager = {};
        vm.setPage = setPage;
        initController();

        function initController() {
            vm.setPage(1);
        }

        function setPage(page) {
            //debugger;

            //      if ($scope.vm.pager == null) { return;}
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = $scope.GetPager(vm.dummyItems.length, page);

            // get current page of items
            vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
    }

    $scope.Load();

});




