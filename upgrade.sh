if [ "$TRAVIS_BRANCH" = "master" ]
then
    {
    echo "call $TRAVIS_BRANCH branch"
    ENV_ID=`curl -u ""$RANCHER_ACCESSKEY_MASTER":"$RANCHER_SECRETKEY_MASTER"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "$RANCHER_URL_MASTER/v2-beta/projects?name=Production" | jq '.data[].id' | tr -d '"'`
    echo $ENV_ID
    USERNAME="$DOCKER_USERNAME_FLOWZ";
    TAG="latest";
    MONGODB="$MONGODB_MASTER";
    SECRET="$SECRET_MASTER";
    DOMAINKEY="$DOMAINKEY_MASTER";
    FBCLIENTID="$FBCLIENTID_MASTER";
    FBCLIENTSECRET="$FBCLIENTSECRET_MASTER";
    GOOGLECLIENTID="$GOOGLECLIENTID_MASTER";
    GOOGLECLIENTSECRET="$GOOGLECLIENTSECRET_MASTER";
    GITHUBCLIENTID="$GITHUBCLIENTID_MASTER";
    GITHUBCLIENTSECRET="$GITHUBCLIENTSECRET_MASTER";
    TWITTERCLIENTID="$TWITTERCLIENTID_MASTER";
    TWITTERCLIENTSECRET="$TWITTERCLIENTSECRET_MASTER";
    LINKEDINCLIENTID="$LINKEDINCLIENTID_MASTER";
    LINKEDINCLIENTSECRET="$LINKEDINCLIENTSECRET_MASTER";
    RANCHER_ACCESSKEY="$RANCHER_ACCESSKEY_MASTER";
    RANCHER_SECRETKEY="$RANCHER_SECRETKEY_MASTER";
    RANCHER_URL="$RANCHER_URL_MASTER";
  }
elif [ "$TRAVIS_BRANCH" = "develop" ]
then
    {
      echo "call $TRAVIS_BRANCH branch"
      ENV_ID=`curl -u ""$RANCHER_ACCESSKEY_DEVELOP":"$RANCHER_SECRETKEY_DEVELOP"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "$RANCHER_URL_DEVELOP/v2-beta/projects?name=Develop" | jq '.data[].id' | tr -d '"'`
      echo $ENV_ID
      USERNAME="$DOCKER_USERNAME";
      TAG="dev";
      MONGODB="$MONGODB_DEVELOP";
      SECRET="$SECRET_DEVELOP";
      DOMAINKEY="$DOMAINKEY_DEVELOP";
      FBCLIENTID="$FBCLIENTID_DEVELOP";
      FBCLIENTSECRET="$FBCLIENTSECRET_DEVELOP";
      GOOGLECLIENTID="$GOOGLECLIENTID_DEVELOP";
      GOOGLECLIENTSECRET="$GOOGLECLIENTSECRET_DEVELOP";
      GITHUBCLIENTID="$GITHUBCLIENTID_DEVELOP";
      GITHUBCLIENTSECRET="$GITHUBCLIENTSECRET_DEVELOP";
      TWITTERCLIENTID="$TWITTERCLIENTID_DEVELOP";
      TWITTERCLIENTSECRET="$TWITTERCLIENTSECRET_DEVELOP";
      LINKEDINCLIENTID="$LINKEDINCLIENTID_DEVELOP";
      LINKEDINCLIENTSECRET="$LINKEDINCLIENTSECRET_DEVELOP";
      RANCHER_ACCESSKEY="$RANCHER_ACCESSKEY_DEVELOP";
      RANCHER_SECRETKEY="$RANCHER_SECRETKEY_DEVELOP";
      RANCHER_URL="$RANCHER_URL_DEVELOP";
    }
