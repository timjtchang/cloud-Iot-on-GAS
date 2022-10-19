/*
	test_changeData.gs - to manipulate changeData.gs to create new userId, clear all userId, and confirm if userId exist
	Copyright © 2022 Realplus Tech.
	
	Designed by Tim J. April/2022
 
 */
function releaseLock(){

  var lock = LockService.getScriptLock();
  lock.releaseLock();
  
}
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