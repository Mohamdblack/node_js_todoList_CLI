const fs = require('fs');
const path = require('path');
const readline = require('readline');
const todo = require('./src/todo');
const chalk = require('chalk');


console.log()
console.log(chalk.bgRed("---------------- Welcome Our Nodejs CLI----------------"))

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.question('Choose one of these commands (add/delete,update,list,exit) :- ',(data)=>{
    chooseCommand(data);
});

const chooseCommand = (data) =>{
    switch (data){
        case 'add':
            rl.question('Enter task name :- ', (taskName) => {
                todo.addTask(taskName);
              });
            break;
        case 'delete':
            rl.question('Enter the task id u want to delete :- ', (idTodelete)=>{
                todo.deleteTask(idTodelete);
            })
            break;
        case 'update':
            const tasks = todo.allData();
            rl.question('Enter the task id you want to update :- ', (taskId) => {
              const task = tasks.find((item) => item.id === taskId);
              if (task) {
                rl.question('Enter the new task name :- ', (newTaskName) => {
                  todo.updateTask(taskId, newTaskName);
                });
              } else {
                console.log(chalk.bgMagenta('Task not found'));
                // eventEmitter.emit('exit');
              }
            });
            break;
        case 'list':
             todo.listTask();
           
            break;
        case 'exit':
            todo.exit()
            break;
        default:
            console.error(chalk.bgRed('invalid command'));
            break;
        
    }
}