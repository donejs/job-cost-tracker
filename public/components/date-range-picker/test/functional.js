import chai from "chai";
import F from 'funcunit';
import mocha from "steal-mocha";

import canStache from "can/view/stache/";
import '../date-range-picker';
import moment from "moment";

const assert = chai.assert;

F.attach(mocha);

describe('pikaday', function(){
	// let divID = 'test-area';
	// let testArea = document.getElementById(divID);

	beforeEach(function(){
		// let renderer = canStache('<date-range-picker></date-range-picker>');
		//
		// testArea.appendChild(renderer({}));
	//
	// 	let body = document.getElementsByTagName('body');
	// 	let test = document.createElement("div");
	// 	test.setAttribute("id", "funcunit-test-area");
	// 	body[0].appendChild(test);
		F.open('/public/components/date-range-picker/date-range-picker.html');
		F('date-range-picker').exists();
	});

	afterEach(function () {
		// let foo = document.getElementById("funcunit_app");
		// foo.contentDocument.body.innerHTML = "";


		// testArea.innerHTML = '';
		// let foo = document.getElementById("funcunit_app");
		// let bar = document.getElementsByTagName('body');
		// bar[0].removeChild(foo);
		//
		// let test = document.createElement("iframe");
		// test.setAttribute("id", "funcunit_app");
		// test.setAttribute('src', '');
		// bar[0].appendChild(test);

	});

	it('for the end date', function(done){

		F(".report-date-end:eq(0)").click(function(){
			F("div.pika-single>div.pika-lendar").exists();

			let lastDayInFirstWeek = F('table.pika-table>tbody>tr').first().find('td').last().find('button');

			let day = lastDayInFirstWeek.attr("data-pika-day");
			let month = lastDayInFirstWeek.attr("data-pika-month");
			let year = lastDayInFirstWeek.attr("data-pika-year");

			lastDayInFirstWeek.click(function () {
				let inputEndDate = F('input.report-date-end').val();
				let calcEndDate = moment().date(day).month(month).year(year).format("ddd MMM DD YYYY");

				assert.equal(inputEndDate, calcEndDate);
			});
		});

		F.add(done);
	});


	it('for the start date', function(done){
		F(".report-date-start:eq(0)").click(function(){
			F("div.pika-single>div.pika-lendar").exists();

			let lastDayInFirstWeek = F('table.pika-table>tbody>tr').first().find('td').last().find('button');

			let day = lastDayInFirstWeek.attr("data-pika-day");
			let month = lastDayInFirstWeek.attr("data-pika-month");
			let year = lastDayInFirstWeek.attr("data-pika-year");

			lastDayInFirstWeek.click(function () {
				let inputEndDate = F('input.report-date-start').val();
				let calcEndDate = moment().date(day).month(month).year(year).format("ddd MMM DD YYYY");

				assert.equal(inputEndDate, calcEndDate);
			});
		});

		F.add(done);
	});

});