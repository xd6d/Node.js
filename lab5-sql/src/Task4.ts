import {db} from "./database.js";

function execute(channelId: string) {
    return db.result(
        "select channels.*, " +
        "(select count(*) from subscriptions as subs " +
            `where subs.channel_id = '${channelId}' group by subs.channel_id) from channels ` +
        `where channels.id = '${channelId}' `)
}

execute("79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76")
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
