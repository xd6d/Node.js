import undici from 'undici'
import fs from 'node:fs/promises'
import path from 'node:path'

const input = process.argv[2]
if (!input)
    process.exit(1)
const filename = path.parse(input).name
const dirPath = path.join(process.cwd(), `${filename}_pages`)

Promise.all([
    fs.mkdir(dirPath, {recursive: true}),
    fs.readFile(input)
        .then(buffer => buffer.toString())
        .then(json => JSON.parse(json))
        .then((links: Array<string>) => {
            links.map((link, i) => {
                undici.fetch(link).then(
                    (response) => response.text().then((s) => fs.writeFile(path.join(dirPath, i + ".txt"), s))
                )
            })
        })
        .catch(err => console.log(err))
])
