// 这里用代码模拟文件扫描功能

// 文件类

class File {
  constructor(name) {
    this.name = name || 'File';
  }

  scan() {
    console.log('扫描文件:' + this.name)
  }
}


class Folder {
  constructor(name) {
    this.name = name || "Folder";
    this.files = [];
  }

  add(file) {
    this.files.push(file);
  }

  scan() {
    console.log("扫描文件夹:" + this.name);
    this.files.forEach(file => file.scan());
  }
}

const root = new Folder("root"),
      folder1 = new Folder('folder1'),
      folder2 = new Folder('folder2'),
      file1 = new File('file1'),
      file2 = new File('file2'),
      file3 = new File('file3');

folder1.add(file1);
folder2.add(file2);
folder2.add(file3);

root.add(folder1);
root.add(folder2);

root.scan();