import chai from "chai";
import "steal-mocha";
import { ViewModel } from '../app-nav';

const assert = chai.assert;

describe("app-nav Component ViewModel", function () {
  it('has the property lists', function() {
    var vm = new ViewModel();
    assert(vm.attr('links').length > 0, 'links has a length');
    assert(vm.attr('createLinks').length > 0, 'createLinks has a length');
    assert(vm.attr('adminLinks').length > 0, 'adminLinks has a length');
  });

  it('activates the current page link', function() {
    var vm = new ViewModel();
    assert(vm.activeLink('/tasks', 'tasks'));
  });

  it('activates "Create" link if current page is a createLink', function() {
    var vm = new ViewModel();
    assert(vm.activeLink('/create', 'new-lot'), 'new-lot page should have active "Create" link');
  });

  it('sets the active page link if a adminLink is active', function() {
    var vm = new ViewModel();
    assert(vm.activeLink('/admin', 'data-cleanup'), 'data-cleanup page should have active "Admin" link');
  });

  it('toggles the activePopover', function() {
    var vm = new ViewModel();
    vm.togglePopover('create');
    assert.equal(vm.attr('popoverActive'), 'create', 'it should have value "create"');
    vm.togglePopover('create');
    assert.equal(vm.attr('popoverActive'), '', 'it should have value ""');
  });
});
