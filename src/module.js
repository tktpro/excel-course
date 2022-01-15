console.log('====11', 'Module.js');
console.log('====', 1);

async function start() {
  return Promise.resolve('async w');
}

start().then(console.log);
