import Component from 'can-component';
import DefineMap from 'can-define/map/';
import canEvent from 'can-event';
import './autocomplete.less!';
import template from './autocomplete.stache!';

export const ViewModel = DefineMap.extend({
	value: {
		value: '',
    set(newVal){
      if(newVal===''){
        this.selected = '';
      }
      return newVal;
    }
	},
  selected: {
    value: ''
  },
	showAutocomplete: {
		value: false
	},
  placeholder: {
    value: ''
  },
  list: {
    set(newVal, setVal){
      if(!newVal){
        //prevent flash on new list fetch
        return this.list;
      }else {
        return newVal;
      }
    }
  },
  selectItem(text, context) {
    var data = {
      value: text,
      selected: context || text
    };

    this.dispatch('selected', data);
    this.set(data);
  }
});

export default Component.extend({
  tag: 'autocomplete',
  template,
  ViewModel: ViewModel,
  events: {
    inserted: function(){
      var element = this.element,
          hide = this.hide.bind(this);

      this.isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if(this.isFF){
        this.ffHandler = function(ev){
          if(!element.find(ev.target).length){
            hide();
          }
        };
        canEvent.bind.call(document, 'focusin', this.ffHandler);
        canEvent.bind.call(document, 'click', this.ffHandler);
      }else{
        this.focusHandler = function(ev){
          if(!element.find(ev.relatedTarget).length){
            hide();
          }
        };
        canEvent.bind.call(this.element, 'focusout', this.focusHandler);
      }
    },
    removed: function(){
      if(this.isFF){
        canEvent.unbind.call(document, 'focus', this.ffHandler);
        canEvent.unbind.call(document, 'click', this.ffHandler);
      }else {
        canEvent.unbind.call(this.element, 'focusout', this.focusHandler);
      }
    },
    'input.autocomplete focus': function(el, ev){
      this.show();
    },
  	'input.autocomplete keyup': function(el, ev) {
      this.viewModel.set('value', el.value);
      this.viewModel.value = el.val();
  	},
  	'.dropdown-menu li a click': function(el, ev){
  		var dataEl = el.find('[data-value]'),
  			context = el.scope().listItem,
        text;

  		if(el.children().length){
	  		if(dataEl){
	  			var attrVal = dataEl['data-value'];
          text = attrVal==="" ? dataEl.text().trim() : attrVal;
	  		}
	  	}else{
	  		text = el.text().trim();
	  	}

      this.element.find('.autocomplete')[0].focus();
      this.hide();
      this.viewModel.selectItem(text, context);
  	},
    '.selected keydown': function(el, ev){
      var k = ev.keyCode;
      if(k === 8 || k === 46 || k === 37 ||
            (48 <= k && k <= 90) ||
            (96 <= k && k <= 111) ||
            (144 <= k && k <= 222)){
        this.removeSelected();
      }
    },
    'input.open keydown': function(el, ev){
      if(ev.keyCode===40){
        this.element.find('.dropdown-menu a')[0].focus();
      }
    },
    '.selected click': 'removeSelected',
    removeSelected() {
      this.show();
      this.viewModel.selected = '';
    },
    '.search-clear click': function(el, ev){
      ev.stopPropagation();
      this.viewModel.value = '';
      this.element.find('.autocomplete')[0].focus();
    },
  	show() {
  		this.viewModel.showAutocomplete = true;
  	},
  	hide() {
  		this.viewModel.showAutocomplete = false;
  	}
  }
});
