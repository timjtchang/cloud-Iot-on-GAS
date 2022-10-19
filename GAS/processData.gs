/*
	processData.gs - to update data and get data from spread sheet.
	Copyright © 2022 Realplus Tech.
	
	Designed by Tim J. April/2022
 
 */
 
function debug() {
  
  var msg = {

    parameter:{
      mode:'request',
      id:'1234'
    }

  }

  console.log( doGet(msg).getContent() );
}

function doGet(e){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);

  var param = e.parameter;
  var mode = param.mode;

  
  if( mode =='request'){      // request data

    var id = param.id;
    var msg = mode+id;
    var msg = requestData( spreadSheet, id );

    if( msg == '' ) return ContentService.createTextOutput('-'+id);
    else return ContentService.createTextOutput(msg);

  }else if ( mode=='publish' ){

    var id = param.id;
    var msg = mode+id;
    if( publish( spreadSheet, param ) ){

      return ContentService.createTextOutput(" successfully publish ");
    }else{

      return ContentService.createTextOutput(" failed ");
    } 
    
  }  

}

function publish( spreadSheet, param ){

  var input = new Object();
  input.id = '1234';
  input.rgbr = 10;
  input.rgbg = 0;
  input.rgbb = 0;
  input.humid = 0;
  input.temp = 0;
  input.buzzer = 0;
  input.sonar = 0;
  input.relay = 0;

  for( let key in param ){

    if( key == 'mode' ) continue;
    else input[key] = param[key];
  }
  return push( spreadSheet, input );

}

function requestData( spreadSheet, id ){

  var record = getRecord(spreadSheet, id, 0 );

  if( record == null ) return '';

  msgArray= [ '&id=', '&rgbr=', '&rgbg=', '&rgbb=', '&humid=', '&temp=', '&buzzer=', '&sonar=', '&relay=' ];
  var msg = '';

  for( index in record[0] ){

    if( record[0][index]=='') msg += msgArray[index]+'0';
    else msg += msgArray[index]+record[0][index];
     
  }

  return msg;

}

function pop( spreadSheet, input_id ){

  getRecord( spreadSheet, input_id, 1 );
}


function getRecord( spreadSheet, input_id, isClear ){

  var row_index = input_id[0].charCodeAt();
  var main_sheet = spreadSheet.getSheetByName("main");
  var size = main_sheet.getRange( row_index, 1 ).getValue();
  var record=[];

  var col_index = contains( main_sheet, input_id);

  if( col_index != null ){

    recordSheet = spreadSheet.getSheetByName(input_id[0]);
    console.log(col_index);

    record = recordSheet.getRange( col_index, 1, 1, 9).getValues();
    if(isClear) recordSheet.getRange( col_index, 1, 1, 9 ).clear();

  }else return null;

  return record;
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

function pushId( spreadSheet, input ){

  for( let i='a'.charCodeAt() ; i<='z'.charCodeAt() ; i++ ){

    input.id = String.fromCharCode(i);
    push(spreadSheet, input );
  }

  for( let i='0'.charCodeAt() ; i<='9'.charCodeAt() ; i++ ){

    input.id = String.fromCharCode(i);
    push(spreadSheet, input );
  }

  for( let i='A'.charCodeAt() ; i<='Z'.charCodeAt() ; i++ ){

    input.id = String.fromCharCode(i);
    push(spreadSheet, input );
  }

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
