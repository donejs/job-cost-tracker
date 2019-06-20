# job-cost-tracker
[![Build Status](https://travis-ci.com/bitovi/jobcosttracker.svg?token=dyyk9qzTjNBWR2Yq1HxW&branch=master)](https://travis-ci.com/bitovi/jobcosttracker) [![Greenkeeper badge](https://badges.greenkeeper.io/donejs/job-cost-tracker.svg)](https://greenkeeper.io/)

Prototype: http://share.bitovi.com/6RHKOA/#p=new_custom_work_order

## Setup
This setup expects node version `4.2.*` and npm `2.14.*` to be installed.

1. Install MongoDB (https://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/)
  * `brew update`
  * `brew install mongodb`
  * Create the data directory with `mkdir -p /data/db` (might need sudo)
  * Run `mongod`
  * If you get an "Unable to create/open lock file" error, try `sudo chown -R ``id -u`` /data/db`
1. Install MongoDB manager
  * https://github.com/jeromelebel/MongoHub-Mac
1. `git clone https://github.com/bitovi/jobcosttracker.git`
1. `cd jobcosttracker`
1. `npm install`
1. `donejs develop`

## Run
Run the app with `donejs develop`





## Model definitions and API specification

All models are described according to the standards defined by the [Open API Initiative](https://openapis.org/). To view the Job Cost Tracker models and API specification, copy and paste the [api-spec.json](api-spec.json) file into the online [Swagger Editor](http://editor.swagger.io/).
