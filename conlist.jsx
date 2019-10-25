import Taro , { Component } from '@tarojs/taro';
import { View, Image, Picker, Button, Input, Textarea, Icon } from '@tarojs/components';
import { set as setGlobalData, get as getGlobalData } from './../../util/global_data'
import areaData from './../../util/areaData'
import './conlist.scss'

export default class Conlist extends Component {

  config = {
    navigationBarTitleText: '法律咨询',
    navigationBarTextStyle: 'black'
  }

  state={
    content: '',
    contentLength: 0,
    disabled: true,
    isLoading: false,
    popShow: false,
    popVer: false,
    auth_code: '',
    prompt: '我们将严格保密，请准确填写',
    prompt_yzm: '请输入正确的验证码',
    disable: true,
    disable_yzm: true,
    isLogin: false,
    onlineSum:0,


    multiIndex: [7, 0],
    multiArray: [[], []],
    choseProvincesArr: [],
    choseCityArr: [],
    area: getGlobalData('area'),
    areaId: getGlobalData('areaCode'),


    mobile: '',
    canGetCode: true,
    codeText: '',
    sms_code: '',
    qid:'',
    src: ''
  }

  globalData = {
    multiArrayOne:[],
    multiArrayOneB:[],
    consultTypeTextId:''
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
        image: 'https://img1.findlawimg.com/img/xcx/baidu/logo.png',
        success: function () {
          console.log('setPageInfo success')
        },
        fail: function (err) {
          console.log('setPageInfo fail', err)
        }
      })
    }
    this.getLocation()
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  setContent(e) {
    let value = e.detail.value
    let disabled = true;
    if (value.length > 9) {
        disabled = false
    } else {
        disabled = true
    }
    this.setState({
      content: value,
      disabled: disabled,
      contentLength: value.length
    })
    this.globalData.content = value
  }
  // 提交咨询按钮
  submitHandle(e) {
    console.log(e)
    let _this = this
    if(_this.disabled){
        Taro.showToast({
            title: '咨询内容不少于10个字',
            icon: 'none',
            duration: 3000,
        });
        return
    }
    if(_this.isLoading) return
    let formData = {}
    formData.content = _this.globalData.content
    formData.areacode = getGlobalData('areacode')
    formData.frompage = getGlobalData('source')
    let session_key = getGlobalData('session_key')
    console.log(formData)
    console.log(session_key)
    _this.setState({
      isLoading: true,
      value: '',
      disabled: true
    })
    _this.globalData.content = ''
    Taro.navigateTo({
      url: '/pages/fillInMobile/fillInMobile'
    })
    if (session_key) {
        formData.session_key = session_key
        // _this.submit(formData)
    } else {
      Taro.login({
        success: function(res) {
          console.log(res)
          if (res.code) {
            formData.auth_code = res.code
          }
        }
      })
        // swan.login({
        //     complete: function (res) {
        //         if (res.code) {
        //             formData.auth_code = res.code
        //         }
        //         _this.submit(formData)
        //     }
        // });
    }
  }
  getLocation(){
    const _this = this
    this.setProvincesArr()
    const appArea = getGlobalData('area')
    if(appArea){
      areaData[1].map(function (el) {
        if(appArea.indexOf(el.value) != -1 ){
          _this.setState({
            area: el.value,
            areaId: el.id
          })
          setGlobalData('area',el.value)
          setGlobalData('areacode',el.id)
          let parentid = el.parentid
          areaData[0].map(function (el1) {
              if(parentid==el1.id){
                  _this.setCityArr(el1.key)
                  _this.setState({
                    multiIndex: [el1.key, el.key]
                  })
              }
          })
        }
      })
    }
  }
  // 地区选择
  bindMultiPickerColumnChange(e){
    if (e.detail.column != 0) return
    this.setCityArr(e.detail.value)
    this.setState({
      multiIndex: [e.detail.value,0]
    })
  }
  bindMultiPickerChange(e){
    let multiIndex = e.detail.value
    let area = this.state.multiArray[1][multiIndex[1]]
    let areaId = this.state.choseCityArr[multiIndex[1]].id
    setGlobalData('area',area)
    setGlobalData('areacode',areaId)
    this.setState({
      multiIndex: multiIndex,
      area: area
    })
  }
  setCityArr(index){
    let choseCityArr = areaData[1].filter(ele => {
      return ele.parentid == areaData[0][index || 0].id
    })
    let multiArrayTwo = choseCityArr.map(ele => {
      return ele.value;
    })
    this.setState({
      choseCityArr: choseCityArr,
      multiArray: [this.globalData.multiArrayOne,multiArrayTwo]
    })
  }
  setProvincesArr(){
    let choseProvincesArr = areaData[0]
    let multiArrayOne = choseProvincesArr.map(ele => {
        return ele.value
    })
    this.globalData.multiArrayOne = multiArrayOne
    this.setState({
      multiArray: [multiArrayOne,0]
    })
  }
  render() {
    const {onlineSum, disabled, popShow, value, contentLength, multiIndex, multiArray, area, isLoading, prompt_yzm, disable_yzm, isLoading_yzm, popVer} = this.state
    return (
      <View>
        <View className='top-title'>
          <View className='public_view'>
            <Image className='public' src='https://img1.findlawimg.com/img/xcx/baidu/public.jpg' />
          </View>
          <View className='content'>
            <View className='num'>{onlineSum}</View>
            位律师在线，等待为您解答。解答后，免费短信通知您
          </View>
        </View>
        <View className='input-wrap'>
          <View className='input-w'>
            <Textarea className='input' placeholderClass='input-p' placeholder='请在此详细描述事情的发生时间、地点、人物、过程、结果、争议的焦点等重要信息，并明确提出您的需求，不少于10个字' maxlength='800' onInput={this.setContent} value={value}></Textarea>
            <View className='num-box'>
              {contentLength}/800
            </View>
            <View className='picker-w'>
              <Picker mode='multiSelector' onColumnChange={this.bindMultiPickerColumnChange} onChange={this.bindMultiPickerChange} value={multiIndex} range={multiArray} title='地区' className='picker'>
                <View className='text-w'>
                  <Image className='img' src='https://img1.findlawimg.com/img/xcx/baidu/area.png' />
                  { area }
                </View>
              </Picker>
            </View>
          </View>
          <Button className='submit-btn' type='primary' disabled={disabled} openType='getPhoneNumber' onGetPhoneNumber={this.submitHandle} loading={isLoading}> {isLoading ? '提交中': '提交咨询'}</Button>
        </View>
        <View className='process'>
          <View className='subtitle'>咨询流程</View>
          <View className='setp-w'>
            <View className='step-item'>
              <Image className='icon' src='https://img1.findlawimg.com/img/xcx/baidu/step-01.png' />
              <View className='text-w'>
                <View className='num'>1</View>
                <View>
                  <View className='step-text'>填写</View>
                  咨询详情
                </View>
              </View>
            </View>
            <View className='step-item'>
              <Image className='icon' src='https://img1.findlawimg.com/img/xcx/baidu/step-02.png' />
              <View className='text-w'>
                <View className='num'>2</View>
                <View>
                  <View className='step-text'>律师解答</View>
                  约5-15分钟
                </View>
              </View>
            </View>
            <View className='step-item'>
              <Image className='icon' src='https://img1.findlawimg.com/img/xcx/baidu/step-03.png' />
              <View className='text-w'>
                <View className='num'>3</View>
                <View>
                  <View className='step-text'>短信提醒</View>
                  收到解答结果短信
                </View>
              </View>
            </View>
          </View>
        </View>
        {popVer && <View className='pop'>
          <View className='login'>
              <View className='subtitle'>请完成验证码</View>
              <View className='input-w border-b'>
                  <Input className='input' type='text' placeholder-className='input-p' placeholder='请输入图片中的字符' maxlength='4' />
              </View>
              <View className='prompt'>
                  <View s-if='prompt_yzm'>提示：{prompt_yzm}</View>
              </View>
              <Button className='btn' type='primary' disabled={disable_yzm||isLoading_yzm} loading={isLoading_yzm} onClick={this.sureHandle}>{isLoading_yzm?'提交中':'确定'}</Button>
              <View className='close-btn' onClick={this.yzmHandle}>
                  <Icon type='cancel' color='#fff'></Icon>
              </View>
          </View>
        </View>}
        {popShow && <View className='pop'>
          <View className='login'>
            <View className='subtitle'>您的咨询还差最后一步</View>
            <View className='info'>建立手机账号，并通过手机免费接收律师回复短信</View>
            <View className='input-w border-b'>
                <Input className='input' type='number' placeholderClass='input-p' placeholder='请输入11位手机号码' maxlength='11' onInput={this.setMobile} />
                <View onClick={this.getCode} className='code'>{codeText?codeText+'S':'获取验证码'}</View>
            </View>
            <View className='input-w border-b'>
                <Input onInput={this.setCode} placeholderClass='input-p' className='input' type='number' placeholder='输入短信验证码' />
            </View>
            <View className='prompt'>
                <View s-if='prompt'>提示：{prompt}</View>
            </View>
            <Button className='btn' type='primary' disabled={disable||isLoading} loading={isLoading} onClick={this.sureHandle}>{isLoading?'提交中':'确定'}</Button>
            <View className='close-btn' onClick={this.closePage}>
                <Icon type='cancel' color='#fff'></Icon>
            </View>
        </View>
      </View>}
      </View>
    );
  }
}