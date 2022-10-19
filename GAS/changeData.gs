/*
	changeData.gs - to create new userId, clear all userId, and confirm if userId exist
	Copyright © 2022 Realplus Tech.
	
	Designed by Tim J. April/2022
 
 */


function doGet(e){

  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(5); // wait 5 seconds for others' use of the code section and lock to stop and then proceed
  } catch (e) {
    //Logger.log('Could not obtain lock after 30 seconds.');
    return HtmlService.createHtmlOutput("<b> Server Busy please try after some time <p>")
    // In case this a server side code called asynchronously you return a error code and display the appropriate message on the client side
  }

  //Logger.log( JSON.stringify(e) );
  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);

  var param = e.parameter;
  var mode = param.mode;

  
  if( mode == 'register'){
    
    var id = param.id;
    var msg = mode+id;

    if( registerId( spreadSheet, id ) ){

      lock.releaseLock();
      return ContentService.createTextOutput( " successfully register ");

    }else{

      lock.releaseLock();
      return ContentService.createTextOutput( " the id existed !");
    } 

  }else if ( mode == 'clear'){

    if( clear( spreadSheet ) ){

      lock.releaseLock();
      return ContentService.createTextOutput( " successfully clear ");
    }else{

      lock.releaseLock();
      return ContentService.createTextOutput( " the id existed !");
    } 
  
  }else if( mode == 'list'){

    list = getIdList( spreadSheet );
    var msg = '';

    for( row_index in list ){

      for( col_index in list[row_index] ){

        msg += list[row_index][col_index];
        msg +=',';

      }
    }

    console.log( msg );
    lock.releaseLock();
    return ContentService.createTextOutput(msg);
  }
  
}

function getIdList( spreadSheet ){

  var main_sheet = spreadSheet.getSheetByName("main");
  var list = [];

  for( let row=1 ; row<=main_sheet.getLastRow() ; row++ ){    //O(N)

    var size = main_sheet.getRange( row, 1, 1, 1 ).getValue();

    if( size !='' && size!='0'){

      list.push( main_sheet.getRange( row, 2, 1, size ).getValues()[0] );
    }

    
  }

  return list;
}

function clear( spreadSheet ){
  
  var sheetArray = spreadSheet.getSheets();
  for( var key in spreadSheet.getSheets() ) sheetArray[key].clear();
  return true;

}

function contains( main_sheet, input_id ){

  var row_index = input_id[0].charCodeAt();
  var size = main_sheet.getRange(row_index, 1).getValue();

  if( size == '' || size <= 0 ){
    
    main_sheet.getRange( row_index, 1 ).setValue(0);
    return null;

  } 

  for( var i=2 ; i<size+2 ; i++ ){    // loop over each column

    if( main_sheet.getRange(row_index, i).getValue() == input_id ) return i;

  }

  return null;
}

function registerAllId(){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);

  for( let i=33 ; i<=126; i++ ){

    registerId( spreadSheet, String.fromCharCode(i) );
    console.log(String.fromCharCode(i));
  }


}

function registerId( spreadSheet, input_id ){

  var main_sheet = spreadSheet.getSheetByName("main");
  var row_index = input_id.charCodeAt();
  var col_index = contains( main_sheet, input_id );

  if( col_index == null ){

    var input = new Object();
    input.id = input_id;
    input.rgbr = 0;
    input.rgbg = 0;
    input.rgbb = 0;
    input.humid = 0;
    input.temp = 0;
    input.buzzer = 0;
    input.sonar = 0;
    input.relay = 0;

    col_index = registerId_helper( main_sheet, row_index, input_id );
    push( spreadSheet, input );
    return true;

  }else return false;

}

function push( spreadSheet, input ){

  var record_sheet;
  var main_sheet = spreadSheet.getSheetByName("main");
  var row_index = input.id[0].charCodeAt();
  var col_index = contains( main_sheet, input.id );

  if( col_index == null ) return false;
  
  // record input
  recordSheet = spreadSheet.getSheetByName(input.id[0]);
  if( recordSheet == null ){

    recordSheet = spreadSheet.insertSheet();
    recordSheet.setName(input.id[0]);

  }

  var record=[];
  for( key in input ){

    record.push( input[key] );
  }

  recordSheet.getRange( col_index, 1, 1, record.length ).setValues([record]);
  return true;

}

function registerId_helper( main_sheet, row_index, input_id ){

  var size = main_sheet.getRange( row_index, 1 ).getValue();
  for( let i=2 ; i<size+3 ; i++ ){    // loop over each column

    if( main_sheet.getRange( row_index, i).getValue() == '' ){

      main_sheet.getRange( row_index, i ).setValue(input_id);
      main_sheet.getRange( row_index, 1 ).setValue(size+1);
      col_index = i;
      return i;

    }

  }

  console.log( "can not register ");
  return 1;
  
}