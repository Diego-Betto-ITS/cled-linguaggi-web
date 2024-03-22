import fastify from 'fastify';
import cors from '@fastify/cors'

const app = fastify({
    logger: true,
})

await app.register(cors, { })

app.get('/dati', (request, response) => {
    response.send(
        [
            {
                x: [12, 15, 18, 21, 24, 27],
                y: [10, 25, 15, 60, 70, 80] 
            },
            {
                x: [12, 15, 18, 21, 24, 27],
                y: [15, 5, 10, 50, 60, 70] 
            },
            {
                x: [12, 15, 18, 21, 24, 27],
                y: [13, 51, 10, 50, 60, 70] 
            }
        ]
    )
})

app.listen(
    {
        port: 4000
    }, 
    () => {
        console.log('ho avviato il server sulla 4000')
    }
)