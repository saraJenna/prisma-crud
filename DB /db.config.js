import {PrismaClient} from "@prisma/client"
//prisma client instance 
const prisma =new PrismaClient({
log:["query"],
})
export default prisma