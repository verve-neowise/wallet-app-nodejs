import { Role } from "@prisma/client"

type Payload = {
    userId: number,
    username: string,
    role: Role
}

export default Payload