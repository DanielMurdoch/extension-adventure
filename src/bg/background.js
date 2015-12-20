// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function rmpGetRequest(request, sender, sendResponse) {
	$.get(request.url, function(data){
		sendResponse({data: data})
	}).fail(function(){
		sendResponse({data: "Fail"})
	})
	//sendResponse({farewell: request.url});
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