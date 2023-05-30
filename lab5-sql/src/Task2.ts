import {db} from "./database.js";

function execute() {
    return db.result(
        "select videos.* from videos " +
        "right join likes on (likes.video_id = videos.id) " +
        "where likes.positive " +
        "group by videos.id " +
        "order by count(*) desc " +
        "limit 5")
}

execute()
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
