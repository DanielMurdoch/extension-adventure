/** 
	Request Format:
	tag: Tag containing the request type / action.
	url: String containing the url to the search page for the individual prof.
	name: String containing the prof name.
**/
function rmpGetRequest(request, sender, sendResponse) {
	$.get(request.url, function(data){
		profLink = $($($.parseHTML(data)).find('.listings')).find('a:first').attr('href')
		if(profLink) {
			profLink = 'http://www.ratemyprofessors.com' + profLink
		}
		sendResponse({link: profLink, name: request.name})
	}).fail(function(){
		sendResponse(null)
	})
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.tag == "fetch_rmp_data") {
      	rmpGetRequest(request, sender, sendResponse)
      	return true;
    } else {
    	chrome.pageAction.show(sender.tab.id);
    	sendResponse({data: "for real"});
    }
  });