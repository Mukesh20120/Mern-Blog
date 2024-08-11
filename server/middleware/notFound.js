const notFound = (req,res)=>{
  return  res.json({message: "Invalid url address"});
}

module.exports = notFound;