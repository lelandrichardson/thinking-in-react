const sleep = (ms = 10) => {
  const deadline = Date.now() + ms;
  while(Date.now() < deadline) {}
}

module.exports = sleep;
