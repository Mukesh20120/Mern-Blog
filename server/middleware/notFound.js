const notFound = (req,res)=>{
    res.json({message: "Invalid url address"});
}

module.exports = notFound;