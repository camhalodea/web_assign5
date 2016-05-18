var currentTemperature, currentTempC, todayDate, currentText;
var forecastDay1, day1High, day1Low, day1Text;
var forecastDay2, day2High, day2Low, day2Text;
var forecastDay3, day3High, day3Low, day3Text;

var toCelsius = function(currentTemperature){
	return Math.floor(( currentTemperature - 32) * 5/9);
};

var getCity = function(cityName){
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+ cityName + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data,status){
	currentTemperature = data.query.results.channel.item.condition.temp;
	todayDate = data.query.results.channel.item.forecast[0].date;
	currentText = data.query.results.channel.item.condition.text;
	forecastDay1 = data.query.results.channel.item.forecast[1].date;
	day1High = data.query.results.channel.item.forecast[1].high;
	day1Low = data.query.results.channel.item.forecast[1].low;
	day1Text = data.query.results.channel.item.forecast[1].text;
	forecastDay2 = data.query.results.channel.item.forecast[2].date;
	day2High = data.query.results.channel.item.forecast[2].high;
	day2Low = data.query.results.channel.item.forecast[2].low;
	day2Text = data.query.results.channel.item.forecast[2].text;
	forecastDay3 = data.query.results.channel.item.forecast[3].date;
	day3High = data.query.results.channel.item.forecast[3].high;
	day3Low = data.query.results.channel.item.forecast[3].low;
	day3Text = data.query.results.channel.item.forecast[3].text;
	
	currentTempC = toCelsius(currentTemperature);
	$(".temperature").text(currentTempC);
	$(".date").text(todayDate);
	$(".weather").text(currentText);
	fromTextToSkycon(currentText, today);
	$("#day1Date").text(forecastDay1);
	$("#day2Date").text(forecastDay2);
	$("#day3Date").text(forecastDay3);

	var day1HighC = toCelsius(day1High);
	var day1LowC = toCelsius(day1Low);
	$("#tempRange1").text(day1HighC +"-"+ day1LowC + " ℃");
	var day2HighC = toCelsius(day2High);
	var day2LowC = toCelsius(day2Low);
	$("#tempRange2").text(day2HighC +"-"+ day2LowC + " ℃");
	var day3HighC = toCelsius(day3High);
	var day3LowC = toCelsius(day3Low);
	$("#tempRange3").text(day3HighC +"-"+ day3LowC + " ℃");

	fromTextToSkycon(day1Text, day1);
	fromTextToSkycon(day2Text, day2);
	fromTextToSkycon(day3Text, day3);	
});
}


//text to skycons
var fromTextToSkycon = function(currentText,day){
	if(currentText.search("Sunny")> -1){
		skycons.set(day, Skycons.CLEAR_DAY);
	}else if(currentText.search("Cloudy")> -1){
		skycons.set(day,Skycons.CLOUDY);
	}else if(currentText.search("Showers")> -1){
		skycons.set(day,Skycons.RAIN);
	}else if(currentText.search("Rain")> -1){
		skycons.set(day,Skycons.SLEET);
	}else{
		skycons.set(day,Skycons.PARTLY_CLOUDY_DAY);
	}
}
getCity("Taipei City");
//dropdown menu
// $(".btn.group").addClass("dropdown")
// 			   .attr("data-toggle","dropdown");

$("button").click(function () {
	$("a").each(function (index, element) {
		$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+ $(element).attr("cityurl") +"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data,status){
			var cityTemp = data.query.results.channel.item.condition.temp;
			$(element).children(".cityTemperature").text(toCelsius(cityTemp) + " ℃");
		});
	})
})

$("a").click(function(){
	getCity($(this).attr("cityurl"));
	$("button").text($(this).children(".cityName").text());
})