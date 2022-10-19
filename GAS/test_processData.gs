/*
	test_processData.gs - to manipulate processData.gs to update data and get data from spread sheet.
	Copyright © 2022 Realplus Tech.
	
	Designed by Tim J. April/2022
 
 */

function list_test(){

  var msg = {

    parameter:{
      mode:'list',
    }

  }

  console.log( doGet(msg).getContent() );
}
function register_test() {
  
  var msg = {

    parameter:{
      mode:'register',
      id:'1234'
    }

  }

  console.log( doGet(msg).getContent() );
}

function publish_test(){

  var msg = {

    parameter:{
      mode:'publish',
      id:'1234',
      rgbr:'1',
      rgbg:'2',
      rgbb:'3',
      humid:'4',
      temp:'5',
      buzzer:'6',
      relay:'7',
      sonar:'8'

    }

  }

  console.log( doGet(msg).getContent() );


}

function request_test(){

  var msg = {

    parameter:{
      mode:'request',
      id:'dddd'
    }

  }

  console.log( doGet(msg).getContent() );

}

function clear_test(){
  var msg = {

    parameter:{
      mode:'clear',
    }

  }

  console.log( doGet(msg).getContent() );

}
function pop_test(){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  var id='1234';
  console.log( pop( spreadSheet, id )[0]);
}

function getRecord_test(){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  var id='1234';
  console.log( getRecord( spreadSheet, id )[0]);


}

function tmp_test(){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);

  getIdList( spreadSheet );
}

function push_test(){

  var spreadSheetId = '1gpUuBtE_8wIKignsT5YIu9qe6IqivMi6rcCGIIj8V9c';
  var spreadSheet = SpreadsheetApp.openById(spreadSheetId);

  var input = new Object();
  input.id = '223';
  input.rgbr = 10;
  input.rgbg = 0;
  input.rgbb = 0;
  input.dht = 0;
  input.buzzer = 0;
  input.sonar = 0;
  input.relay = 0;

  push( spreadSheet, input );
}

function test(e){

  var param = e.parameter;
  var mode = param.mode;
  var id = param.id;
  var msg = "mode="+mode+id;

  var record=[['a','b']][0];
  var msg='';
  
  for( let index in record ){

    msg+=record[index];
  }

  console.log("in doGet "+msg);
  if( mode == 'request'){

    return ContentService.createTextOutput(msg);

  }else{

    return ContentService.createTextOutput('wtf');
  }

}