import Taro , { Component } from '@tarojs/taro';
import { View, Navigator, Text, Image, Input } from '@tarojs/components';
import { get as getGlobalData } from './../../util/global_data'
import './mine.scss'

export default class Mine extends Component {


  state={
    status: getGlobalData('status'),
    navHeight: getGlobalData('navHeight'),
    isLogin: false,
    repliedList: [],
    canLoad:true,
    loginBtn: false,
    answerList:[],
    userList:'',
    src:''
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
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }
  render() {
    const {status, navHeight, isLogin, loginBtn, userList, answerList} = this.state
    return (
      <View className='container'>
        <View className='normal-bg' style={`padding-top:${status + navHeight}px`}>
            <View className='normal-nav' style={`height:${status + navHeight}px`}>
                <View className='status' style={`height:${status}px`}></View>
                <View className='nav-header' style={`height:${navHeight}px;line-height:${navHeight}px`}>
                    <View className='normal-title'>我的</View>
                </View>
            </View>
        </View>
        {!isLogin ? 
          <View className='login-w'>
            {!loginBtn &&<Navigator url='/pages/login/login' className='normal-header' hoverClass='none'>
              <View className='normal-flex'>
                <View className='normal-img'>
                  <Image src='https://img1.findlawimg.com/img/xcx/baidu/default_temp.png' mode='widthFix' className='img' />
                </View>
                <Text className='txt blue'>请点击登录</Text>
              </View>
            </Navigator>}
          </View>
        :
          <View className='consult-w"'>
            <View className='normal-header'>
              <View className='normal-flex'>
                <View className='normal-img'>
                  <Image className='img' mode='widthFix' src='https://img1.findlawimg.com/img/xcx/baidu/default_temp.png' />
                </View>
                <Text className='txt'>{userList.userid}</Text>
              </View>
            </View>
            {userList.showSearch===1 && <View className='search_main'>
              <Input className='ipt' type='number' placeholder='请输入qid进行查询' confirmType='done' onConfirm={this.goSearch} />
            </View>}
            <View className='consult-list new-ans pd34'>
              {answerList==0 && <View className='has-none'>
                暂无数据，
                <Navigator className='reason' openType='switchTab' url='/pages/conlist/conlist' hoverClass='none'>
                  点击发布新咨询
                </Navigator>
              </View>}
              {
                answerList.map((item, index) => 
                  <View className='item' key={index} dataQid={item.qid} dataIfaudit={item.ifaudit}>
                    <View className='title-txt'>
                      <Text className='l icon'>问</Text>
                      <Text className='l tl'>{item.title}</Text>
                    </View>
                    {item.date && <View className=''>
                      <Text className='l tl'> </Text>
                      <Text className='time'>{item.date}</Text>
                    </View>}
                  </View>
                )
              }
            </View>
          </View>
        }
      </View>
    );
  }
}