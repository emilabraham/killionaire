# Pentascore
A node.js application that displays stats on multikills per champion per
summoner.

## Features
* Uses asynchronous calls to Riot's API and deals with them using the [bluebird](https://github.com/petkaantonov/bluebird)
Promise library.

## Install
Clone this repository and run:
`npm install`

## Run
In order to start the server, run:
`node app.js`

## Live
~~pentascore.com~~ I have decided to stop hosting this for a few reasons.
Riot made breaking changes to their API. In order to provide this same functionality, I would need to start aggregating data. Which I am too lazy to do. Also,
I had planned to add the feature of seeing which champions you had chests with. Riot added that feature to their client. So I don't need
to do that anymore. Plus, I stopped playing the game so I lost interest. But I'm keeping this repository up for record keeping.
