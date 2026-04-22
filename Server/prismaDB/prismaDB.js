const { PrismaClient } = require("@prisma/client");
const { where } = require("sequelize");
const { email } = require("zod");
const prisma = new PrismaClient();


async function CreateUser(data) {

    return await prisma.user.create({
        data:{
            email:data.email,
            password:data.pasword,
            role:data.role
        }
    })
    
}




async function createProfile(userId,data) {
    return await prisma.profile.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        companyName: data.companyName,
        licenseNumber: data.licenseNumber,
        adminLevel:false,
        userId:userId
      },
    });

    
}



async function findEmail(email) {
    return await prisma.user.findUnique({
      where: { email: email },
    });
}


module.exports={CreateUser,createProfile,findEmail}
