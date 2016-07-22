Feature: cucumber-json to teamcity cli
	As a developer
	I want to pipe output in json format from Cucumber.js to TeamCity service messages
	In order to see which tests passed or failed in TeamCity

Scenario: Piping cucumber json
	Given a json output from cucumber
	When I pipe it through the cli
	Then the output should be TeamCity service messages
