/** 
	Response Format:
	link: A String containing the link to the individual prof's RMP page.
	name: A String containing the prof's name. Exactly the same as the profName param sent in the request.
	overallGrade: String containing the prof's overall grade
**/
const UOTTAWA_RMP_PREFIX = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+ottawa&queryoption=HEADER&query='
const UOTTAWA_RMP_SUFFIX = '&facetSearch=true'

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);

		$('.Professor').each(function(index, element){
			var profName = this.innerHTML
			var profURL =  UOTTAWA_RMP_PREFIX + profName.replace(' ', '+') + UOTTAWA_RMP_SUFFIX
			chrome.runtime.sendMessage({tag: 'fetch_rmp_data', url: profURL, name: profName}, function(response) {	
  				if(response.link) {
  					$(element).html('<a href=' + response.link + '>' + response.name + ' (' + response.overallGrade+ ')</a>')
  				}
			});
		})
	}
	}, 10);
});