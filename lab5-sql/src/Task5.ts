import {db} from "./database.js";

function execute() {
    return db.result(
        "select videos.* from videos " +
        "inner join likes on (likes.video_id = videos.id) " +
        "where videos.published_at > timestamp '2021-09-01 00:00:00'" +
        "group by videos.id " +
        "having count(*) > 4 " +
        "order by count(*) desc " +
        "limit 10")
}

execute()
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
