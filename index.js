const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const app=express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||8030

const roomsschema=mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    date:String,
    quentity_rooms:String,
    quentity_people:String,

   
    
 
 },{
     timestamps:true
 
 })
 
 const roomsmodel=mongoose.model("rooms",roomsschema)
 // read
 app.get("/",async(req,res)=>{
     const data= await roomsmodel.find({})
   
     res.json({success:true,data:data})
 })
 
 // create
 app.post("/create",async(req,res)=>{
     const data=new roomsmodel(req.body)
     await data.save()
     res.send({success:true,message:"rooms added successfuly"})
 })
 
 // update
 app.put("/update",async(req,res)=>{
     const {id,...rest}=req.body
     const data=await roomsmodel.updateOne({_id:id},rest)
     res.send({success:true,message:"updated successfuly",data:data})
 })
 
 
 // delete
 app.delete("/delete/:id",async(req,res)=>{
 const id=req.params.id
 const data=await roomsmodel.deleteOne({_id:id})
 res.send({success:true,message:"deleted successfully",data:data})
 })
 
 
 // fetch updated
 app.get("/rooms/:id", async (req, res) => {
     const id = req.params.id;
 
     try {
         const discount = await roomsmodel.findById(id);
 
         if (!discount) {
             return res.status(404).send({ success: false, message: "User not found" });
         }
 
         res.send({ success: true, message: "User fetched successfully", data: discount });
     } catch (error) {
         console.error(error);
         res.status(500).send({ success: false, message: "Internal Server Error" });
     }
 });
 
 //get count in rooms table
 app.get("/count_rooms",async(req,res)=>{
     try{
         const users=await roomsmodel.find({});
 
         return res.status(200).json({
             count:users.length,
             data:users
         })
 
     }catch(err){
             console.log(err.message);
             res.json({success:true,message:"discount count successfully",data:data})
     }
 
 })
 





//////////////////////////////////////////////////////////////////////////////////////////////////////



const dataschema=mongoose.Schema({
    basicSalary:Number,
    allowance:Number,
    ot:Number,
    bonus:Number,
    deductionTax:Number,
    deductionOther:Number,
    other:Number,
})

const salarymodel=mongoose.model("salary",dataschema)

app.post("/create_data",async(req,res)=>{
    const data=new salarymodel(req.body);
    await data.save();
    res.send({success:true,message:"record added"})
})

app.get("//",async(req,res)=>{
    const data=await salarymodel.find({})
    res.json({success:true,message:"",data:data})
})

app.put("/update_date",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await salarymodel.updateOne({_id:id},rest)
    res.json({success:true,message:"updated successfully",data:data})


})

app.delete("/delete_data/:id",async(req,res)=>{
    const id=req.params.id
    const data=await salarymodel.deleteOne({_id:id})
    res.json({success:true,messsage:"record deleted"})
})

app.get("/salary_data/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await salarymodel.findById(id);

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "record fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


app.get("/count_pay",async(req,res)=>{
    try{
        const users=await salarymodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"salary count successfully",data:data})
    }

})

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.tayveae.mongodb.net/salary_db?retryWrites=true&w=majority").then(()=>{
    console.log(`server connection ${PORT} !`);
    app.listen(PORT,()=>console.log("server connection successful "))
}).catch((err)=>{
    console.log(err)
})
