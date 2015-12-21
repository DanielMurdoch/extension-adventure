/** 
	Response Format:
	link: A String containing the link to the individual prof's RMP page.
	name: A String containing the prof's name. Exactly the same as the profName param sent in the request.
**/

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		$('.Professor').each(function(index, element){
			profName = this.innerHTML
			profURL = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+ottawa&queryoption=HEADER&query=' + profName.replace(' ', '+') + '&facetSearch=true'
			chrome.runtime.sendMessage({tag: "fetch_rmp_data", url: profURL, name: profName}, function(response) {	
  				if(response.link) {
  					$(element).html("<a href=" + response.link + ">" + response.name + " (" + response.overallGrade+ ")</a>")



  					console.log(response)
  					console.log(element)
  				}
			});
		})
	}
	}, 10);
});