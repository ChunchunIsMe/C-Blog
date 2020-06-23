setTimeout(() => {
  Promise.resolve(1).then(() => {
    console.log(1);
  })
}, 0)
setTimeout(() => {
  console.log(2);
}, 0)