This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

Project requirements are described here [challenge.pdf](https://raw.githubusercontent.com/mariusz-kabala/adverity-challenge/master/challenge.pdf). 

Customizations - in my implementation user is able to upload any CVS file and deside how to visualize the data there. 
First user has to upload cvs file or use the example file from the challenge. Then cvs fields need to be setup. User has to define which field contains time, which one dimentions and which metrics. After that app is good to go, and chart can be generated.

## Design assumptions

### Keep it simple, react based

I tried to add as little dependencies as possible. For production ready solution I would go with a lib for state manager like redux or effector. Also used some well tested CSV parser like [Papa Parse](https://www.papaparse.com/). Here I decided to have fun and write more things by myself. 


### Isolate application layers 

- UI isolated from business logic. Components only with UI related code, all business logic in hooks
- Application state in react context
- css modules, share css code only by using scss mixins
- all heavy computation done in web workers

## Customizations in CRA

- In order to use web workers I added [workerize-loader](https://github.com/developit/workerize-loader) and to incorporate it into CRA setup I used [react-app-rewired](https://www.npmjs.com/package/react-app-rewired)

## Potential impromevents
- allow user to choose date format in csv file
- allow user to setup cvs field separator - now only comma separator is supported
- implement lazy loading in `<MultiSelectDropdown />` component - right now if field has many values (like for example `Campaign` field in the example data) application is loosing frames when the list of values is being displayed
- use events (by reusing EventTarget interface) instead of callbacks in `readFileByChunk`
- introduce data validation layer