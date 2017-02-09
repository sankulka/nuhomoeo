var controller = angular.module('acute-followup-controller', [
	'ui.bootstrap'
]);

controller.controller('acute-followup-controller', function AcuteFollowupController($scope, $uibModalInstance, PMSUtilsService, patient) {

	//https://www.codementor.io/angularjs/tutorial/create-dropdown-control	
	$scope.changes = PMSUtilsService.getChanges();
	$scope.mediums = PMSUtilsService.getPayMediums();
	$scope.medicines = PMSUtilsService.getMedicines();

	if (patient != null) {
		$scope.patient = patient;
		$scope.name = patient.name;
		$scope.phone = patient.phone;
		$scope.symptoms = patient.followup.symptoms;
		$scope.treatments = patient.followup.treatments;
	} else {
		$scope.patient = null;
		$scope.name = '';
		$scope.phone = '';
		$scope.symptoms = [];
		$scope.treatments = [];
		$scope.billRaised = 0;
		$scope.billPaid = 0;
		$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
	}
	
	$scope.symptoms.complaint = '';
	$scope.symptoms.change = '';
	$scope.addSymptom = function() {		
		if($scope.symptoms.complaint != '' &&
			$scope.symptoms.change.name != '') {
			var icon = PMSUtilsService.getIconByName($scope.symptoms.change.name);
			$scope.symptoms.push({
				'complaint': $scope.symptoms.complaint,
				'change': $scope.symptoms.change.name,
				'icon': icon
			});
			$scope.symptoms.complaint = '';
			$scope.symptoms.change = '';
		}
	};
	
	$scope.treatments.medicine = '';
	$scope.treatments.potency = '';
	$scope.treatments.dose = '';
	$scope.treatments.frequency = '';
	$scope.addTreatment = function() {
		if($scope.treatments.medicine != '' &&
			$scope.treatments.potency != '' &&
			$scope.treatments.dose != '' &&
			$scope.treatments.frequency != '') {
			$scope.treatments.push({
				'medicine': $scope.treatments.medicine,
				'potency': $scope.treatments.potency,
				'dose': $scope.treatments.dose,
				'frequency': $scope.treatments.frequency
			});
			$scope.treatments.medicine = '';
			$scope.treatments.potency = '';
			$scope.treatments.dose = '';
			$scope.treatments.frequency = '';	   
		}
	};

	$scope.ok = function () {
		var symptoms = [];
		for (var ii = 0; ii < $scope.symptoms.length; ii++) {
			var symptom = $scope.symptoms[ii];
			symptoms.push({
				'complaint': symptom.complaint,
				'change': symptom.change,
				'icon': symptom.icon
			});
		}
		var followup = {
			'symptoms': symptoms,
			'treatments': $scope.treatments
		}
		
		$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
		var billing = {
			'raised': $scope.billRaised,
			'paid': $scope.billPaid,
			'medium': $scope.medium,
			'unpaid': $scope.billUnpaid
		};
		
		var newPatient;
		if ($scope.patient != null) {
			newPatient = $scope.patient;
			newPatient['followup'] = followup;
		} else {
			newPatient = {
				'name': $scope.name,
				'phone': $scope.phone,
				'followup': followup,
				'billing': billing
			};
		}
		
		console.log(newPatient);
		$uibModalInstance.close(newPatient);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});