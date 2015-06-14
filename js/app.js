
function addTask() {
	var idStr = "checkbox_";
	var idCounter = 0;
	var id;
	
	return function(value) {
		if ( !(typeof value === 'string') )  {
			return;
		}

		id = idStr + ++idCounter;		
		
		str = '<li class="clearfix">' 
		+ '<input id="' + id +'"type="checkbox">'
		+ '<label for="' + id + '">'+ value +'</label>'
		+ '<a class="remove"></span></a></li>';

		$( "#jquery_checkbox_list" ).append(str);	
	}
}

(function () {	
	var ENTER = 13;
	var ESC = 27;
	var text;
	var taskCounter = addTask();
	
	/*
	 * Enter keypress listener & handler 
	 */
	 $("#enter_data").keypress(function(event) {

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

			taskCounter(text);
		}	
	});

	 /*
	  * Edit task
	  */
	   

	 $("#jquery_checkbox_list").on("dblclick", function(event) {
	 var editStr;
	 var input;
	 var e;
	 var oldTask;

	 	//dbl on label
	 	if ($(event.target).prop('tagName') !== 'LABEL') {
	 		return;
	 	}	
	 		
	 	e = $(event.target);

	 	//do not display checkbox, label
		$(event.target).hide();
	 	$(event.target).siblings('input').hide();
		$(event.target).siblings('a').addClass('edit--a');
		
		//remember unput value
		editStr = $(event.target).text();

	 	//create input
	 	input = '<input class="edit" type="text" value=' + editStr +' maxlength="100">'

	 	//add to DOM
	 	$(event.target).closest('li').append(input);
	 	
	 	$("#jquery_checkbox_list").on('keyup', function(event) {
	 		
	 		//if Esc nothing to be changed
	 		if (event.which === ESC) {
	 			
	 			e.show();
	 			e.siblings('.edit').remove();
	 			e.siblings('input').show();
	 			e.siblings('a').removeClass('edit--a');	
	 		}

	 		//if Enter change input
	 		if (event.which === ENTER) {
	 			oldTask = e.text();	 		


	 		//if empty or starts with space caracter 
			if ( $(event.target).val().charAt(0) === ' ' || 
	 			$(event.target).val().charAt(0) === '' ) {
				
				e.siblings('.edit').val(oldTask);
				return;
			}
	 			e.text(e.siblings('.edit').val());
	 			e.show();
	 			e.siblings('.edit').remove();
	 			e.siblings('input').show();
	 			e.siblings('a').removeClass('edit--a');
	 			event.preventDefault();

	 		}

	 	});

	 	
	});
	/*
	 * Remove task
	 */

	 $("#jquery_checkbox_list").on("click", function(event) {
	 	
	 	//remove thumbnail pressed
	 	if ($(event.target).attr('class') === 'remove') {
	 		
	 		$(event.target).closest('li').remove();
	 	}	
	 });	

	
	/*
	 * Crossout task
	 */
	 
	 $("#jquery_checkbox_list").on("change", function(event) {
	 	
	 	if($(event.target).is(":checked")) {
			
			$( event.target).siblings('label').addClass("crossout");
		
		} else {
		
			$( event.target).siblings('label').removeClass("crossout");
		}
	//$( event.target).siblings('label').bind(selectTask());

	 });

	
	/*
	 * Crossout all tasks
	 */

	$("#check_all").on("change", function() {
	 	
	 	if($(this).is(":checked")) {

	 		//check tasks
	 		$('#jquery_checkbox_list input').prop('checked', true);
	 		//cross out tasks
			$('#jquery_checkbox_list label').addClass("crossout");
			
		
		} else {
			
			//uncheck tasks
	 		$('#jquery_checkbox_list input').prop('checked', false);
	 		//remove cross out class
			$('#jquery_checkbox_list label').removeClass("crossout");	
		}
	});
	
	
	/*
	 * Remove all checked tasks
	 */

	$("#remove_checked").on("click", function() {
		
		//if checkbox checked, remove parent li
		$("#jquery_checkbox_list li :input").each(function() {
			if ( $(this).is(' :checked') ){
				$(this).closest('li').remove();
			}
		})
	});

})();
