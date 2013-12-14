function get_video_params() {
	// details
	eval($('#videoHolder').next().text())
	var details = talkDetails
	// meta
	var meta = {
		og: {
			title: $("meta[property='og:title']").attr('content'),
			description: $("meta[property='og:description']").attr('content'),
			image: $("meta[property='og:image']").attr('content'),
			url: $("meta[property='og:url']").attr('content'),
		},
		video: {
			tag: $("meta[property='video:tag']").map(function(index, tag) {
				return $(tag).attr('content')
			}).get(),
			duration: $("meta[property='video:duration']").attr('content'),
			release_date: $("meta[property='video:release_date']").attr('content')
		}
	}
	return {
		meta: meta,
		details: details
	}
}

var video_params = get_video_params()
$('div.talk-tools').after($('<div>', {
	class: 'talk-tools clearfix',
	html: $('<ul>', {
		html: $('<li>', {
			html: $('<a>', {
				class: 'talk-tool-btn favorite'
			}).on('click', function() {
				chrome.runtime.sendMessage({
					name: 'add_video',
					params: video_params
				}, function() {})
			}).append($('<span>', {
				class: 'talk-tool-icon'
			})).append($('<span>', {
				text: chrome.runtime.getManifest().name
			}))
		})
	})
}))