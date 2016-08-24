import 'steal-mocha';
import chai from 'chai';
import sinon from 'sinon';
import Map from 'can/map/';
import List from 'can/list/';
import stache from 'can/view/stache/';
import can from 'can';

const assert = chai.assert;

import DynamicGrid, { ViewModel } from '../dynamic-grid';

describe('<dynamic-grid>', () => {
  describe('ViewModel', () => {

    it('should compute totalData', () => {
      const vm = new ViewModel({
        columns: [
          { key: 1 },
          { key: 0 }
        ],

        totals: {}
      });

      assert.deepEqual(vm.attr('totalData'), []);

      vm.attr('totals', new List([10, 20]));
      assert.deepEqual(vm.attr('totalData'), [20, 10]);

      vm.attr('totals', [10, 20]);
      assert.deepEqual(vm.attr('totalData'), [20, 10]);
    });

    it.skip('{{totalPadding}}', () => {
      const scope = new ViewModel({
        columns: [
          { key: 1 },
          { key: 0 }
        ],

        totals: new List([10, 20])
      });

      const grid = new DynamicGrid(document.createElement('div'), {
        subtemplate: stache(),
        scope,
        options: new can.view.Options({})
      });

      console.dir(grid.totalPadding);
    });

    it.skip('{{round(num, significance)}}', () => {
      const helpers = DynamicGrid.prototype.helpers;
    });

    it('should async set totals', () => {
      const vm = new ViewModel();
      const handler = sinon.spy();

      vm.bind('totals', handler);
      const getTotals = new Promise(resolve => resolve('bar'));

      vm.attr('totals', 'foo');
      vm.attr('totals', getTotals);

      return getTotals.then(() => {
        assert.calledTwice(handler);
        assert.calledWith(handler, sinon.match.object, 'foo');
        assert.calledWith(handler, sinon.match.object, 'bar');
      });
    });

    it('should coerce modelList', () => {
      const vm = new ViewModel();

      vm.attr('modelList', {});
      assert.instanceOf(vm.attr('modelList'), List);

      vm.attr('modelList', 0);
      assert.instanceOf(vm.attr('modelList'), List);

      vm.attr('modelList', []);
      assert.instanceOf(vm.attr('modelList'), List);
    });

    it('should compute isDataEmpty', () => {
      const vm = new ViewModel({
        modelList: [1,2,3]
      });

      assert.isOk(!vm.attr('isDataEmpty'));

      vm.attr('modelList', []);
      assert.isOk(vm.attr('isDataEmpty'));
    });

    it('should get value w/ displayTransform', () => {
      const displayTransform = sinon.spy();
      const vm = new ViewModel({ displayTransform });

      const ctx = new Map({ key: 1 });
      const tree = { _parent: { _context: 1 } };

      vm.getValue(ctx, tree);
      assert.calledWith(displayTransform, tree._parent._context, ctx.attr('key'));
    });

    it('should get value w/o displayTransform', () => {
      const vm = new ViewModel();

      const ctx = new Map({ key: 'name' });
      const tree = { _parent: { _context: new Map({ name: 'foo' }) } };

      assert.equal(vm.getValue(ctx, tree), 'foo');
    });

    it('should get a model', () => {
      const vm = new ViewModel();
      const _context = {};
      const tree = { _parent: { _context } };

      assert.equal(vm.getModel({}, tree), _context);
    });

    it('should save a model', () => {
      const vm = new ViewModel();
      const save = sinon.spy();

      vm.update({ save });
      assert.calledOnce(save);
    });

    it('should find a model in a list and destroy it', () => {
      const destroy = sinon.spy();
      const model = { destroy };
      const vm = new ViewModel({
        modelList: new List([model, {}])
      });

      vm.deleteModel(model);
      assert.calledOnce(destroy);
      assert.equal(vm.attr('modelList.length'), 1);
      assert.notEqual(vm.attr('modelList.0'), model);
    });
  });
});
