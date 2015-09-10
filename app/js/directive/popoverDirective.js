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
                        ' ng-src="data:image/jpg;base64,{{snapshot}}" class="img-responsive"><br/>'+
                    '<label class="labels">Snapshot taken:</label> <label>{{time}}</label><br/>' +
                    '<label class="labels">Memo: </label> <label style="width: 200px;"> {{message}}</label><br/>'+
                    '<label class="labels">Active window: </label> <div class="box"><div><label> {{note}}</label></div></div>'+
                    '<label class="labels">Activity: &nbsp </label>'+
                    '<div style="max-width: 450px">'+
                    '<div class="progress progress-striped">'+
                        '<div class="progress-bar progress-bar-success" style="width:{{percent}}%"></div>'+
                    '</div>'+
                    '</div>')(scope),
                placement: attrs.popoverPlacement
            });
        }
    };
});
