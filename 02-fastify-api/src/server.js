import Fastify from 'fastify';
import { connect } from './db.js'
const PORT = 3000;

const app = Fastify({ logger: false });
const _db = await connect()

app.get('/students', async (request, reply) => {

    const students = await _db('students')
        .select('students.id', 'students.name', 'courses.name as course')
        .innerJoin('courses', 'courses.id', 'students.courseId');

    // const students = await _db('students').select('*')
    // for (const { courseId, ...student } of students) {
    //     const course = await _db('courses').select('*').where({ id: courseId }).first()
    //     student.course = course.name
    //     // delete student.courseId
    // }

    const payload = {
        students,
        message: "this is from the really bad response"
    }

    return reply
        .status(202)
        .send(payload);

});

const address = await app.listen({ port: PORT })
console.log(`Server is running on ${address}`);

