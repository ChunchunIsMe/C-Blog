(new Promise((re) => { re() })).then(() => {
  console.log(0);
  return new Promise((r) => { r() })
}).then(() => { console.log(4, 1) });


(new Promise((re) => { re() })).then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})
