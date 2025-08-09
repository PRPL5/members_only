const pool = require("./pool");
const bcrypt = require("bcryptjs");
async function getAllUsers() {
  const rows = await pool.query("SELECT * FROM users");
  return rows;
}

const insertUser = async (firstname, lastname, email, password) => {
  try {
    const hashedPsw = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (firstname , lastname , email ,password , is_member , is_admin) VALUES ($1,$2,$3,$4,$5,$6)",
      [firstname, lastname, email, hashedPsw, false, false]);
  } catch (err) {
    return(err);
  }
};

const getAllMessages = async () => {
    const { rows } = await pool.query(`
        SELECT messages.*, users.firstname, users.lastname
        FROM messages
        JOIN users ON messages.user_id = users.id
        ORDER BY messages.id DESC
    `);
    return rows;
};

const insertMessage = async(user_id , content)=>{
    await pool.query("INSERT INTO messages (user_id , content) VALUES ($1,$2)" , [user_id , content])

}


const makeMember = async(id)=>{
    await pool.query('UPDATE users SET is_member = true WHERE id = $1 RETURNING *',[id]);

}

const getUser = async(email)=>{
const {rows} = await pool.query("SELECT * FROM users WHERE email = $1" ,[email]);
return rows;
}

const deleteMessage = async(id)=>{
    await pool.query("DELETE FROM messages WHERE id = $1" ,[id]);
}

const getUserById = async(id)=>{
const {rows} = await pool.query("SELECT * FROM users WHERE id = $1" ,[id]);
return rows;
}

module.exports = {getAllMessages,getUser,getAllUsers,getUserById,insertMessage,insertUser,makeMember, deleteMessage};