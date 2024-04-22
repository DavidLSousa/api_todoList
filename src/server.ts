import { app } from './infra/express/express'

const PORT = String(process.env.PORT)

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`))