#!/bin/bash
result=0

eslint *.js || result=1
istanbul cover test.js || result=1

if [ "$TRAVIS" == "true" ] && [ "$result" == "0" ]; then
  echo "Sending coverage report to Coveralls.io"
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js -v || result=1
fi

exit $result
