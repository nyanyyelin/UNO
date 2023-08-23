const db = require("./index");
// const bcrypt =require("bcrypt");
const bcrypt =require("bcrypt");

const LOOKUP_USER_BY_USERNAME = "SELECT id FROM users WHERE username=${username}";

const REGISTER_USER ="INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password}) RETURNING id, username";

const LOGIN_USER ="SELECT id, username, password FROM users WHERE username=$1";
// const LOGIN_USER =
//   "SELECT id, username, password FROM users WHERE username=$1 AND password=$2";

const signUp =({username, email, password}) =>{
    return db
        .none(LOOKUP_USER_BY_USERNAME, {username})
        .then(()=> bcrypt.hash(password,10))
        .then((hash)=> db.one(REGISTER_USER, {username, email, password:hash}));
};
/* const login =({username, password}) =>{
    return db.one(LOGIN_USER, {username, password});
} */

const login = ({ username, password }) => {
    return db
        .one(LOGIN_USER, [username])
        .then(({id, username, password: encryptedPassword})=>
            Promise.all([
                bcrypt.compare(password, encryptedPassword),
                {id, username},
            ])
        )
        .then(([result, {id, username}])=>{
            if(result){
                return { id, username};
            }else{
                return Promise.reject("Please enter a valid username and password")
            }
        })
        .catch(error => {
            // Handle error thrown by db.one()
            return Promise.reject(`Unable to log in: ${error.message}`);
        })
        .catch(error => {
            // Handle error thrown by bcrypt.compare()
            return Promise.reject(`Unable to log in: ${error.message}`);
        });
};

module.exports ={signUp, login};