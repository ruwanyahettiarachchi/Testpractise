const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||8040

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

app.post("/create",async(req,res)=>{
    const data=new salarymodel(req.body);
    await data.save();
    res.send({success:true,message:"record added"})
})

app.get("/",async(req,res)=>{
    const data=await salarymodel.find({})
    res.json({success:true,message:"",data:data})
})

app.put("/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await salarymodel.updateOne({_id:id},rest)
    res.json({success:true,message:"updated successfully",data:data})


})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const data=await salarymodel.deleteOne({_id:id})
    res.json({success:true,messsage:"record deleted"})
})

app.get("/salary/:id", async (req, res) => {
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



mongoose.connect("mongodb+srv://admin:admin1234@cluster0.tayveae.mongodb.net/salary_db?retryWrites=true&w=majority").then(()=>{
    console.log(`server connection ${PORT} !`);
    app.listen(PORT,()=>console.log("server connection successful "))
}).catch((err)=>{
    console.log(err)
})