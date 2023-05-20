import {CpuInfo} from "os";
import * as systemInfo from "systeminformation";
import * as os from "os"

const interval = Number.parseInt(process.argv[2]) * 1000

function print() {
    console.log(`Operating system: ${os.version()}`)
    console.log(`Architecture: ${os.arch()}`)
    console.log(`Current user name: ${os.userInfo().username}`)
    console.log("CPU cores models:")
    os.cpus().forEach((cpu: CpuInfo) => console.log(`\t ${cpu.model}`))
    systemInfo.cpuTemperature().then(data => console.log(`CPU temperature: ${data.main}`))
    systemInfo.graphics().then(data => {
        console.log("Graphic controllers vendors and models:")
        data.controllers.forEach(c => {
            console.log(`\t ${c.vendor}`)
            console.log(`\t \t ${c.model}`)
        });
    })
    systemInfo.mem().then(data => {
        console.log("Total memory, used memory, free memory in GB: ")
        console.log(`\t ${data.total / 8589934592}`)
        console.log(`\t ${data.used / 8589934592}`)
        console.log(`\t ${data.free / 8589934592}`)
    })
    systemInfo.battery().then(data => {
        console.log("Дані про батарею (charging, percent, remaining time): ")
        console.log(`\t ${data.isCharging}`)
        console.log(`\t ${data.percent}`)
        console.log(`\t ${data.timeRemaining}`)
    })
}

setInterval(print, interval)
