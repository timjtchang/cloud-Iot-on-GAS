/*
 *  GASCommunication.h 
 *
 *  Copyright © 2022 Realplus Tech. by Tim
 *  The main code for RP_IOTCloud   
 *  Using NodeMCU1.0 for ESP8266
 *  
 *  To communicate with GAS for publishing data in IOTCloud project
 *  
 */
#ifndef __GASCommunication_H
#define __GASCommunication_H

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <Arduino.h> 

class GASCommunication{
	
public:
	
	GASCommunication();
	~GASCommunication();

    bool connectWifi( const char*, const char* );
	void setId( String );
	void setGAS( String );
	bool pubData( double* );	
	
private:
	
	WiFiClientSecure client; // Create a WiFiClientSecure object.
	char* ssid;
	char* password;

	String url;
	String id;		
		
};

#endif 
