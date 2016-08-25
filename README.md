# job-cost-tracker
[![Build Status](https://travis-ci.com/bitovi/jobcosttracker.svg?token=dyyk9qzTjNBWR2Yq1HxW&branch=master)](https://travis-ci.com/bitovi/jobcosttracker)

Job Cost Tracker is an example [DoneJS](https://donejs.com/) implementation based on a real-world application. The app allows a Concrete Contracting Company to analyze their estimated (allocated) resources against their actual usage. Administrators can create Jobs, Lots, and Tasks and allows Foremen to log usage data for any particular day (TaskDay) of work. Adminstrators can then generate reports from this data and deterine the accuracy of their estimation process.

##Requirements

Requires NodeJS `v6.x` and NPM `v3.x`

## Setup

1. `git clone https://github.com/bitovi/jobcosttracker.git`
1. `cd jobcosttracker`
1. `npm install`

## Run
Run the app with `npm start`

## Documentation

View the Job Cost Tracker documentation website [here](http://donejs.github.io/job-cost-tracker).

### Build the docs

```
npm run document
```

### Deploy the docs
**Note:** this command will build the docs for you.

```
npm run deploy:docs
```

