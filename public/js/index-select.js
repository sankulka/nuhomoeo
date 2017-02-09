$(document).ready(function(){
	alert('in undex2');
  $(".tokenizationSelect2").select2({
		placeholder: "Your favourite car", //placeholder
		tags: true,
		tokenSeparators: ['/',',',';'," "] 
	});
})