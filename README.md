[![CircleCI](https://circleci.com/gh/skillbotio/default-skill.svg?style=svg&circle-token=efa423477cdf3ac7c0e7850fbebb5576e3c8dea3)](https://circleci.com/gh/skillbotio/default-skill)
[![codecov](https://codecov.io/gh/skillbotio/default-skill/branch/master/graph/badge.svg?token=JlrI312rZ6)](https://codecov.io/gh/skillbotio/default-skill)

# Setting Up
## Properties
Create a .env file with the following properties:

* AWS_ACCESS_KEY_ID - needs full admin privileges, for use with the serverless framework
* AWS_SECRET_ACCESS_KEY - see above
* SKILLBOT_API_KEY - the API key for interacting with skillbot programmatically

## Serverless
Install serverless via these instructions:
https://serverless.com/framework/docs/getting-started/

# Deployment
We use serverless for deployment.

Run:  
* `set -a` // causes environment variables loaded via source to be handed to other processes
* `source .env` // to load environment variables for serverless)  
* `sls deploy` // deploy!  

