import undici from 'undici'
import fs from 'node:fs'
import path from 'node:path'

const input = process.argv[2]
if (!input)
    process.exit(1)
const filename = path.parse(input).name
const dirPath = path.join(process.cwd(), `${filename}_pages`)
fs.mkdir(dirPath, () => {})
const links = JSON.parse(fs.readFileSync(input).toString())
for (let i = 0; i<links.length; i++) {
    undici.fetch(links[i]).then(
            (response) => response.text().then((s) => fs.writeFileSync(path.join(dirPath, i + ".txt"), s))
        )
}
