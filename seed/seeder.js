
const categories = require("./categories.js");
const db = require("../config/db.js");

const Categories = require('../models/Categories.js');

const importData = async () => {
    try {
        //Authenticate
        await db.authenticate();
        
        //Generate the columns
        await db.sync();
        
        //Insert data
        await Categories.bulkCreate(categories),

        console.log('Data imported successfully');
        process.exit();

    } catch (err){
        console.error(err);
        process.exit(1);
    }
}

const deleteData = async () => {
    try{
        await Promise.all([
            Categories.destroy({where: {}, truncate: {cascade: true} }),
        ]);
        console.log('Data deleted successfully');
        process.exit();
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

if(process.argv[2] === "-import"){
    importData();
}

if(process.argv[2] === "-delete"){
    deleteData();
}