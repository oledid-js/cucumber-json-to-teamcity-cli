npm install

# change build number
.\node_modules\.bin\teamcity-build-number

# run xo
write-host "##teamcity[testSuiteStarted name='xo']"
.\node_modules\.bin\xo --reporter tap | .\node_modules\.bin\tap-teamcity.cmd
write-host "##teamcity[testSuiteFinished name='xo']"

# run tests
.\node_modules\.bin\cucumber-js.cmd --format json | node .\cli.js