var createViewModel = require("./main-view-model").createViewModel;

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = createViewModel();
}

exports.pageLoaded = pageLoaded;
