module.exports = {
    moungoUri: 'mongodb+srv://MishaSokil:Warmisha_333444@todos.fhsuf.mongodb.net/todos',
    jwt: {
        secret: 'Syper_DyPer_SecreT_KeY',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '30m',
                cookieOptns: {
                    path: '/api',
                    httpOnly: true,
                    secure: true,
                }
            },
            refresh: {
                type: 'refresh',
                expiresIn: '7d',
                cookieOptns: {
                    path: '/api/auth',
                    httpOnly: true,
                    secure: true, 
                    maxAge: 7*24*60*60*1000
                }
            }
        }
    }
};