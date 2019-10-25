import Taro , { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';
import { get as getGlobalData } from './../../util/global_data'

export default class Mine extends Component {

  config = {
    navigationBarTitleText: '我的',
    navigationBarTextStyle: 'black'
  }

  state={
    src: 'https://m.findlaw.cn?c=Leoadmin'
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    if(getGlobalData('getEnv') == 'swan'){
      swan.setPageInfo({
        title: '个人中心 - 找法网(findlaw.cn)',
        keywords: '',
        description: '',
        image:'https://img1.findlawimg.com/img/xcx/baidu/logo.png',
        success: function () {
            console.log('setPageInfo success');
        },
        fail: function (err) {
            console.log('setPageInfo fail', err);
        }
      })
    }
    this.setState({
      src: `https://m.findlaw.cn?c=Leoadmin&time=${Date.parse(new Date())}`
    })
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    const {src} = this.state
    return (
      <WebView src={src}></WebView>
    );
  }
}