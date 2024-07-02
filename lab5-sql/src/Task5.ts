import {db} from "./database.js";

function execute(date: Date) {
    return db.result(
        "select videos.* from videos " +
        "inner join likes on (likes.video_id = videos.id) " +
        `where videos.published_at > timestamp '${date.toISOString().slice(0, 10)} 00:00:00'` +
        "group by videos.id " +
        "having count(*) > 4 " +
        "order by count(*) desc " +
        "limit 10")
}

execute(new Date(2021, 8))
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
