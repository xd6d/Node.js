import {db} from "./database.js";

function execute() {
    return db.result(
        "select users.id, " +
        "users.name, " +
        "users.avatar_url, " +
        "channels.photo_url, " +
        "channels.description, " +
        "channels.created_at from users " +
        "left join channels on channels.user_id = users.id")
}

execute()
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
