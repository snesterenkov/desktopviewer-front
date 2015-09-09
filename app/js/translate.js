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
        'Password': 'Password',
        'Dashboard': 'Dashboard',
        'WorkingDiary': 'Working diary',
        'Reports': 'Reports',
        'Screenshots': 'Screenshots',
        'Employees': 'Employees',
        'My page': 'My page',
        'Settings': 'Settings'
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
        'WorkingDiary': 'Рабочий дневник',
        'Reports': 'Отчеты',
        'Employees': 'Сотрудники',
        'My page': 'Моя страница',
        'Settings': 'Настройки'
    });

    $translateProvider.preferredLanguage('ru');
}]);