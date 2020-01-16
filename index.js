#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./resume.json");

// add response color
const response = chalk.cyan;

const resumeOptions = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know",
  choices: [...Object.keys(data), "Exit"]
};

function showResume() {
  console.log("Hello, this is my resume");
  handleResume();
}

function handleResume() {
  inquirer.prompt(resumeOptions).then(answer => {
    if (answer.resumeOptions == "Exit") return;

    const options = data[`${answer.resumeOptions}`]
    if (options) {
      console.log(response(new inquirer.Separator()));
      options.forEach(info => {
        console.log(response(info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go Back or Exit?",
        choices: ["Back", "Exit"]
      }).then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

showResume();