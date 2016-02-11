$(function() {
	'use strict';
	
	function applyEvents($table) {
		if(!$table.is('table')) {
			return;
		}
	
		var $dragColumns  = $table.find('th'); // first row columns, used for changing of width
		 // return if didn't find any header cells
		if ($dragColumns.length === 0) {
			console.log('Didn\'t find header in the table');
			return;
		}
	
		var dragX;        // last event X mouse coordinate
		var $dragColumn = null;
		var saveBodyCursor;  // save body cursor property
	
		function changeColumnWidth($column, width_to_add) {
			if ($dragColumns.length === 0) {
				console.log('Resizable : there is no column !');
				return false;
			}
	
			if ($column.width() <= -width_to_add) {
				return false;
			}
			
			var actual_width = $column.width();
			$column.css('width', actual_width + width_to_add);

			return true;
		}
	
		function columnDrag(e) {
			var X = e.pageX;
			
			if (!changeColumnWidth($dragColumn, X-dragX)) {
				stopColumnDrag(e);
			}
	
			dragX = X;
			e.preventDefault();
			
			return false;
		}
	
	
		function stopColumnDrag(e) {
			if ($dragColumns === 0) {
				return;
			}
	
			var $document = $(document);
			$document.unbind('mouseup', stopColumnDrag);
			$document.unbind('mousemove', columnDrag);

			$('body').css('cursor', saveBodyCursor);
			
			e.preventDefault();
		}
	

		function startColumnDrag(e) {
			// Remember dragging object
			$dragColumn = $(e.target).parent().parent('th');
			dragX = e.pageX;

			// Set up current columns widths in their particular attributes.
			// Do it in two steps to avoid jumps on page.
			var colWidth = [];
			for (var i=0; i<$dragColumns.length; i+=1) {
				colWidth[i] = $dragColumns.eq(i).width();
			}
			
			for (var i=0; i<$dragColumns.length; i+=1) {
				var $column = $dragColumns.eq(i);
				$column.attr('width', '');
				$column.css('width', colWidth[i] + 'px');
			}
	
			var $body = $('body');
			saveBodyCursor = $body.css('cursor');
			$body.css('cursor', 'w-resize');

			$(document).on({
				mouseup: stopColumnDrag,
				mousemove: columnDrag,
			});
	
			e.preventDefault();
			e.stopPropagation();
		}
	
		$dragColumns.each(function() {
			if($(this).find('.resizable-outer_div').length !== 0) {
				return;
			}
			
			var $outer_div = $('<div></div>');
			$outer_div.addClass('resizable-outer_div');

			var $resizer_div = $('<div></div>');
			$resizer_div.addClass('resizable-resizer_div');
			var $my_elem = $resizer_div.insertBefore($(this));
			$(this).prepend($my_elem);
			$(this).children().wrapAll($outer_div);
			$resizer_div.on('mousedown', startColumnDrag);
		});
	}
	
	$.fn.colResize = function() {
		applyEvents(this);
		return this;
	};
	
});