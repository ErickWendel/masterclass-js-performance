import http from 'http'
import knex from 'knex'

// autocannon -d 5 localhost:3000
const db = knex({
    client: 'pg',
    connection: 'postgres://erickwendel:erick@localhost:5432/ewacademy',
    searchPath: ['knex', 'public'],
})
http.createServer(async (req, res) => {


    const { count } = await db('pg_stat_activity').where({ datname: 'ewacademy' }).count().first()

    res.end(`there're ${count} active connections on postgres!`)

}).listen(3000, () => {
    console.log('app running on 3000')
})

// ------------------------------

{
    const db = knex({
        client: 'pg',
        connection: 'postgres://erickwendel:erick@localhost:5432/ewacademy',
        searchPath: ['knex', 'public'],
    })
    setInterval(async () => {

        const { count } = await db('pg_stat_activity').where({ datname: 'ewacademy' }).count().first()
        console.log(`there are ${count} connections opened!`)
    }, 200)
}

// process.on('uncaughtException', (error) => console.error(error))