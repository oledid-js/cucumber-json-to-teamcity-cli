#!/usr/bin/env node
"use strict";

const api = require("cucumber-json-to-teamcity");

let content = "";

process.stdin.resume();

process.stdin.setEncoding("utf-8");

process.stdin.on("data", buffer => {
	content += buffer.toString();
});

process.stdin.on("end", () => {
	console.log(api(content).join("\n").trim());
});
