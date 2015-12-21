// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function rmpGetRequest(request, sender, sendResponse) {
	$.get(request.url, function(data){
		html = $.parseHTML(data)
		listings = $(html).find('.listings')
		name = $(listings).find('.main').html()
		link = $(listings).find('a:first').attr('href')
		if(link) {
			link = 'http://www.ratemyprofessors.com' + link
		}
		sendResponse({link: link, name: request.name})
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