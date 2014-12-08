describe("RegistrationUserController", function () {
    var scope, controller, http, TestUser, serverUrl;
    beforeEach(function () {
        module('app');

        inject(function ($injector, $rootScope, $controller, $httpBackend, User, SERVER_URL) {
            scope = $rootScope.$new();
            http = $httpBackend;
            TestUser = User;
            serverUrl = SERVER_URL;
            controller = $controller(RegistrationUserController, {
                $scope: scope,
                User: User
            });
        })
    });

    it('should register user', function () {
        var user = {login: "USER_1", firstName: "FIRST_NAME_1", lastName: "LAST_NAME_1", password: "123", email: "abc@mail.ru"};
        var userDTO = {id: "1", login: "USER_1", firstName: "FIRST_NAME_1", lastName: "LAST_NAME_1", password: "123", email: "abc@mail.ru"};
        scope.currentItem = new TestUser(user);
        scope.passwordRepeat = "123";
        http.expectPOST(serverUrl + '/user', user).respond(201, userDTO);
        scope.submitRegistration();
        http.flush();
        expect(scope.registrationSuccess).toEqual(true);
        expect(scope.loginIsExists).toEqual(false);
        expect(scope.currentItem.login).toEqual(userDTO.login);
        expect(scope.currentItem.email).toEqual(userDTO.email);
        expect(scope.currentItem.firstName).toEqual(userDTO.firstName);
        expect(scope.currentItem.lastName).toEqual(userDTO.lastName);
    });

})





