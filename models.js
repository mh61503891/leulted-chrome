function add_video(video) {
	console.log(arguments)
	localStorage.setItem('video-' + video.details.id, JSON.stringify(video))
	return true
}

function remove_video(id) {
	console.log(arguments)
	localStorage.removeItem('video-' + id)
}

function get_video(id) {
	console.log(arguments)
	return JSON.parse(localStorage.getItem('video-' + id))
}

function get_ids() {
	console.log(arguments)
	var keys = $.grep(Object.keys(localStorage), function(key) {
		return key.match(/video-\d+/)
	})
	var ids = $.map(keys, function(key) {
		return key.replace('video-', '')
	})
	return ids
}

function get_videos() {
	console.log(arguments)
	var videos = $.map(get_ids(), function(id) {
		return get_video(id)
	})
	return videos
}

function get_video_caption(id, lang) {
	return $.ajax({
		async: false,
		type: 'GET',
		dataType: 'json',
		timeout: 1000,
		url: 'http://www.ted.com/talks/subtitles/id/' + id + '/lang/' + lang + '/format/json',
		success: function(data, status) {
			return data.captions
		},
		error: function() {}
	}).responseJSON.captions
}

function set_video_offset(id, ms) {
	localStorage.setItem('offset-' + id, ms)
}

function get_video_offset(id) {
	var offset = localStorage.getItem('offset-' + id)
	return parseInt(offset ? offset : 12000)
}