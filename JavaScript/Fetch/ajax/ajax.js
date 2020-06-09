const xml = new XMLHttpRequest();
xml.upload.addEventListener('progress', (e) => {
  console.log(e,xml,'upload');
})
xml.addEventListener('progress', (e) => {
  console.log(e,xml,'dowload');
})
xml.addEventListener('readystatechange',() => {
  if(xml.readyState===4&&xml.status===200) {
    console.log(xml.response)
  }
})
xml.open('get','https://www.runoob.com/try/ajax/ajax_info.txt')
xml.send();