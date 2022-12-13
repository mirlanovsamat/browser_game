export const positions = ['twentyth', 'second', 'ninth', 'tenth', 'sixth', 'seventh', 'third', 'eighth', 'first', 'fifth'];
export const targets = ['spiderman', 'batman', 'superman', 'wolverine', 'subziro', 'ironman' ];

export const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomInterval = (callback, min, max) => {
    let timeout;

    const randomNum = (max, min = 0) => Math.random() * (max - min) + min;

    const stop = () => clearTimeout(timeout)

    const tick = () => {
        let time = randomNum(min, max);
        stop();

        timeout = setTimeout(() => {
            tick();
            callback && typeof callback === "function" && callback(stop);
        }, time)
    }

    tick();
}

export const getData = () => {
    const first = {
        position: positions[Math.floor(Math.random()*positions.length)],
        target: targets[Math.floor(Math.random()*targets.length)],
        enemy:  Math.random() >= 0.5
    }

    const second = {
        position: positions[Math.floor(Math.random()*positions.length)],
        target: targets[Math.floor(Math.random()*targets.length)],
        enemy:  Math.random() < 0.5
    }
    const random = randomIntFromInterval(1, 3)

    if (random === 1) {
        return [first, second]
    } else {
        return [first]
    }

}


