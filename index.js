#!/bin/sh
":"; //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants to be a Computer Science Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}.
    So get all the questions right...
    
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answerReason = `
  A hash table allows you to look up data based on a key, much like you look up a definition in a dictionary based on the word it applies to.
  A tree lets you build a hierarchical structure, with parents and children.
  A hash is an array with a special interpretation, and a linked list is just a list.`;

  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "Which of the following data structures falls under the category of a 'dictionary'?\n",
    choices: ["Tree", "Hash Table", "Hash", "Linked List"],
  });

  return handleAnswer(answers.question_1 == "Hash Table", answerReason);
}

async function question2() {
  const answerReason = `
  A heap is an array that is being interpreted as a binary tree (every node in the tree has two children).
  The root of the tree is in index 1, and its two children have indices 2 and 3.
  From there, 2 will have children 4 and 5, and 3 will have children 6 and 7.
  Notice how the first child of a node has an index equal to 2 * its parent, and the second has an index of the first plus one?
  That makes traversal very easy. To find the parent, we need to do *integer* division because otherwise an odd child index will result in a fractional index, which is not what we want.`;

  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message:
      "When using a heap, which function will give you the parent of the entry with index i?\n",
    choices: [
      "Decimal division, i / 2",
      "Integer division, i / 2",
      "Multiplication, i * 2",
      "Multiplication, i * 2 + 1",
    ],
  });

  return handleAnswer(
    answers.question_2 == "Integer division, i / 2",
    answerReason
  );
}

async function question3() {
  const answerReason = `A common vector implementation uses a linked list of arrays, which gives reasonable lookup time, depending of course on the size of the arrays and the size of the vector itself.`;
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message:
      "A vector (an indexed, growable list) would most likely be implemented on top of which of these structures?\n",
    choices: ["Linked list", "Tree", "Hash Table", "Stack"],
  });

  return handleAnswer(answers.question_3 == "Linked list", answerReason);
}

async function question4() {
  const answerReason = `
  A stack is just what it sounds like. You put things on top of it (you 'push' them onto the stack), and you take things back off the top (you 'pop' them off the stack).
  So when you push 't' 'a' 'p' onto a stack in that order, the 't' is at the bottom and the 'p' is at the top.
  So when you pop them back off, you will first get the 'p', then the 'a', and finally the 't'.`;

  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message:
      "If you have an empty stack that can contain letters, and you push (in order) these letters onto it, what order will they be in when you pop them off? 't', 'a', 'p'\n",
    choices: [
      "There is no way to tell",
      "'t', 'a', 'p'",
      "'p', 'a', 't'",
      "'a', 'p', 't'",
    ],
  });

  return handleAnswer(answers.question_4 == "'p', 'a', 't'", answerReason);
}

async function question5() {
  const answerReason = `A queue is basically a line; the first thing into it is the first thing out. So everything stays in order.`;
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "If you have an empty queue that can contain letters, and you enqueue (in order) these letters into it, what order will they be in when you dequeue them? 'm', 'a', 'r'\n",
    choices: [
      "'r', 'a', 'm'",
      "'m', 'a', 'r'",
      "'a', 'r', 'm'",
      "There is no way to tell",
    ],
  });

  return handleAnswer(answers.question_5 == "'m', 'a', 'r'", answerReason);
}

async function question6() {
  const answerReason = `
  A graph is made up of a set of vertices (points) connected by edges (lines).
  The edges may have a direction associated with them (think of one-way streets), or a cost (think of toll roads).
  They are useful for trying to find the cheapest route between two points (a trucker trying to save money or time), or the shortest route that will allow you to visit every point (the Traveling Salesman Problem).
  `;

  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message:
      "Which of the following could best be described by the graph structure?\n",
    choices: [
      "Roads connecting cities",
      "A GUI (Graphical User Interface)",
      "Algebraic problems",
      "Given a word, finding its definition",
    ],
  });

  return handleAnswer(
    answers.question_6 == "Roads connecting cities",
    answerReason
  );
}

async function question7() {
  const answerReason = `
  A balanced binary tree with 15 elements in it will have four levels.
  Starting at the top, you can tell whether the element is searching for in equal to, less than, or greater than the root.
  Based on that, you will either be done (1 step), or you will have to visit the left or right child.
  If the element you are searching for is less than the root, you will travel left, and otherwise you will travel right. That was one step, and you just eliminated half of the tree (the other child and its descendants).
  So there are only seven nodes left.
  The second step will reduce the search to three nodes, the third down to one. Checking that last node makes four steps.
  This type of problem is used to determine how long it will take to execute a sequence of instructions.
  In this case, since the number of steps taken is approximately the logarithm (base 2) of the size of the tree, it would be called a O(log n) problem.
  That means no matter how large the tree is, the upper-bound on the amount of time it will take to search it is proportional to the log of the tree size.`;

  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message:
      "If you have a sorted, balanced binary tree with 15 elements in it, how many steps, maximum, will it take you to decide whether an element is present in the tree?\n",
    choices: ["Four", "Fifteen", "Three", "Depends on the computer"],
  });

  return handleAnswer(answers.question_7 == "Four", answerReason);
}

async function question8() {
  const answerReason = `
  The stack would help if you push each '(' onto it as you see it, and you pop one off each time you see a ')'.
  If you never try to pop an empty stack, and the stack is empty when you're done, then the expression has balanced parenthesis.`;
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message:
      "If you wanted to make sure that the close-parenthesis (the ')' character) matches the open-parenthesis (the '(' character) in a mathematical expression, which data structure could help you?\n",
    choices: ["Stack", "Tree", "Queue", "Hash Table"],
  });

  return handleAnswer(answers.question_8 == "Stack", answerReason);
}

async function question9() {
  const answerReason = `
  A set enforces uniqueness, since if an item is in a set, there is no sense in it being in the set a second time.
  Imagine if someone asked you to tell him what kinds of cereal you have. You are going to give him a set of names, since even if you have two boxes of something, you probably won't read it off more than once.
  The elements of a set have no order guarantees, and as you just saw, a set can have anything in it, even other sets!`;

  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message: "Which of these is true about a set?\n",
    choices: [
      "All of these",
      "The elements are kept in order",
      "There are no duplicates",
      "They can only hold numbers",
    ],
  });

  return handleAnswer(
    answers.question_9 == "There are no duplicates",
    answerReason
  );
}

async function question10() {
  const answerReason = `The B+Tree is similar to the B-Tree in that they are both balanced trees, but it has some significant differences that make it ideal for filesystems.
    Most importantly, data is only stored at the leaves of a B+Tree.
    For more information, explore Wikipedia or simply search the web.
  `;

  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message:
      "Modern filesystems, like ReiserFS and XFS, use which structure to organize their data for efficient access?\n",
    choices: ["B- Trees", "B+ Trees", "Tables", "Lists"],
  });

  return handleAnswer(answers.question_10 == "B+ Trees", answerReason);
}

async function handleAnswer(isCorrect, answerReason) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `
    Nice work ${playerName}!
    Here is an explanation: 
      ${answerReason}
    `,
    });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congratulations ${playerName}!\n $ 1,000,000`;

  figlet(msg, (_err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await winner();
