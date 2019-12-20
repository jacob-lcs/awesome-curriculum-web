/**
 * 压缩图片
 * @param file input获取到的文件
 * @param callback 回调函数，压缩完要做的事，例如ajax请求等。
 */
function compressFile(file: any, callback: any) {
  const fileObj = file;
  const reader = new FileReader();
  reader.readAsDataURL(fileObj); // 转base64
  reader.onload = (e) => {
    const image = new Image(); // 新建一个img标签（还没嵌入DOM节点)
    if (!e || !e.target) {
      return ;
    }
    image.src = e.target.result as string;
    image.onload = () => {
      const canvas = document.createElement('canvas'); // 新建canvas
      const context = canvas.getContext('2d');
      const imageWidth = image.width / 2; // 压缩后图片的大小
      const imageHeight = image.height / 2;
      let data = '';
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      if (!context) {
        return ;
      }
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
      data = canvas.toDataURL('image/jpeg'); // 输出压缩后的base64
      const arr = data.split(',');
      const m = arr[0].match(/:(.*?);/); // 转成blob
      if (!m || m.length === 0) {
        return ;
      }
      const mime = m[0];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const files = new window.File(
        [new Blob([u8arr], { type: mime })],
        'test.jpeg',
        { type: 'image/jpeg' },
      ); // 转成file
      callback(files); // 回调
    };
  };
}

export default compressFile;
