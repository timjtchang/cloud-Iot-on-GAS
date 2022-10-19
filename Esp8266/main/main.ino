
/*
 *  Copyright © 2022 Realplus Tech. by Tim
 *  The main code for RP_IOTCloud   
 *  Using NodeMCU1.0 for ESP8266
 *  
 *  To communicate with GAS for publishing data in IOTCloud project
 *  
 */
#include <GASCommunication.h>
#include "config.h"
GASCommunication gas;

// [ rgbr, rgbg, rgbb, humid, temp, buzzer, sonar, relay
double data[] = { 255, 0.0, 0.0, 36.0, 45.0, 124, 23, 1 };

void setup() {

    Serial.begin(9600);
    gas.connectWifi( SSID, PASSWORD );
    gas.setId( USERID );
    gas.setGAS( GASID );
    

  
}// end function setup

void loop() {


    for( int i=0 ; i<8 ; i++ ){

        data[i]+=1;
    }

    data[0] = random(0,255);
    data[1] = random(0,255);
    data[2] = random(0,255);

    data[3] = random(25.5, 50.7);
    data[4] = random(25.5, 50.7);
    gas.pubData(data);

    
  
}
