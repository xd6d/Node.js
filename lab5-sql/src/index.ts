import pgp from 'pg-promise'
import * as dotenv from 'dotenv'

dotenv.config()

const db = pgp()(`postgres://${process.env.postgres_username}:${process.env.postgres_password}@${process.env.postgres_host}:${process.env.postgres_port}/${process.env.postgres_database}`)

//1.
db.result("select users.id, users.name, users.avatar_url, channels.photo_url, channels.description, channels.created_at from users left join channels on channels.user_id = users.id")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))

//2.
db.result("select videos.* from videos right join likes on (likes.video_id = videos.id) where likes.positive group by videos.id order by count(*) desc limit 5")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))

//3.
db.result("select videos.id, videos.title, videos.preview_url, videos.duration, videos.published_at from videos " +
    "left join subscriptions as subs on (subs.channel_id = videos.channel_id)" +
    "where subs.user_id = (select id from users where name = 'Stephanie Bulger')" +
    "order by videos.published_at desc")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))

//4.
db.result("select channels.*, (select count(*) from subscriptions as subs where subs.channel_id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' group by subs.channel_id) from channels where channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' ")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))

//5.
db.result("select videos.* from videos inner join likes on (likes.video_id = videos.id) where videos.published_at > timestamp '2021-09-01 00:00:00' group by videos.id having count(*) > 4 order by count(*) desc limit 10")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))

//6.
db.result("select users_channels.name, users_channels.avatar_url, channels.photo_url, channels.description, subs.level, subs.subscribed_at from channels " +
    "inner join users as users_channels on (users_channels.id = channels.user_id) " +
    "left join subscriptions as subs on (subs.channel_id = channels.id)" +
    "where subs.user_id = (select id from users where name = 'Ennis Haestier')" +
    "order by subs.level='vip' desc, subs.level='follower' desc, subs.level='fan' desc, subs.level='standard' desc, subs.subscribed_at desc")
    .then((result) => console.log(result.rows))
    .catch(error => console.log(error))
