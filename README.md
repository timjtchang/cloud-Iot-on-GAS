# RP_iot-cloud

# Esp8266:

Put the file GASCommunication in libraries of Arduino,
open the Arduino IDE.

The example will be found on RP_Cloud-Iot > main.

The user can apply the program on any other code.


# UI:

UI.html for the main UI.

listUI.html for sweep across list and present all userId.

img includes the images that the UI need.


## how to use

users should register when firstly use a userId.

After registering, the UI will automatically work.

if the userId are not used in the first time, the user could directly enter the userId.

if the user enters "rpclearall" and then register, all of the userId in the list will be cleared.

# GAS

## changeData

changeData.gs -- to register new userId, list all userId, and clear all userId

there is a lock process to void collision.

test_changeData.gs -- some example to process changeData.gs

GAS ID: AKfycbxanjIWXuYsx3Xul3U5l2_QRVvKfzTIXFZjxhi4P3nxh31uGg5MosME05KWI6xsTybc

## processData

processData.gs -- to update new userId, search for userId, and get data from the sheet.

test_processData.gs -- some example to process processData.gs

GAS ID: AKfycbxanjIWXuYsx3Xul3U5l2_QRVvKfzTIXFZjxhi4P3nxh31uGg5MosME05KWI6xsTybc


## url explanation

mode=reguset -- get data

mode=publish -- update new data

mode=register -- register new userId

mode=clear -- wipe out all userId

