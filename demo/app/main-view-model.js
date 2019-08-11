var Observable = require("tns-core-modules/data/observable").Observable;

function createViewModel() {
  var viewModel = new Observable();
  viewModel.modelReplacement = 'MODEL REPLACEMENT';
  viewModel.message = L('hello_replace', 'from model');
  return viewModel;
}

exports.createViewModel = createViewModel;
