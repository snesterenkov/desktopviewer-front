/**
 * Created by alex on 12.01.2015.
 */

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'User': 'User',
        'Department': 'Department',
        'Company': 'Company',
        'Project': 'Project',
        'Registration': 'Registration',
        'Login': 'Login',
        'Sign in': 'Sign in',
        'Sign out': 'Sign out',
        'Please sign in': 'Please sign in',
        'Password':'Password',
        'Dashboard':'Dashboard',
        'WorkingDiary': 'Working diary',        'Filters':'Filters',
        'Reports': 'Reports',
        'Screenshots': 'Screenshots'
    });

    $translateProvider.translations('ru', {
        'User': 'Пользователь',
        'Department' : 'Подразделение',
        'Company': 'Компания',
        'Project': 'Проект',
        'Registration': 'Регистрация',
        'Login': 'Логин',
        'Sign in': 'Войти',
        'Sign out': 'Выйти',
        'Please sign in': 'Войдите пожалуйста',
        'Password':'Пароль',
        'WorkingDiary': 'Рабочий дневник',
        'Filters':'Фильтры'
    });

    $translateProvider.preferredLanguage('ru');
}]);