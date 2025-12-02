// salaaaaaaaaaaaaaam dooooonya
// bye donya
//jam kon binim
const http = require('http')
const fs = require('fs/promises')

const getFile = async function(path,encoding='utf-8') {
    try {
        const content = await fs.readFile(path,encoding)
        return content
    } catch (error) {
        return JSON.stringify(error)
    }
}

const server = http.createServer(async(req,res) => {

    const url = new URL(req.url,'http://localhost')
    const filePath = new URLSearchParams(url.search).get('path')

    if(!filePath){
        res.setHeader('Content-Type','application/json')
        res.write(JSON.stringify(
                {
                    status: 'error',
                    message: 'path must exist'
                }
            )
        )
        res.end()
    }

    else {
        const fileContent = await getFile(filePath)
        res.setHeader('Content-Type','text/plain')
        res.write(fileContent)
        res.end()
    }



})

const PORT = 8090

server.listen(PORT,'0.0.0.0')