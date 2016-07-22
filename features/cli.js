"use strict";

const path = require("path");
const childProcess = require("child_process");
const expect = require("chai").expect;

const spawn = childProcess.spawn;

module.exports = function () {
	this.World = function () {
		this.output = "";
	};

	this.setDefaultTimeout(1000 * 10);

	this.Given(/^a json output from cucumber$/, callback => {
		callback();
	});

	this.When(/^I pipe it through the cli$/, function (callback) {
		const cucumberProcess = spawn(path.join(__dirname, "../node_modules/.bin/cucumber-js.cmd"), [
			"features/mock.feature",
			"--format",
			"json"
		], {
			cwd: path.join(__dirname, "../")
		});

		const cliProcess = spawn("node", [
			path.join(__dirname, "../cli.js")
		], {
			cwd: path.join(__dirname, "../")
		});

		cucumberProcess.stdout.on("data", data => {
			cliProcess.stdin.write(data);
		});

		cucumberProcess.on("close", code => {
			if (code !== 0) {
				throw new Error(`cucumber process exited with code ${code}`);
			}
			cliProcess.stdin.end();
		});

		cliProcess.stdout.on("data", data => {
			this.output += data.toString();
		});

		cliProcess.on("close", code => {
			if (code !== 0) {
				throw new Error(`cli process exited with code ${code}`);
			}
			callback();
		});
	});

	this.Then(/^the output should be TeamCity service messages$/, function (callback) {
		expect(this.output.indexOf("##teamcity[testSuiteStarted")).to.not.equal(-1);
		callback();
	});
};
