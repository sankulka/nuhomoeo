
function getCaseHistoryFormUrl(caseTemplate, patientId) {
  
  var form = FormApp.openById(caseTemplate);
  form.setTitle('Case History for ' + patientId);
  
  var url = form.getPublishedUrl();
  return url;
}

// https://productforums.google.com/forum/#!topic/docs/P2kSVDzt05Q
function getTableFromResponses(itemResponses) {

  var rows = [];
  for (var ii = 0; ii < itemResponses.length; ii++) {
    var item = itemResponses[ii].getItem();
	
	/*
    Logger.log('Type: ' + item.getType());
    Logger.log('Title: ' + item.getTitle());
    Logger.log('Response: ' + itemResponses[ii].getResponse());
    Logger.log('-----------');
	*/

    if (item.getType() == 'LIST' ||
		item.getType() == 'TEXT' ||
		item.getType() == 'DATE' ||
		item.getType() == 'SCALE' ||
		item.getType() == 'PARAGRAPH_TEXT' ||
		item.getType() == 'MULTIPLE_CHOICE') {
      var response = itemResponses[ii];
      if (response != null && response != '') {
        var row = [];
        column = response.getResponse();
		
		if (column != null && column != '') {
			row.push(item.getTitle());
			row.push(column);
			rows.push(row);
		}
      }
    } else if (item.getType() == 'CHECKBOX') {
      var response = itemResponses[ii];
      if (response != null && response != '') {
        var row = [];
        
        var answers = response.getResponse();
        var answer = answers[0];
        for (var jj = 1; jj < answers.length; jj++) {
          if (answers[jj] != null && answers[jj] != '') {
            answer = answer + ', ' + answers[jj];
          }
        }
		
		if (answer != null && answer != '') {
			row.push(item.getTitle());
			row.push(answer);
			rows.push(row);
		}
      }
    } else if (item.getType() == 'GRID') {
      var response = itemResponses[ii];
      if (response != null && response != '') {
        var titleRow = [];
        titleRow.push (item.getTitle());
        titleRow.push ('');
        rows.push (titleRow);        

        var factors = item.asGridItem().getRows();
        var answers = response.getResponse();
        for (var jj = 0; jj < answers.length; jj++) {
          if (answers[jj] != null && answers[jj] != '') {
            var row = [];
            row.push('    ' + factors[jj]);
			
            row.push(answers[jj]);
            rows.push(row);
          }
        }
      }
    } else if (item.getType() == 'CHECKBOX_GRID') {
      var response = itemResponses[ii];
      if (response != null && response != '') {
        var titleRow = [];
        titleRow.push (item.getTitle());
        titleRow.push ('');
        rows.push (titleRow);
		
		var members = item.asCheckboxGridItem().getRows();
		var answers = response.getResponse();
		for (var jj = 0; jj < answers.length; jj++) {
          if (answers[jj] != null && answers[jj] != '') {
            var row = [];
            row.push('    ' + members[jj]);
			
            row.push(answers[jj]);
            rows.push(row);
          }
		}
	  }
    }
  }
  
  /*
  Logger.log('Here are all logs:');
  Logger.log(rows);
  */
  
  return rows;
}

// https://productforums.google.com/forum/#!topic/docs/P2kSVDzt05Q
function onCaseHistorySubmit(e) {
  var source = e.source;
  var response = e.response;
  if (source == null || response == null) {
    Logger.log('Form source or Form Response is null');
  }
  
  var itemResponses = response.getItemResponses();
  var table = getTableFromResponses(itemResponses);
  
  var patientId = itemResponses[0].getResponse();
  
  /*
  var title = source.getTitle();
  var reg = /Case History for (.*)/g;
  var patientId = reg.exec(title)[1];
  */
  
  Logger.log('PatientId from the title: ' + patientId);
  
  var folders = DriveApp.getFoldersByName(patientId);
  while (folders.hasNext()) {
    Logger.log('Got the folder');
    var folder = folders.next();
    Logger.log(folder.getName(), folder.getId());
    
    var doc = DocumentApp.create(patientId + '-CaseHistory');
    var body = doc.getBody();
    body.setText('Case History: ' + patientId);
    body.appendTable(table);
    doc.saveAndClose();
  
    var pdf = DriveApp.getFileById(doc.getId()).getAs("application/pdf");
    var caseHistoryFile = folder.createFile(pdf);
    DriveApp.getFileById(doc.getId()).setTrashed(true);
    Logger.log('case history fileId: ' + caseHistoryFile.getId());
    
    var files = folder.getFilesByName(patientId + '-Details');
    while (files.hasNext()) {
      var detailsFile = files.next();
      var detailsSheet = SpreadsheetApp.open(detailsFile);
      Logger.log('detailsSheetId: ' + detailsSheet.getId());
      var sheet = detailsSheet.getSheetByName("Activities");
      
      var rowEntry = [];
      rowEntry.push(new Date().toISOString());
      rowEntry.push('CaseHistory');
      rowEntry.push('Case History');
      rowEntry.push(caseHistoryFile.getId());
      rowEntry.push('https://drive.google.com/open?id=' + caseHistoryFile.getId());
      Logger.log('Entry: ' + rowEntry);
      sheet.appendRow(rowEntry);
      break;
    }
    break;
  }
}
