import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions { host: string }

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions

  newOptions.host = 'database'

  createConnection({
    ...options
  })
})

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions: ConnectionOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}