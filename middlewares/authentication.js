const AdminAuth = (request,respond,next)=>{
   const  token="xwyz";
    const AuthenticationValue = token ==="xyz";
    if(!AuthenticationValue){
        respond.status(401).send("Not Authorised ");
    }
    else{
        next()
    }
}
;
const UserAuth = (request,respond,next)=>{
   const  token="xyz";
    const AuthenticationValue = token ==="xyz";
    if(!AuthenticationValue){
        respond.status(401).send("Not Authorised ");
    }
    else{
        next()
    }
}

module.exports={AdminAuth,UserAuth};