const fs = require('fs');
const path = require('path');
const fileName =  path.join(__dirname, './todos.json');


const addTask = (data)=> {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const existingData = JSON.parse(fileContent);
    let id = Math.floor(Math.random() * 100000).toString().substring(0,5);
    
    existingData.push({
        "id":id,
        "task":data
    })

    fs.writeFile(fileName, JSON.stringify(existingData, null, 2), (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("new task added successfully...");
            process.exit(1);
        }
    })

}


const deleteTask = (id)=> {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const existingData = JSON.parse(fileContent);
    const idToDelete = existingData.find((item)=> item.id === id);
    if(!idToDelete){
        console.log("No such data found (:-");
        process.exit(1);
    }
    const removedData = existingData.filter((item) => item.id !== id);
    fs.writeFile(fileName, JSON.stringify(removedData, null, 2), (err)=> {
        if(err){
            console.error(err)
        }else{
            console.log(`Task with this id ${id} is removed`);
            process.exit(1);
        }
    })
}

const updateTask = (id, taskDesc) => {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const parsedData = JSON.parse(data);
        const findItem = parsedData.find((item) => item.id === id);
        if (findItem) {
          findItem.task = taskDesc;
          fs.writeFileSync(fileName, JSON.stringify(parsedData, null, 2));
          console.log(`Updated Item with id: ${id}`);
          process.exit(1);
        }
        console.log('No item found');
        process.exit(1);
      } catch (error) {
        console.log('No item found');
        process.exit(1);
      }
}

const listTask = ()=> {
    const listAllData = fs.readFileSync(fileName, 'utf-8' );
    console.log(JSON.parse(listAllData));
    process.exit(1);

}
const allData = ()=> {
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    // console.log(data);
    return data;

}
const exit = ()=> {
  
    process.exit(1);

}


module.exports = {
    addTask,
    deleteTask,
    listTask,
    updateTask,
    allData,
    exit
}