const postsRouter = require('./posts')
const categoriesRouter = require('./categories')
const doctorsRouter = require('./doctors')
const usersRouter = require('./users')
const appointsRouter = require('./appointments')
const conversationRouter = require('./conversations');
const messageRouter = require('./messages');

const route = (app) => {
    app.use('/api/posts', postsRouter)
    app.use('/api/categories', categoriesRouter)
    app.use('/api/doctors', doctorsRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/appointments', appointsRouter)
    app.use('/api/conversations', conversationRouter);
    app.use('/api/messages', messageRouter);
}

module.exports = route
