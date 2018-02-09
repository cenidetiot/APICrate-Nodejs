var crate = require('node-crate');
crate.connect('http://207.249.127.218:4200');
var moment = require('moment');
var momentTimeZone = require('moment-timezone');

var arrayDates = [];
var arrayDatesConverted = [];
crate.execute("select * from etdevice where entity_id=? and date_format(time_index) like ? order by date_format(time_index) desc limit 10",['Device_Smartphone_b0234f7b3f365bf3', '2018-02-09%'])
.then((res) => {
	console.log('Success', res.json, res.rowcount)
	entidades = res.json;
	entidades.forEach(entidad=> {
		arrayDates.push(entidad['time_index']) 	
	});
	console.log(arrayDates);	
	for(let i=0;i<arrayDates.length;i++){
		//EXAMPLE1 MOMENT.JS
		// construct a moment object with UTC-based input
		var m = moment.utc(arrayDates[i]).tz('America/Mexico_City');
		// format output however you desire
		var s = m.format();
		console.log(s);
		//EXAMPPLE 2 MOMENT.JS
		//var m = moment.tz(time_index,'America/Mexico_City');
        //var dateFormated = m.format();
	}
})
.catch((err)=>{
	console.log(err);
})