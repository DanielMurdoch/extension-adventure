chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		$('.Professor').each(function(index){
			profName = this.innerHTML
			profURL = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+ottawa&queryoption=HEADER&query=' + profName.replace(' ', '+') + '&facetSearch=true'

			this.innerHTML = "<a href=''>" +  profName +  "</a>"

			chrome.runtime.sendMessage({tag: "fetch_rmp_data", url: profURL}, function(response) {
  				console.log(response);
			});

			//console.log(profName)
			//console.log(profURL)
		})
	}
	}, 10);
});