(function ($) {	
	var ENTER = 13;
	var ESC = 27;
	var idCounter = 0;
	
	
	/*
	 * Enter keypress listener & handler 
	 */

	 $("#enter_data").keypress(function(event) {
	 	var id_;
	 	var text;
	 	var idStr = "checkbox_";
	 	
	 	if(event.which === ENTER) {
	 		text = $("#enter_data").val();

			//data isn't sent on server	
			event.preventDefault();

			//clear input
			$(this).val('');
			
			//empty tasks aren't stored
			if (text === '') {
				return;
			}

			//tasks can't start with a space character
			if (text.charAt(0) === ' ') {
				return;
			}

			/*
			 * Add task
			 */

			(function() {

			 	id_ = idStr + ++idCounter;

			 	var li = $('<li></li>').addClass('clearfix');		
			 	var input = $('<input>').attr({ id: id_, type: "checkbox" });
			 	var label = $('<label></label>').attr("for", "id_").text(text);
			 	var a = $('<a></a>').attr("class", "remove");

			 	li.append(input);
			 	li.append(label);
				li.append(a);
				$( "#jquery_checkbox_list" ).append(li);
	
			 })();
		}	

	});


	/*
	 * Edit task
	 */

	$("#jquery_checkbox_list").on("dblclick", function(event) {
		var editStr;
		var input;
		var oldTask;

		var $e = $(event.target);

		//dbl on label
		if ($e.prop('tagName') !== 'LABEL') {
	 		return;
		}	

		//do not display checkbox, label
		$e.hide();
		$e.siblings('input').hide();
		$e.siblings('a').addClass('edit--a');

		//remember unput value
		editStr = $e.text();

		//create input
		input = '<input class="edit" type="text" value=' + editStr +' maxlength="100">'

		//add to DOM
		$e.closest('li').append(input);
	 	
		$("#jquery_checkbox_list").on('keyup', function(event) {
	 		
	 		//if Esc nothing to be changed
	 		if (event.which === ESC) {
	 			
	 			$e.show();
	 			$e.siblings('.edit').remove();
	 			$e.siblings('input').show();
	 			$e.siblings('a').removeClass('edit--a');	
	 		}

	 		//if Enter change input
	 		if (event.which === ENTER) {
	 			
	 			oldTask = $e.text();	 		


	 			//if empty or starts with space caracter 
	 			if ( $(event.target).val().charAt(0) === ' ' || 
	 			$(event.target).val().charAt(0) === '' ) {

	 				$e.siblings('.edit').val(oldTask);
	 				return;
	 			}
	 	
	 			//new text
	 			$e.text($e.siblings('.edit').val());
	 			$e.show();
	 			$e.siblings('.edit').remove();
	 			$e.siblings('input').show();
	 			$e.siblings('a').removeClass('edit--a');
	 			event.preventDefault();
	 		}
	
		});
	
	});


	/*
	 * Remove task
	 */

	 $("#jquery_checkbox_list").on("click", function(event) {

	 	var $e = $(event.target);
	 	
	 	//remove thumbnail pressed
	 	if ($e.attr('class') === 'remove') {	
	 		
	 		$e.closest('li').remove();
	 	}	
	 
	 });	


	/*
	 * Crossout task
	 */
	 
	 $("#jquery_checkbox_list").on("change", function(event) {

	 	var $e = $(event.target);
	 	
	 	if ($e.is(":checked")) {

	 		$e.siblings('label').addClass("crossout");

	 	} else {

	 		$(event.target).siblings('label').removeClass("crossout");
	 	}
	 
	 });


	/*
	 * Crossout all tasks
	 */

	 $("#check_all").on("change", function() {

	 	var $input = $('#jquery_checkbox_list input');
	 	var $label = $('#jquery_checkbox_list label');

	 	if($(this).is(":checked")) {

	 		//check tasks
	 		$input.prop('checked', true);
	 		//cross out tasks
	 		$label.addClass("crossout");


	 	} else {

			//uncheck tasks
			$input.prop('checked', false);
	 		//remove cross out class
	 		$label.removeClass("crossout");	
	 	}
	 });


	/*
	 * Remove all checked tasks
	 */

	 $("#remove_checked").on("click", function() {

	 	var $item = $("#jquery_checkbox_list li :input");

		//if checkbox checked, remove parent li on each iteration
		$item.each(function() {
			
			if ($(this).is(' :checked')) {
				
				$(this).closest('li').remove();
			}
		})
	});

})(jQuery);
