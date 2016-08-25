import chai from "chai";
import F from 'funcunit';
import mocha from "steal-mocha";

import canStache from "can/view/stache/";
import '../date-range-picker';
import moment from "moment";

const assert = chai.assert;

describe('pikaday', function(){

	before(function () {
		F.attach(mocha);
	});

	after(function () {
		F.detach(mocha);
	});

	beforeEach(function(){
		F.open('/public/components/date-range-picker/date-range-picker.html');
		// wait until the component is append by done-autorender
		F('date-range-picker').exists();
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