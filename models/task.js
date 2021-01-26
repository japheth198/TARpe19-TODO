const { error } = require('console');
const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(require.main.filename), 'data', 'tasks.json');

module.exports = class Task{
    constructor(task){
        this.description = task;
    }

    saveTask(){
        fs.readFile(filePath, (error, fileConent)=>{
            let tasks = [];

            if(!error){
                tasks = JSON.parse(fileConent);
            } else {
                console.log(error);
            }

            tasks.push(this);
            fs.writeFile(filePath, JSON.stringify(tasks), (error) => {

            });
        });
    }

    static fetchTasks(callBack){
        fs.readFile(filePath, (error, fileConent) => {
            if(error){
                callBack([]);
            }
            
            callBack(JSON.parse(fileConent));
        });
    }
    static deleteTask(taskDescription){
        fs.readFile(filePath, (error, fileConent) =>{
            let tasks = [];
            if(!error){
                tasks = JSON.parse(fileConent);
            }

            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].description === taskDescription){
                    tasks.splice(i,1);
                    break;
                }
            }

            fs.writeFile(filePath, JSON.stringify(tasks), (error) => {
                console.log(error);
            });
        });
    }

}

