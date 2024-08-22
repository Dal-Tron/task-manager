import { exec } from 'child_process';

import inquirer from 'inquirer';

const commitTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

inquirer
  .prompt([
    {
      type: 'list',
      name: 'commitAction',
      message: 'Choose the commit action:',
      choices: ['Standard Commit', 'Amend Last Commit'],
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of git commit is this?',
      choices: commitTypes,
      when: (answers) => answers.commitAction === 'Standard Commit',
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter the commit message:',
      validate: function (input) {
        if (input.length < 3) {
          return 'Commit message must be longer than 3 characters.';
        }
        return true;
      },
      when: (answers) => answers.commitAction === 'Standard Commit',
    },
  ])
  .then((answers) => {
    let commitCommand;

    if (answers.commitAction === 'Amend Last Commit') {
      commitCommand = 'git commit --amend --no-edit';
    } else {
      commitCommand = `git commit -m "${answers.type}: ${answers.message}"`;
    }

    exec(commitCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  });
