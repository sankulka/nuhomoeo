$(document).ready(function() {
	$('#calendar').fullCalendar({
		nowIndicator:true,
		header: {
			left: '',
			center: 'today,   title,   next',
			right: ''
		},
		allDaySlot: false,
		timezone: 'local',
		minTime: '10:00',
		maxTime: '20:00',
		defaultView: 'agendaWeek',
		contentHeight: 450,
        editable: true,
        selectable: true,
        selectHelper: true,
        eventLimit: true,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
		disableDragging: true,
		eventDurationEditable: false,
		displayEventTime: false,
/*
		dayRender: function (date, cell) {
			alert ('ffwefwef');
	if (moment().diff(datefffff, 'mins') >= 0) {
		cell.css("background-color", "red");
		$(cell).addClass('disabled');
	}
		},
		eventRender: function(event, element) { 
			//element.find('.fc-event-title').append("<br/>" + event.location); 
			element.find('.fc-time').hide();
		},
*/
		events: function(start, end, timezone, callback) {
			getEvents (start, end, timezone, callback);
        },
		businessHours: [
			{
				start: '10:00',
				end: '14:00',
				dow: [1, 2, 3, 4, 5, 6]
			},
			{
				start: '17:00',
				end: '20:00',
				dow: [1, 2, 3, 4, 5, 6]
			}
		],
		dayClick: function (date, jsEvent, view) {
			dayClickFunction (date, jsEvent, view);
		}
	});
		
});

$(document).ready(function() {
	$('#calendarLoggedIn').fullCalendar({
		nowIndicator:true,		
		header: {
			left: '',
			center: ' prev,   title,   next',
			right: 'month,agendaWeek,today'
		},
		allDaySlot: false,
		timezone: 'local',
		minTime: '10:00',
		maxTime: '20:00',
		defaultView: 'agendaWeek',
		contentHeight: 450,
        editable: true,
        selectable: true,
        selectHelper: true,
        eventLimit: true,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
		disableDragging: true,
		eventDurationEditable: false,
		displayEventTime: false,
/*
		dayRender: function (date, cell) {
	if (moment().diff(dateff, 'mins') >= 0) {
		cell.css("background-color", "red");
		$(cell).addClass('disabled');
	}
		},
		eventRender: function(event, element) { 
			//element.find('.fc-event-title').append("<br/>" + event.location); 
			element.find('.fc-time').hide();
		},
*/
		events: function(start, end, timezone, callback) {
			getEvents (start, end, timezone, callback);
        },
		businessHours: [
			{
				start: '10:00',
				end: '14:00',
				dow: [1, 2, 3, 4, 5, 6]
			},
			{
				start: '17:00',
				end: '20:00',
				dow: [1, 2, 3, 4, 5, 6]
			}
		],
		dayClick: function (date, jsEvent, view) {
			dayClickFunction (date, jsEvent, view);
		},
		eventClick: function (event, jsEvent, view) {
			eventClickFunction (event, jsEvent, view);
		}
	});
});


function dayRenderFunction (date, cell) {
	if (moment().diff(dateff, 'mins') >= 0) {
		cell.css("background-color", "red");
		$(cell).addClass('disabled');
	}
	
	/*
	var next3months = moment().add(3, 'months');		
	if (date > next3months) {
		alert('I am disabling...');
		$(cell).addClass('disabled');
	}*/
}

function dayClickFunction (date, jsEvent, view) {
	
	var dateObj = date.toDate();
	$('#date').attr('datetime', dateObj);
	/*if (moment().diff(date, "mins") >= 0)
		alert ('reselect datetime');
	*/
	
	var scope = angular.element(document.getElementById("calendar-controller")).scope();
	scope.$apply(function() {
		//scope.setDateTime(dateObj);
		scope.addAppointment(dateObj);
	});
				
	//$('input[name="date"]').val(moment(date).format('ddd, DD MMM YYYY'));
	//$('#date').prop('disabled', true);
	//$('input[name="time"]').val(moment(date).format('h:mm a'));
	//$('#selectedPatient option[value="1"]').prop('selected', true);
	//$('#time').prop('disabled', true);
	//$('#duration').prop('disabled', true);
	//$('#calendarModal').modal("show");
};

function eventClickFunction (event, jsEvent, view) {
	var scope = angular.element(document.getElementById("calendar-controller")).scope();
	scope.$apply(function() {
		scope.eventClick(event);
	});
}


function getEvents (start, end, timezone, callback) {
	$.get('/appointments', function (appointments) {
		var scope = angular.element(document.getElementById("calendar-controller")).scope();
		if (scope == null || sccope == undefined || appointments == null || appointments == undefined) {
			console.log('Null or undefined appointments');
			callback ([]);
			return;
		}
		console.log('Number of appointments: ' + appointments.length);
		var isLoggedIn = scope.vm.isLoggedIn;

		var events = [];
		for (var ii = 0; ii < appointments.length; ii++) {
			if (appointments[ii].summary == null ||
				appointments[ii].start == null ||
				appointments[ii].end == null) {
				continue;
			};
			var eventEntry = {};
			eventEntry.id = appointments[ii].id;
			eventEntry.start = appointments[ii].start.dateTime;
			eventEntry.end = appointments[ii].end.dateTime;
			eventEntry.email = appointments[ii].email;

			if (isLoggedIn) {
				var summary = appointments[ii].summary.split('|');
				eventEntry.title = summary[1];
				eventEntry.phone = summary[2];
			} else {
				eventEntry.title = '';
			}

			events.push(eventEntry);
		}
		//alert(JSON.stringify(events));
		callback(events);
	});
};

function setPatient (patient) {
	if (!patient.id || patient.text =='' || patient.element == null ||
		patient.element.value == undefined || patient.element.value == null ||
		patient.element.value == '') {
		return '';
	}

	var patients = angular.element(document.getElementById("calendar-controller")).scope().vm.patients;
	if(patients == null || patients == undefined)
		return '';
	
	//alert(patient.element.value);
	var patientDB = patients[patient.element.value];
	if (patientDB == null)
		return '';

	//var $patient = $('<span class="fa fa-plus">' + patient.text + ' : ' + name + '</span>');
	var $patient = $('<span>' + patient.text + ' : ' + patientDB.phone + '</span>');

	return $patient;
};

$(".tokenizationSelect2").select2({
	placeholder: 'Registered Patient',
	tags: true,
	tokenSeparators: ['/',',',';',"\n"],
	templateResult: setPatient,
	templateSelection: setPatient
});
