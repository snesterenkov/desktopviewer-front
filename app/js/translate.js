/**
 * Created by alex on 12.01.2015.
 */

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'User': 'User',
        'Department': 'Departments',
        'Company': 'Companies',
        'Project': 'Projects',
        'Registration': 'Registration',
        'Login': 'Login',
        'Sign in': 'Sign in',
        'Sign out': 'Sign out',
        'Please sign in': 'Please sign in',
        'Password':'Password',
        'Dashboard':'Dashboard'
    });

    $translateProvider.translations('ru', {
        'User': 'Пользователь',
        'Department' : 'Подразделения',
        'Company': 'Компании',
        'Project': 'Проекты',
        'Registration': 'Регистрация',
        'Login': 'Логин',
        'Sign in': 'Войти',
        'Sign out': 'Выйти',
        'Please sign in': 'Войдите пожалуйста',
        'Password':'Пароль',
        'Dashboard':'Личная страница'
    });

    $translateProvider.preferredLanguage('ru');
}]);