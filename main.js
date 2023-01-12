const { requestGPIOAccess } = require("node-web-gpio");
const sleep = require("util").promisify(setTimeout);

const J2  = 4
    , J3  = 22
    , J4  = 6
    , J5  = 26;


async function push(port_no, wait = 150) {
    const gpio = await requestGPIOAccess();
    const port = gpio.ports.get(port_no);
    await port.export("out");

    await port.write(1);
    await sleep(wait);
    await port.write(0);
}

async function on(port_no) {
    const gpio = await requestGPIOAccess();
    const port = gpio.ports.get(port_no);
    await port.export("out");
    await port.write(1);
}

async function off(port_no) {
    const gpio = await requestGPIOAccess();
    const port = gpio.ports.get(port_no);

    await port.export("out");
    await port.write(0);
}



//J2 on
on(J2);

//J3 off
on(J3);

//J4 push (Toggle Interval: 150ms[default])
push(J4);

//J5 push (Toggle Interval: 1000ms)
push(J5, 1000);

