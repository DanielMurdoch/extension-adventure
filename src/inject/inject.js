chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		$('.Professor').each(function(index){
			console.log(this.innerHTML)
			profName = this.innerHTML
			this.innerHTML = "<a href=''>" +  profName +  "</a>"
		})

	}
	}, 10);
});