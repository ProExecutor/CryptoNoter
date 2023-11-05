const readline = require('readline');
const exec = require('child_process').exec;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let questions = [
  "[1] Listen Port (7777) > ",
  "[2] Your Domain (localhost) > ",
  "[3] Pool Host&Port (monero.us.to:1111) > ",
  "[4] Your XMR wallet (important!!!) > ",
  "[5] The Pool passwd (null) > "
];

let answers = [];

function ask(i) {
  rl.question(questions[i], function(answer) {
    answers[i] = answer || questions[i].split(' ')[1].replace('(','').replace(')','');
    if (i === questions.length - 1) {
      rl.close();
      // Here you can use the answers to run your commands, for example:
      exec(`echo ${answers[0]}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    } else {
      ask(i + 1);
    }
  });
}

ask(0);
