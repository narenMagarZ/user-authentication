import bcyrpt from 'bcryptjs';
async function hash(s:string){
     const salt = await bcyrpt.genSalt(12)
     const hashedString = await bcyrpt.hash(s,salt)
     return hashedString
}

export default hash