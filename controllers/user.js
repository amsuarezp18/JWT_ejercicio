const { mongoUtils, dataBase } = require('../lib/utils/mongo');
const COLLECTION_NAME = 'users';
const bycrypt = require('bcrypt');
const auth = require('../lib/utils/auth');
const saltRounds = 10;

async function login(user) {
    return mongoUtils.conn().then(async (client) => {
        const requestedUser = await client
            .db(dataBase)
            .collection(COLLECTION_NAME)
            .findOne({username: user.username})
            .finally(() => client.close());

        const isValid = await bycrypt.compare(user.password, requestedUser.password);
        let currentUser = {...requestedUser};
        if(isValid){
            delete currentUser.password;
            let token = auth.createToken(currentUser);
            currentUser.token = token;
            return currentUser;
        } else {
            throw new Error('Authetication failed');
        }
    });
}

async function createUser(user) {
    if(user.password){
        user.password = await bycrypt.hash(user.password, saltRounds);
    }
    console.log(user);
    return mongoUtils.conn().then( async (client) => {
        const newUser = await client
            .db(dataBase)
            .collection(COLLECTION_NAME)
            .insertOne(user)
            .finally(() => client.close());

        newUser && newUser.ops ? delete newUser.ops[0].password: newUser;
        return newUser.ops[0];
    });
}

module.exports = [createUser, login];

