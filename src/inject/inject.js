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
const BASE_STRUCTURE = '<td><div id="rmp_overall">Overall:&nbsp</div> <div id="rmp_average">Avg.Grade:&nbsp</div> <div id="rmp_help">Help:&nbsp</div> <div id="rmp_clarity">Clarity:&nbsp</div> <div id="rmp_easiness">Easiness:&nbsp</div></td>'


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);
		//Check if storage data is too old.
		chrome.runtime.sendMessage({tag: 'check_timestamp'}, function(response){

		})
		//Insert new TH after any instances of Professor TH.
		$('<th>RMP Stats</th>').insertAfter($('[id^=hdr_professor]'))
		//Extend footers of sections in the table, just to make things pretty.
		$('.footer').each(function(index, element) {
			$($(element).children()[0]).attr('colspan', 6)
		})
		//Iterate over each Professor element. This includes both / all tables on the page.
		$('.Professor').each(function(index, element) {
			//Get the prof's name, massage.
			var profName = this.innerHTML
			var profURL =  UOTTAWA_RMP_PREFIX + profName.replace(' ', '+') + UOTTAWA_RMP_SUFFIX
			//Inserts the basic structure of the RMP column before fetching anything, prevents unsightly load times and page jutter.
			$(BASE_STRUCTURE).insertAfter($(element)) 
			//Call the event/background script to do the gets using a message listener.
			chrome.runtime.sendMessage({tag: 'fetch_rmp_data', url: profURL, name: profName}, function(response) {	
  				//If the ajax calls don't fail, then the response will be non-null.
  				if(response) {
  					//Edits the prof column, turning the name into a link to their RMP page.
  					if(response.link) {
  						$(element).html('<a target="_blank" href=' + response.link + '>' + response.name + '</a>')
  					}
  					//Fills the data in the new RMP column.
  					$(element).next().find('#rmp_overall').append(response.overallGrade)
  					$(element).next().find('#rmp_average').append(response.averageGrade)
  					$(element).next().find('#rmp_help').append(response.helpfullness)
  					$(element).next().find('#rmp_clarity').append(response.clarity)
  					$(element).next().find('#rmp_easiness').append(response.easiness)
  				}
			});
		})
	}
	}, 10);
});