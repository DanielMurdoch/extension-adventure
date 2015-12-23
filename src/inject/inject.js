/** 
	Response Format:
	link: A String containing the link to the individual prof's RMP page.
	name: A String containing the prof's name. Exactly the same as the profName param sent in the request.
	overallGrade: String containing the prof's overall grade.
	averageGrade: String containing the prof's average class grade.
	helpfullness: String containing the prof's average given helpfullness grade.
	clarity: String containing the prof's average given clarity grade.
	easiness: String containing the prof's average given easiness grade.
**/
const UOTTAWA_RMP_PREFIX = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+ottawa&queryoption=HEADER&query='
const UOTTAWA_RMP_SUFFIX = '&facetSearch=true'

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);

		$('<th>RMP Stats</th>').insertAfter($('[id^=hdr_professor]'))

		$('.footer').each(function(index, element) {
			$($(element).children()[0]).attr('colspan', 6)
		})

		$('.Professor').each(function(index, element) {
			var profName = this.innerHTML
			var profURL =  UOTTAWA_RMP_PREFIX + profName.replace(' ', '+') + UOTTAWA_RMP_SUFFIX
			chrome.runtime.sendMessage({tag: 'fetch_rmp_data', url: profURL, name: profName}, function(response) {	
  				if(response.link) {
  					$(element).html('<a href=' + response.link + '>' + response.name + '</a>')

  					var listContent = "Overall:&nbsp" + response.overallGrade + " Avg.Grade:&nbsp" + response.averageGrade + " Help:&nbsp" + response.helpfullness + " Clarity:&nbsp" + response.clarity + " Easiness:&nbsp" + response.easiness

  					$('<td>' + listContent + '</td>').insertAfter($(element)) 
  				}
			});

			
		})
	}
	}, 10);
});