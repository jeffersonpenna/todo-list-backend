import { app } from './app'

const { NODE_PORT } = process.env

app.listen(NODE_PORT, () => console.log(`Server is running on PORT ${NODE_PORT}`))