elif [ "$TRAVIS_BRANCH" = "staging" ]
then
    {
      echo "call $TRAVIS_BRANCH branch"
      ENV_ID=`curl -u ""$RANCHER_ACCESSKEY_STAGING":"$RANCHER_SECRETKEY_STAGING"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "$RANCHER_URL_STAGING/v2-beta/projects?name=Staging" | jq '.data[].id' | tr -d '"'`
      echo $ENV_ID
      USERNAME="$DOCKER_USERNAME";
      TAG="staging";
      MONGODB="$MONGODB_STAGING";
      SECRET="$SECRET_STAGING";
      DOMAINKEY="$DOMAINKEY_STAGING";
      FBCLIENTID="$FBCLIENTID_STAGING";
      FBCLIENTSECRET="$FBCLIENTSECRET_STAGING";
      GOOGLECLIENTID="$GOOGLECLIENTID_STAGING";
      GOOGLECLIENTSECRET="$GOOGLECLIENTSECRET_STAGING";
      GITHUBCLIENTID="$GITHUBCLIENTID_STAGING";
      GITHUBCLIENTSECRET="$GITHUBCLIENTSECRET_STAGING";
      TWITTERCLIENTID="$TWITTERCLIENTID_STAGING";
      TWITTERCLIENTSECRET="$TWITTERCLIENTSECRET_STAGING";
      LINKEDINCLIENTID="$LINKEDINCLIENTID_STAGING";
      LINKEDINCLIENTSECRET="$LINKEDINCLIENTSECRET_STAGING";
      RANCHER_ACCESSKEY="$RANCHER_ACCESSKEY_STAGING";
      RANCHER_SECRETKEY="$RANCHER_SECRETKEY_STAGING";
      RANCHER_URL="$RANCHER_URL_STAGING";
    }    
else
  {
      echo "call $TRAVIS_BRANCH branch"
      ENV_ID=`curl -u ""$RANCHER_ACCESSKEY_QA":"$RANCHER_SECRETKEY_QA"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "$RANCHER_URL_QA/v2-beta/projects?name=QA" | jq '.data[].id' | tr -d '"'`
      echo $ENV_ID
      USERNAME="$DOCKER_USERNAME";
      TAG="qa";
      MONGODB="$MONGODB_QA";
      SECRET="$SECRET_QA";
      DOMAINKEY="$DOMAINKEY_QA";
      FBCLIENTID="$FBCLIENTID_QA";
      FBCLIENTSECRET="$FBCLIENTSECRET_QA";
      GOOGLECLIENTID="$GOOGLECLIENTID_QA";
      GOOGLECLIENTSECRET="$GOOGLECLIENTSECRET_QA";
      GITHUBCLIENTID="$GITHUBCLIENTID_QA";
      GITHUBCLIENTSECRET="$GITHUBCLIENTSECRET_QA";
      TWITTERCLIENTID="$TWITTERCLIENTID_QA";
      TWITTERCLIENTSECRET="$TWITTERCLIENTSECRET_QA";
      LINKEDINCLIENTID="$LINKEDINCLIENTID_QA";
      LINKEDINCLIENTSECRET="$LINKEDINCLIENTSECRET_QA";
      RANCHER_ACCESSKEY="$RANCHER_ACCESSKEY_QA";
      RANCHER_SECRETKEY="$RANCHER_SECRETKEY_QA";
      RANCHER_URL="$RANCHER_URL_QA";
  }
fi

SERVICE_ID_SOCIAL_AUTH=`curl -u ""$RANCHER_ACCESSKEY":"$RANCHER_SECRETKEY"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "$RANCHER_URL/v2-beta/projects/$ENV_ID/services?name=auth-social-login" | jq '.data[].id' | tr -d '"'`
echo $SERVICE_ID_SOCIAL_AUTH

curl -u ""$RANCHER_ACCESSKEY":"$RANCHER_SECRETKEY"" \
-X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:'$USERNAME'/social_auth_flowz:'$TAG'","kind": "container","labels":{"io.rancher.container.pull_image": "always","io.rancher.scheduler.affinity:host_label": "machine=cluster-flowz"},"ports": ["3004:3004/tcp"],"environment": {"MONGODB": "'"$MONGODB"'","SECRET": "'"$SECRET"'","DOMAINKEY":"'"$DOMAINKEY"'","fbclientid":"'"$FBCLIENTID"'", "fbclientsecret":"'"$FBCLIENTSECRET"'","googleclientid":"'"$GOOGLECLIENTID"'","googleclientsecret":"'"$GOOGLECLIENTSECRET"'","githubclientid":"'"$GITHUBCLIENTID"'","githubclientsecret":"'"$GITHUBCLIENTSECRET"'","twitterclientid":"'"$TWITTERCLIENTID"'","twitterclientsecret":"'"$TWITTERCLIENTSECRET"'","linkedinclientid":"'"$LINKEDINCLIENTID"'",
      "linkedinclientsecret":"'"$LINKEDINCLIENTSECRET"'"},"healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 3004,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
$RANCHER_URL/v2-beta/projects/$ENV_ID/services/$SERVICE_ID_SOCIAL_AUTH?action=upgrade