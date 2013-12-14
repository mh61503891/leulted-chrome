chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(arguments)
	switch (request.name) {
		case 'add_video':
			sendResponse(add_video(request.params))
			break
		case 'get_videos':
			sendResponse(get_videos(request.params))
			break;
	}
})