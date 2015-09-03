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
                content: $compile(
                    '<img style="border-radius: 0.5em; width: 450px; height: 300px; padding-top: 20px;padding-bottom: 20px;padding-left: 15px; padding-right: 15px; border: 2px solid green;"' +
                        ' ng-src="data:image/jpg;base64,{{snapshot}}" class="img-responsive">'+
                    '<label>Snapshot taken: &nbsp {{time}}</label><br/>' +
                    '<label>Memo: &nbsp {{message}}</label><br/>'+
                    '<label>Active window: &nbsp {{note}}</label><br/>'+
                    '<label style="float: left">Activity: &nbsp </label>'+
                    '<div>'+
                    '<div class="progress progress-striped">'+
                        '<div class="progress-bar progress-bar-success" style="width:{{percent}}%"></div>'+
                    '</div>'+
                    '</div>')(scope),
                placement: attrs.popoverPlacement
            });
        }
    };
});
