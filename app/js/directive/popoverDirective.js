directives.directive('customPopover', function ($compile, snapshot) {
    return {
        restrict: 'A',
        scope: {
            snapshot: '=',
            message: '=',
            time: '=',
            percent: '=',
            note: '='
        },
        link: function (scope, el, attrs) {
            $(el).popover({
                trigger: 'hover',
                html: true,
                content:  $compile('<label class="control-label label-success">{{message}}</label>' +
                    '<img style="width: 450px; height: 300px; padding: 1px;" ng-src="data:image/jpg;base64,{{snapshot}}" class="img-responsive">'+
                    '<label class="control-label" style="float: left">{{time}}&nbsp</label>'+
                    '<div class="progress progress-striped">'+
                    '<div class="progress-bar progress-bar-success" style="width:{{percent}}%"></div>'+
                    '</div>')(scope),
                placement: attrs.popoverPlacement
            });
        }
    };
});
