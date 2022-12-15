export const positions = [ 'fifth', 'first' , 'eighth', 'third', 'seventh', 'sixth', 'tenth', 'ninth'];
export const targets = ['spiderman', 'batman', 'superman', 'wolverine', 'subziro', 'ironman' ];

export const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getData = (data) => {
    const pos = positions;
    if (data && data.position) {
        const index = pos.indexOf(data.position);
        pos.splice(index, 1);
    }
    const first = {
        position: pos[Math.floor(Math.random()*pos.length)],
        target: targets[Math.floor(Math.random()*targets.length)],
        enemy:  Math.random() >= 0.2
    }

    const second = {
        position: pos[Math.floor(Math.random()*pos.length)],
        target: targets[Math.floor(Math.random()*targets.length)],
        enemy:  true
    }
    let random = randomIntFromInterval(1, 3)
    if (data && data.position) {
        pos.push(data.position);
        random = 2
    }

    if (random === 1) {
        return [first, second]
    } else {
        return [first]
    }

}

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

