import axios from 'axios';

const fs = require('fs')
const path = require('path')


const input = process.argv[2]
const filename = path.parse(input).name
const dirPath = path.join(__dirname, `${filename}_pages`)
fs.mkdir(dirPath, () => {})
const links = JSON.parse(fs.readFileSync(input))
for (let i = 0; i<links.length; i++) {
    axios.get(links[i]).then((response) => fs.writeFileSync(path.join(dirPath, i + ".txt"), response.data))
}