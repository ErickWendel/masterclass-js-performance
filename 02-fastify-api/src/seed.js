import { connect, seedDb } from './db.js'

const _db = await connect()
await seedDb(_db)

await _db.destroy()
// for (const handle of process._getActiveHandles()) {
//     1;
// }
