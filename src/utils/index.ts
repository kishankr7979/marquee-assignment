import * as jose from 'jose'

const JWT_KEY = process.env.REACT_APP_JWT_KEY;
export const eligibleUsersToSignIn = [
    {
        userId: 'MQ-01',
        password: 'Marquee@123'
    },
    {
        userId: 'MQ-02',
        password: 'Marquee@321'
    }
]

export const signJWTToken = async (id: string) => {
    const secret = new TextEncoder().encode(
        JWT_KEY,
      )
      const alg = 'HS256'
      
      const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('todo-dashboard-admin')
        .setAudience('todo-dashboard-user')
        .setExpirationTime('2h')
        .setJti(id)
        .sign(secret)
      
        return jwt
}

export const protectedRoutes = ['/dashboard'];
