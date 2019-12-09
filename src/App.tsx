import html2canvas from 'html2canvas';
import React from 'react';
import alertLoginForm from '../src/components/LoginForm/index';
import Head from './components/Head';
import Square from './components/Square';
import './style/App.css';
import { getName, getToken } from './utils/auth';

// const App: React.FC = ()
class App extends React.Component {
  public downloadImg = () => {
    const element = document.querySelector('.square') as HTMLElement;
    html2canvas(element.parentNode as HTMLElement).then((canvas: any) => {
      /**
       * 获取mimeType
       * @param  {String} type the old mime-type
       * @return the new mime-type
       */
      const type = 'png';
      let imgData = canvas.toDataURL(type);

      const fixType = (typeName: string): string => {
        typeName = typeName.toLowerCase().replace(/jpg/i, 'jpeg');
        const r: RegExpMatchArray | null = typeName.match(/png|jpeg|bmp|gif/);
        const name: string = r ? r[0] : 'jpg';
        return 'image/' + name;
      };
      // 加工image data，替换mime type
      imgData = imgData.replace(fixType(type), 'image/octet-stream');

      /**
       * 在本地进行文件保存
       * @param  {String} data     要保存到本地的图片数据
       * @param  {String} filename 文件名
       */
      const saveFile = (data: string, fileName: string) => {
        const saveLink: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = data;
        saveLink.download = fileName;

        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        saveLink.dispatchEvent(event);
      };

      const filename = '课表' + (new Date()).getTime() + '.' + type;
      saveFile(imgData, filename);
    });
  }

  public componentDidMount() {
    if (!getName() || !getToken()) {
      alertLoginForm('', '', {});
    }
  }
  public render() {
    return (
      <div className='App'>
        <Head downloadImg={this.downloadImg} />
        <Square />
      </div>
    );
  }
}

export default App;
