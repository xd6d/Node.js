import {db} from "./database.js";

function execute(name: string) {
    return db.result(
        "select videos.id, videos.title, videos.preview_url, videos.duration, videos.published_at from videos " +
        "left join subscriptions as subs on (subs.channel_id = videos.channel_id)" +
        `where subs.user_id = (select id from users where name = '${name}')` +
        "order by videos.published_at desc")
}

execute("Stephanie Bulger")
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
