import Taro , { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';
import { get as getGlobalData } from './../../util/global_data'

export default class Conlist extends Component {

  config = {
    navigationBarTitleText: '免费法律咨询',
    navigationBarTextStyle: 'black'
  }
  state={
    src: 'https://m.findlaw.cn/ask/ask.php?iswrite=9&time='
  }
  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    if(getGlobalData('getEnv') == 'swan'){
      swan.setPageInfo({
        title: '免费法律咨询-找法网(findlaw.cn)',
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
      src: `https://m.findlaw.cn/ask/ask.php?iswrite=9&time=${Date.parse(new Date())}&frompage=${getGlobalData('source')}`
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