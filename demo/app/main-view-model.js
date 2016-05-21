var Observable = require("data/observable").Observable;

function createViewModel() {
    var viewModel = new Observable();
    viewModel.helloValue = 'model value';
    viewModel.message = L('hello', 'from model');
    return viewModel;
}

exports.createViewModel = createViewModel;