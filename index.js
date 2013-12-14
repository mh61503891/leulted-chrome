$(function() {
	$('title').text(chrome.runtime.getManifest().name)
	$('span.manifest-name').text(chrome.runtime.getManifest().name)
	append_videos(get_videos())
	$('table#talks tbody').delegate('tr', 'click', function() {
		location.href = 'video.html#' + $(this).data('id')
	})
	$('table#talks tbody tr td').delegate('button', 'click', function(e) {
		e.stopPropagation()
		var id = $(this).parent().parent().data('id')
		$('table#talks tbody tr[data-id=' + id + ']').fadeOut(500)
		remove_video(id)
	})
	if ($('table#talks tbody tr').size() == 0) {
		$('div.col-lg-12:first').append($('<a>', {
			href: 'http://www.ted.com',
			target: '_blank',
			html: $('<img>', {
				src: 'intro.png',
				class: 'thumbnail'
			})
		}))
	}
})

function append_videos(videos) {
	$.each(videos, function(index, video) {
		append_video(video)
	})
}

function append_video(video) {
	var tr = $('<tr>', {
		'data-id': video.details.id,
		style: 'cursor:pointer;'
	})
	var td1 = $('<td>', {
		html: $('<img>', {
			src: video.meta.og.image,
			width: 200,
			height: 150,
			class: 'thumbnail'
		})
	})
	var td2 = $('<td>')
	td2.append($('<button>', {
		class: 'close',
		text: $('<div>').html('&times;').text()
	}))
	td2.append($('<p>', {
		style: 'padding-top: 5px',
		html: $('<strong>', {
			text: video.meta.og.title + ' (' + (parseInt(video.meta.video.duration / 60)) + 'm, ' + moment.unix(parseInt(video.meta.video.release_date)).format('YYYY-MM-DD') + ')'
		})
	}))
	td2.append($('<p>', {
		text: video.meta.og.description
	}))
	td2.append($('<p>', {
		html: $('<a>', {
			href: video.meta.og.url,
			text: video.meta.og.url
		})
	}))
	tr.append(td1)
	tr.append(td2)
	$('table#talks tbody').append(tr)
}