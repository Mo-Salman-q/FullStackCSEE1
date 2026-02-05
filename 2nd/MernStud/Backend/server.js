const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.error(err));

const studentSchema = new mongoose.Schema({
  name:String, regNo:String, mark1:Number, mark2:Number, mark3:Number, total:Number, average:Number
});
const Student = mongoose.model('Student', studentSchema);

app.post('/students', async(req,res)=>{
  try {
    let {name,regNo,mark1,mark2,mark3}=req.body;
    mark1=Number(mark1); mark2=Number(mark2); mark3=Number(mark3);
    if([mark1,mark2,mark3].some(m=>isNaN(m)||m<0||m>100))
      return res.status(400).json({msg:"Marks must be between 0 and 100"});
    const total=mark1+mark2+mark3;
    const average=total/3;
    const student=new Student({name,regNo,mark1,mark2,mark3,total,average});
    await student.save();
    res.json(student);
  } catch(err) {
    res.status(500).json({msg: err.message});
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error('Port 5000 is already in use. Please stop the other process or use a different port.');
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });