/*
 *  GASCommunication.cpp 
 *
 *  Copyright © 2022 Realplus Tech. by Tim
 *  The main code for RP_IOTCloud   
 *  Using NodeMCU1.0 for ESP8266
 *  
 *  To communicate with GAS for publishing data in IOTCloud project
 *  
 */

#include "GASCommunication.h"
#include <Arduino.h> 

GASCommunication::GASCommunication(  ){  // connect to router

    url = "";
    id = "";
}

GASCommunication::~GASCommunication(){
	
}

bool GASCommunication::connectWifi( const char* ssid, const char* password ){

    WiFi.begin(ssid, password); // Connect the Router

    Serial.print("Connecting");
    unsigned long time = millis();
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(1000);
        if (millis() - time > 20000) {
            Serial.print( " Connection Failed ");
            while(1){}
        }
    }

    Serial.println("");
    Serial.print("Successfully connected to : ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    client.setInsecure();

    return true;
}



void GASCommunication::setGAS( String GAS_ID ){ // set url with gas id

    url = "/macros/s/"+GAS_ID+"/exec?";
    
}
void GASCommunication::setId( String ID ){	// set user id
	
    id = ID;
}	


// rgbr, rgbg, rgbb, humid, temperature, buzzer, sonar, relay
bool GASCommunication::pubData( double* data ){
	
	//----------------------------------------Host & httpsPort
	const char* host = "script.google.com";
	const int httpsPort = 443;

	Serial.print("connecting to ");
	Serial.println(host);

	if (!client.connect(host, httpsPort)) {  //Connect to Google host
		Serial.println("connection failed");
		return 0;
	}
	
	String msg = url;
	msg+="mode=publish";
	msg+="&id=";
	msg+=id;
	
	String key[]={ "&rgbr=", "&rgbg=", "&rgbb=", "&humid=", "&temp=", "&buzzer=", "&sonar=", "&relay=" };
	
	for( int i=0 ; i<8 ; i++ ){
		
		key[i]+=data[i];
		msg += key[i];
	}

    Serial.print( msg );
    Serial.println(" ");
    
	client.print(String("GET ") + msg + " HTTP/1.1\r\n" +
		"Host: " + host + "\r\n" +
		"User-Agent: BuildFailureDetectorESP8266\r\n" +
		"Connection: close\r\n\r\n");

	// whether sending data is successful
	String line = "";
	do {
		line = client.readStringUntil('\n');
	} while (line == "");

	String response = "";

	for (int i = 9; i < 12; i++) {
		response = response + line[i];
	}
	
	for( int i=0 ; i<response.length() ; i++ ) Serial.print( response[i]);
    Serial.println(" ");
	
	delay(100);
	
	return true;
	
	
}
