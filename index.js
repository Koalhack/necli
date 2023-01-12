import inquirer from "inquirer";
import { Command } from "commander";

//NOTE: Const

const program = new Command();
const command = "access";
const parameters = [
  {name: "security", pos: 1, index: 0},
  {name: "grid", pos: 2, index: 1},
  {name: "main", pos: 0, index: 2},
];

//NOTE: commandIndex

let commandIndex = 0;

//NOTE: Functions

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

function activeCommand(command, parameters, commandIndex) {
  let activeParameters = parameters.filter(parameter => parameter.index <= commandIndex).sort((a, b) => a.pos - b.pos);
  activeParameters = activeParameters.map(parameter => parameter.name).join(' ');
  return `${command} ${activeParameters}`;
}

async function askCommand() {
  const answer = await inquirer.prompt({
    name: 'command',
    type: 'input',
    message: '>'
  });

  return handleAnswer(answer.command)
}

async function fakeError(index) {
  const error = "access : PERMISSION DENIED.";
  const and = "...and...";
  const magicWord = "YOU DIDN'T SAY THE MAGIC WORD!"

  process.stdout.write(error);

  if (index === 3) {
    await sleep();
    process.stdout.write(and + '\n');
    while(true) {
      await sleep(200);
      process.stdout.write(magicWord + '\n');
    } 
  } else {
    process.stdout.write('\n');
  }
}

async function error(command) {
  process.stdout.write(`Command '${command}' not found \n`);
}

async function handleAnswer(inputCommand) {
  inputCommand = String(inputCommand).toLowerCase();
  console.log(activeCommand(command, parameters, commandIndex));
  const isCorrect = inputCommand === activeCommand(command, parameters, commandIndex);
  

  await sleep();

  if (isCorrect) {
    commandIndex++;
    fakeError(commandIndex);
  } else {
    error(inputCommand);
  }
}

async function init() {
  await sleep(200);
  process.stdout.write('Jurassic Park, System Security Interface \n');

  await sleep(200);
  process.stdout.write('Version 4.0.5, Alpha E \n');

  await sleep(200);
  process.stdout.write('Ready...\n');

  while(commandIndex !== 3) {
    await askCommand();
  }
}

//NOTE: main

init();
