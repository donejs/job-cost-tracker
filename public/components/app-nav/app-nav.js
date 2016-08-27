import route from 'can-route';
import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './app-nav.less';
import template from './app-nav.stache';

/**
 * @module {Module} job-tracker/components/app-nav <app-nav>
 * @parent job-tracker.components
 *
 * @description Provides links to the main navigation.
 *
 * @signature `<app-nav />`
 *   Renders a list of navigation links and icons
 *
 * @demo public/components/app-nav/app-nav.html
 *
 **/
export const AppNavVM = DefineMap.extend({
  /**
	 * @property {Array<{label: String, icon: String, href: String}>}
	 *
	 * Array of links
	 */
  links: {
    value: [{
      "label": "Tasks",
      "icon": "ok",
      "href": "tasks"
    },{
      "label": "Task Day",
      "icon": "calendar",
      "href": "task-day"
    },{
      "label": "Reports",
      "icon": "signal",
      "href": "reports"
    }]
  },
  /**
   * @property {Array<{label: String, href: String}>}
   *
   * Array of sub-links for the Create link
   */
  createLinks: {
    value: [{
      "label": "New Lot",
      "href": "new-lot"
    },{
      "label": "New Task Day",
      "href": "new-task-day"
    },{
      "label": "Custom Work Order",
      "href": "custom-work-order"
    }]
  },
  /**
   * @property {Array<{label: String, href: String}>}
   *
   * Array of sub-links for the Admin link
   */
  adminLinks: {
    value: [{
      "label": "Manage Users",
      "href": "manage-users"
    },{
      "label": "Data Cleanup",
      "href": "data-cleanup"
    }]
  },
  /**
   * @property {String}
   *
   * Array of sub-links for the Admin link
   */
  popoverActive: {
    type: 'string',
    value: ''
  },
  /**
	 * @function
	 * @description Determines if a given link should be active
	 * @param  {String} href
	 *     The event from the stat menu submission.
   * @param  {String} [currentPage]
	 *     An optional page title (for testing).
	 *
	 * @body
	 * Use in a template like:
   * ```
	 * activeLink(href)
	 * ```
	 */
  activeLink: function(href, currentPage) {
    currentPage = currentPage || route.page;
    var currentLinkHref = href.replace("/","");

    // href is active if the current page is the href
    if (currentPage === currentLinkHref) {
      return true;
    }

    // href is active if it is in the createLinks list
    if (currentLinkHref === "create") {
      var createLinks = this.createLinks;
      for (let i = 0; i < createLinks.length; i++) {
        if (createLinks[i].href.replace("/", "") === currentPage) {
          return true;
        }
      }
    }

    // href is active if it is in the adminLinks list
    if (currentLinkHref === "admin") {
      var adminLinks = this.adminLinks;
      for (let i = 0; i < adminLinks.length; i++) {
        if (adminLinks[i].href.replace("/", "") === currentPage) {
          return true;
        }
      }
    }
    // Otherwise the href is not active
    return false;
  },
  /**
	 * @function
	 * @description Toggles a popover when links with sub-links are clicked.
	 * @param  {String} name
	 *     The link's label.
	 *
	 * @body
	 * Use in a template like:
	 * ```
	 * <a ($click)="togglePopover('create')">Create</a>
	 * ```
	 */
  togglePopover: function(name) {
    if (this.popoverActive === name) {
      this.popoverActive = '';
    } else {
      this.popoverActive = name;
    }
  }
});


export default Component.extend({
  tag: 'app-nav',
  template,
  ViewModel: AppNavVM,
	leakScope: true,
  /**
	 * @constructor {can.Component.events} job-tracker/components/app-nav.events Events
	 * @parent job-tracker/components/app-nav
	 *
	 * @description A `<app-nav>` component's events object.
	 */
  events: {
    /**
		 * @function
		 * @description Hides active popover on click-away
		 */
    "{window} click": function(el, ev) {
      var $target = $(ev.target);
      if (!$target.closest(".popover-wrap").length) {
        this.viewModel.popoverActive = '';
      }
    }
  }
});
