import {db} from "./database.js";

function execute(name: string) {
    return db.result(
        "select users_channels.name, " +
        "users_channels.avatar_url, " +
        "channels.photo_url, " +
        "channels.description, " +
        "subs.level, " +
        "subs.subscribed_at from channels " +
        "inner join users as users_channels on (users_channels.id = channels.user_id) " +
        "left join subscriptions as subs on (subs.channel_id = channels.id)" +
        `where subs.user_id = (select id from users where name = '${name}')` +
        "order by subs.level='vip' desc, " +
                "subs.level='follower' desc, " +
                "subs.level='fan' desc, " +
                "subs.level='standard' desc, " +
        "subs.subscribed_at desc")
}

execute("Ennis Haestier")
    .then(result => console.log(result.rows))
    .catch(err => console.log(err))
