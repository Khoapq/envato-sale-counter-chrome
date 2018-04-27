(function ($) {
	$(document).ready(function () {
		/**
		 * Get items id
		 * @type {any}
		 */
		var store = JSON.parse(localStorage.getItem('items'));

		/**
		 * Loop and count sale
		 */
		if (store) {
			$.each(store, function (index, element) {
				var json_url = "http://marketplace.envato.com/api/edge/item:" + element + ".json";
				$.getJSON(json_url, {
					format: "json"
				})
					.done(function (data) {
						$('.list').append('<li><button class="remove" data-id="' + element + '" title="Remove Item">x</button> <img src="' + data.item.thumbnail + '" width="32px" height="32px" title="' + data.item.item + '"/> <strong class="sale">' + data.item.sales + '</strong> (sales)</li>');
					});
			});
		} else {
			store = new Array();
		}

		/**
		 * Add item
		 */
		$('.add_item').on('submit', function (e) {
			e.preventDefault();
			var item_id = $('input[name=item_id]').val();

			store.push(item_id.toString());
			localStorage.setItem('items', JSON.stringify(store));
			window.location.href = "popup.html";
		});


		/**
		 * Remove item
		 */
		$('.list').on('click', '.remove', function (e) {
			e.preventDefault();
			var item_id = $(this).data('id');

			store.pop(item_id);
			localStorage.setItem('items', JSON.stringify(store));
			window.location.href = "popup.html";
		});


		setInterval(function () {
			var dt = new Date();
			var time = dt.toLocaleString();
			$('.current-time .number').html(time);


			var envatoTime = calcTime(10);
			$('.envato-time .number').html(envatoTime);

		}, 1000);


	});


	function calcTime(offset) {

		// create Date object for current location
		d = new Date();

		// convert to msec
		// add local time zone offset
		// get UTC time in msec
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);

		// create new Date object for different city
		// using supplied offset
		nd = new Date(utc + (3600000 * offset));

		// return time as a string
		return nd.toLocaleString();

	}


})(jQuery);


