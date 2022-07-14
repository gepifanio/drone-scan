// drone scan application

// coordinate
const coordinate = ({ min, max }) => { 
  return { min, max };
}

// drop drone
const drop = ({ x, y, direction }) => {
  const invalidText = 'Invalid coordinate to start the drone';

  if (x > coordinate.max || x < coordinate.min) {
    return invalidText;
  }

  if (y > coordinate.max || y < coordinate.min) {
    return invalidText;
  }

  return { x, y, direction };
};

// validade if drone is dropped
const isDroneDropped = ({ x, y, direction }) => {
  if (x || y || direction) {
    return true;
  } else {
    return false;
  }
};

// move drone
const move = ({ x, y, direction }) => {
  if (isDroneDropped({ x, y, direction })) {
    switch (direction) {
      case 'NORTH':
        return { x, y: Math.min(y + 1, 4), direction: 'NORTH' };
      case 'SOUTH':
        return { x, y: Math.max(y - 1, 0), direction: 'SOUTH' };
      case 'WEST':
        return { x: Math.max(x - 1, 0), y, direction: 'WEST' };
      case 'EAST':
        return { x: Math.min(x + 1, 4), y, direction: 'EAST' };
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
};


// turn left
const left = ({ x, y, direction }) => {
  if (isDroneDropped({ x, y, direction })) {
    switch (direction) {
      case 'NORTH':
        return { x, y, direction: 'WEST' };
      case 'WEST':
        return { x, y, direction: 'SOUTH' };
      case 'SOUTH':
        return { x, y, direction: 'EAST' };
      case 'EAST':
        return { x, y, direction: 'NORTH' };
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
};


// turn right
const right = ({ x, y, direction }) => {
  if (isDroneDropped({ x, y, direction })) {
    switch (direction) {
      case 'NORTH':
        return { x, y, direction: 'EAST' };
      case 'WEST':
        return { x, y, direction: 'NORTH' };
      case 'SOUTH':
        return { x, y, direction: 'WEST' };
      case 'EAST':
        return { x, y, direction: 'SOUTH' };
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
};


// report drone location
const report = ({ x, y, direction }) => {
  if (isDroneDropped({ x, y, direction })) {
    const reportText = `Output: ${x} ${y} ${direction}`;
    return reportText;
  } else {
    return 'Invalid drone location';
  }
};


// index.html interaction
let state = new Object();

const initDrone = () => {
  const $min = document.getElementById('min').value;
  const $max = document.getElementById('max').value;
  const $x = +document.getElementById('x').value;
  const $y = +document.getElementById('y').value;
  const $direction = document.getElementById('direction').value;

  // init coordinate
  state = coordinate({ min: $min, max: $max });

  // init drop location
  state = drop({ x: $x, y: $y, direction: $direction });
};

const moveDrone = ({ x, y, direction }) => {
  state = move({ x, y, direction });
};

const moveLeft = ({ x, y, direction }) => {
  state = left({ x, y, direction });
};

const moveRight = ({ x, y, direction }) => {
  state = right({ x, y, direction });
};

const droneReport = ({ x, y, direction }) => {
  const $report = document.getElementById('report');

  $report.innerText = report({ x, y, direction });
};

module.exports = {
  drop,
  move,
  left,
  right,
  report,
  isDroneDropped,
  initDrone,
  moveDrone,
  moveLeft,
  moveRight,
  droneReport,
};
