import bcrypt from 'bcryptjs'

const compare = async (s:string,hash:string)=>await bcrypt
.compare(s,hash)

export default compare