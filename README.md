# SmartRoom
>The project is simply controling relay modules with raspberry pi which runs the application that allow user the control relays. So, when you put everything together, you get a web application that controls your relays.

## Before Setup
```
$ sudo apt-get update
$ sudo apt-get upgrade
```

## NodeJs & NPM Setup
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
$ sudo apt install nodejs
```
## MongoDB Setup
```
$ sudo apt-get install mongodb
$ sudo apt-get update
$ sudo service mongodb start
```  
## Get Application
```
$ git clone https://github.com/Karaborg/SmartRoom.git
```  
## SmartRoom Setup
```
$ cd SmartRoom
$ npm install
```

> If you are having troubles with installing node_modules try removing both node_modules and package-lock.json file and try again.
```
$ rm -rf package-lock.json node_modules && npm install
```

## To Run
```
$ cd /SmartRoom && npm start
```  
## Automatic Start
```
$ sudo systemctl status rc-local
$ sudo nano /etc/rc.local
```
>At the end of the page, you will see `exit 0`.
>Add `cd /home/pi/SmartRoom/ && npm start &&` just above the `exit 0` and `ctrl + x` to save, say yes and exit the folder.
```
$ sudo chmod +x /etc/rc.local
$ sudo systemctl enable rc-local
``` 
## Customization
>To change the `Title`, `Header`, `Sub Titles`, `Raspberry Pi Pin Numbers`, `Port Number` and `Database Connection String`; `.env` file is located in the main folder. You can change all the values there and rest of the project will get the names from there dynamically.

## Raspberry Pi GPIO Pins
[![Raspberry Pi GPIO Pins](https://docs.microsoft.com/en-us/windows/iot-core/media/pinmappingsrpi/rp2_pinout.png)]()
