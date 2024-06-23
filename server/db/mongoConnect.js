const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
 try {
   mongoose.set('strictQuery', false);
   await mongoose.connect(process.env.DB_URL);
   console.log("Atlas connected");
 } catch (error) {
  console.log(error);
 }
  
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');
}



