import {NativeModules} from 'react-native';

function invoke(module, method, request = {}) {
    const bridge = NativeModules['HybridBridge'];
    if (bridge) {
        return bridge.invoke({
            module: module,
            method: method,
            request: JSON.stringify(request)
        }).then((response) => {
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            return response || {};
        });
    } else {
        return NativeModules[module][method](request);
    }
}

/**
 * 日历功能
 *
 * @since 8.0
 */
class Calendar {

    /**
     * 添加一个日历提醒时间
     *
     * @param {object} request
     * @param {string} request.title - 标题 {@since 8.0}
     * @param {string} request.content - 描述 {@since 8.0}
     * @param {string} request.startTime - 描述提醒开始时间 {@since 8.0}
     * @param {string} request.endTime - 描述提醒结束时间 {@since 8.0}
     * @param {string[]} request.remindTimes - 提醒时间 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static add(request) {
        return invoke('Calendar', 'add', request);
    }

    /**
     * 搜索日历内容
     *
     * @param {object} request
     * @param {object[]} request.data - 搜索条件列表 {@since 8.0}
     * @param {string} request.data[].title - 提醒时间名称 {@since 8.0}
     * @param {string} request.data[].startTime - 提醒开始时间 {@since 8.0}
     * @param {string} request.data[].endTime - 提醒结束时间 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static query(request) {
        return invoke('Calendar', 'query', request);
    }

    /**
     * 打开日历提醒
     *
     * @param {object} request
     * @param {string} request.title - 日历提醒名称 {@since 8.0}
     * @param {string} request.startTime - 日历提醒开始时间 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static open(request) {
        return invoke('Calendar', 'open', request);
    }
}

/**
 * 财富号模块: 提供财富号模块的一些信息（产品名称和配置信息等）
 *
 * @since 8.1
 */
class CFH {

    /**
     * 获取应用的财富号信息
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getConfiguration() {
        return invoke('CFH', 'getConfiguration');
    }

    /**
     * 存储图片到图片相册
     *
     * @param {object} request
     * @param {string} request.imageData - 图片的二进制流Base64转码 {@since 8.1}
     * @param {string} request.externalPath - 图片存储到相册的扩展地址 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static saveImage(request) {
        return invoke('CFH', 'saveImage', request);
    }

    /**
     * 获取股吧大表情配置
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getFaceConfig() {
        return invoke('CFH', 'getFaceConfig');
    }

    /**
     * 分享到股吧（包含转发帖）
     *
     * @param {object} request
     * @param {string} request.shareData - 股吧分享的内容 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static shareToGuba(request) {
        return invoke('CFH', 'shareToGuba', request);
    }
}

/**
 * 用于读取东财配置文件
 *
 * @since 7.9
 */
class Configuration {

    /**
     * 获取应用配置. 注意: 该方法在 iOS/Android 上存在差异, 需要分别调用.
     *
     * @param {object} request
     * @param {string} request.name - 配置项名称 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static get(request) {
        return invoke('Configuration', 'get', request);
    }

    /**
     * 获多个取应用配置. 注意: 该方法在 iOS/Android 上存在差异, 需要分别调用.
     *
     * @param {object} request
     * @param {string[]} request.names - 配置项名称 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getMultiple(request) {
        return invoke('Configuration', 'getMultiple', request);
    }
}

/**
 * 容器模块: 提供当前容器的基本信息 (如: 应用/设备信息, 模块支持情况)
 *
 * @since 7.9
 */
class Container {

    /**
     * 获取应用信息
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getApplicationInfo() {
        return invoke('Container', 'getApplicationInfo');
    }

    /**
     * 获取设备信息
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getDeviceInfo() {
        return invoke('Container', 'getDeviceInfo');
    }

    /**
     * 获取设备安全码信息
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getSecurityInfo() {
        return invoke('Container', 'getSecurityInfo');
    }

    /**
     * 获取示例信息
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getSamples() {
        return invoke('Container', 'getSamples');
    }

    /**
     * 关闭当前容器
     *
     * @param {object} request
     * @param {string} request.result - 返回值 {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static close(request) {
        return invoke('Container', 'close', request);
    }

    /**
     * 截图
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static takeSnapshot() {
        return invoke('Container', 'takeSnapshot');
    }

    /**
     * 设置是否支持侧滑退出 (iOS)
     *
     * @param {object} request
     * @param {boolean} request.enabled - 是否支持侧滑退出 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static setSwipeBackEnabled(request) {
        return invoke('Container', 'setSwipeBackEnabled', request);
    }
}

/**
 * 加解密模块
 *
 * @since 7.9
 */
class Crypto {

    /**
     * DES 解密
     *
     * @param {object} request
     * @param {string} request.secret - 密钥 {@since 7.9}
     * @param {string[]} request.inputs - 需要解密的字符串 (数组, 各元素为 BASE64 格式字符串) {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static desDecrypt(request) {
        return invoke('Crypto', 'desDecrypt', request);
    }

    /**
     * 通行证账号加密
     *
     * @param {object} request
     * @param {string} request.input - 加密内容 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static emPassportEncrypt(request) {
        return invoke('Crypto', 'emPassportEncrypt', request);
    }
}

/**
 * 用于加载字体文件
 *
 * @since 7.9
 */
class Font {

    /**
     * 加载字体文件
     *
     * @param {object} request
     * @param {object[]} request.sources - 字体列表 {@since 7.9}
     * @param {string} request.sources[].name - 字体名称 {@since 7.9}
     * @param {string} request.sources[].uri - 字体路径 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static load(request) {
        return invoke('Font', 'load', request);
    }
}

/**
 * 余锦松数据采集接口
 */
class Kibana {

    /**
     * 明细信息中埋点
     *
     * @param {object} request
     * @param {string} request.action - 事件id {@since 8.1}
     * @param {string} request.operateType - 操作方式 (可选值包括: 'open', ’click’, ’close’, ’slide’, ’pullDown’, ’pullUp’) {@since 8.1}
     * @param {string} request.p1 - 附加字段 {@since 8.1}
     * @param {string} request.p2 - 附加字段 {@since 8.1}
     * @param {string} request.p3 - 附加字段 {@since 8.1}
     * @param {string} request.p4 - 附加字段 {@since 8.1}
     * @param {string} request.p5 - 附加字段 {@since 8.1}
     * @param {string} request.p6 - 附加字段 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static trackEvent(request) {
        return invoke('Kibana', 'trackEvent', request);
    }

    /**
     * 异常信息
     *
     * @param {object} request
     * @param {string} request.type - 异常类型(crash,other) {@since 8.1}
     * @param {string} request.exceptionInfo - 异常信息 {@since 8.1}
     * @param {string} request.extend - 保留字段 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static trackException(request) {
        return invoke('Kibana', 'trackException', request);
    }
}

/**
 * 存储模块: 用于保存持久化信息
 *
 * @since 7.9
 */
class LocalStorage {

    /**
     * 存储数据 (注意: 存储数据全局共享, 不同 Bundle 间可相互覆盖)
     *
     * @param {object} request
     * @param {string} request.name - 名称 {@since 7.9}
     * @param {string} request.data - 数据 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static set(request) {
        return invoke('LocalStorage', 'set', request);
    }

    /**
     * 读取已存储的数据 (注意: 存储数据全局共享, 不同 Bundle 间可相互覆盖)
     *
     * @param {object} request
     * @param {string} request.name - 名称 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static get(request) {
        return invoke('LocalStorage', 'get', request);
    }

    /**
     * 删除数据 (注意: 存储数据全局共享, 不同 Bundle 间可相互覆盖)
     *
     * @param {object} request
     * @param {string} request.name - 名称 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static remove(request) {
        return invoke('LocalStorage', 'remove', request);
    }
}

/**
 * 日志模块
 *
 * @since 8.0
 */
class Logger {

    /**
     * 冗余
     *
     * @param {object} request
     * @param {string} request.tag - Tag {@since 8.0}
     * @param {string} request.msg - 日志内容 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static verbose(request) {
        return invoke('Logger', 'verbose', request);
    }

    /**
     * 调试
     *
     * @param {object} request
     * @param {string} request.tag - Tag {@since 8.0}
     * @param {string} request.msg - 日志内容 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static debug(request) {
        return invoke('Logger', 'debug', request);
    }

    /**
     * 信息
     *
     * @param {object} request
     * @param {string} request.tag - Tag {@since 8.0}
     * @param {string} request.msg - 日志内容 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static info(request) {
        return invoke('Logger', 'info', request);
    }

    /**
     * 警告
     *
     * @param {object} request
     * @param {string} request.tag - Tag {@since 8.0}
     * @param {string} request.msg - 日志内容 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static warn(request) {
        return invoke('Logger', 'warn', request);
    }

    /**
     * 错误
     *
     * @param {object} request
     * @param {string} request.tag - Tag {@since 8.0}
     * @param {string} request.msg - 日志内容 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static error(request) {
        return invoke('Logger', 'error', request);
    }
}

/**
 * 通行证模块: 用于获取用户信息
 *
 * @since 7.9
 */
class Passport {

    /**
     * 判断用户是否登录
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static hasLogin() {
        return invoke('Passport', 'hasLogin');
    }

    /**
     * 跳转登录
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static requestLogin() {
        return invoke('Passport', 'requestLogin');
    }

    /**
     * 获取用户信息
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getUserInfo() {
        return invoke('Passport', 'getUserInfo');
    }

    /**
     * 弹出实名认证弹窗
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static openBindPhoneDialog() {
        return invoke('Passport', 'openBindPhoneDialog');
    }
}

/**
 * 收银台
 *
 * @since 7.9
 */
class PayCounter {

    /**
     * 第一步: 打开收银台
     *
     * @param {object} request
     * @param {string} request.title - 标题 {@since 7.9}
     * @param {string} request.price - 价格 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static show(request) {
        return invoke('PayCounter', 'show', request);
    }

    /**
     * 第二步: 继续支付流程
     *
     * @param {object} request
     * @param {string} request.sequence - 调用 show 方法时返回的序列号 {@since 7.9}
     * @param {string} request.payContent - 支付参数 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static goPay(request) {
        return invoke('PayCounter', 'goPay', request);
    }

    /**
     * 取消支付流程
     *
     * @param {object} request
     * @param {string} request.sequence - 调用 show 方法时返回的序列号 {@since 7.9}
     * @param {string} request.message - 提示信息 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static cancel(request) {
        return invoke('PayCounter', 'cancel', request);
    }
}

/**
 * 用于获取系统权限
 *
 * @since 8.0
 */
class Permissions {

    /**
     * 获取权限, 类型如下:- photo: 相册 (仅 iOS)- camera: 相机- location: 定位- calendar: 日历- media: 媒体库 (仅 iOS)- contacts: 通讯录- microphone: 麦克风- android.permission.*: 安卓权限 ([说明](https://facebook.github.io/react-native/docs/permissionsandroid#permissions-that-require-prompting-the-user))
     *
     * @param {object} request
     * @param {string} request.permission - 权限类型 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static request(request) {
        return invoke('Permissions', 'request', request);
    }

    /**
     * 获取多个权限
     *
     * @param {object} request
     * @param {string[]} request.permissions - 权限列表 {@since 8.0}
     *
     * @returns {Promise<object>}
     *
     * @since 8.0
     */
    static requestMultiple(request) {
        return invoke('Permissions', 'requestMultiple', request);
    }

    /**
     * 打开权限设置页面
     *
     * @param {object} request
     * @param {string} request.permission - 权限类型 (仅 Android) {@since 8.0}
     *
     * @returns {Promise<object>}
     */
    static openSettings(request) {
        return invoke('Permissions', 'openSettings', request);
    }
}

/**
 * 电话模块: 用于拨打电话及发送短信
 *
 * @since 7.9
 */
class Phone {

    /**
     * 判断是否具有电话功能
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static isPhoneAvailable() {
        return invoke('Phone', 'isPhoneAvailable');
    }

    /**
     * 拨打电话
     *
     * @param {object} request
     * @param {string} request.phoneNumber - 电话号码 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static dial(request) {
        return invoke('Phone', 'dial', request);
    }

    /**
     * 发送短信
     *
     * @param {object} request
     * @param {string} request.phoneNumber - 电话号码 {@since 7.9}
     * @param {string} request.body - 短信内容 {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static sendMessage(request) {
        return invoke('Phone', 'sendMessage', request);
    }
}

/**
 * 用于页面跳转
 *
 * @since 7.9
 */
class Router {

    /**
     * 使用 DeepLink 打开页面. 注意: 该方法在 iOS/Android 上存在差异, 需要分别调用.
     *
     * @param {object} request
     * @param {string} request.deepLink - DeepLink 地址 {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static openDeepLink(request) {
        return invoke('Router', 'openDeepLink', request);
    }

    /**
     * 打开 H5 页面
     *
     * @param {object} request
     * @param {string} request.url - 页面地址 {@since 7.9}
     * @param {boolean} request.requestResult - 是否需要返回结果 {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static openH5(request) {
        return invoke('Router', 'openH5', request);
    }

    /**
     * 打开 RN 页面
     *
     * @param {object} request
     * @param {string} request.id - 包 Id {@since 7.9}
     * @param {string} request.extras - 启动参数 (Json 格式) {@since 7.9}
     * @param {boolean} request.requestResult - 是否需要返回结果 {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static openReact(request) {
        return invoke('Router', 'openReact', request);
    }
}

/**
 * 社交模块: 目前主要用于三方分享
 *
 * @since 7.9
 */
class Social {

    /**
     * 获取应用配置. 注意: 该方法在 iOS/Android 上存在差异, 需要分别调用.
     *
     * @param {object} request
     * @param {string[]} request.filters - 指定的分享类型 (可选值包括: 'weibo', ’weixin’, ’pengyouquan’, ’qq’, ’qqweibo’, ’qzone’, ’email’, ’message’) {@since 7.9}
     * @param {string} request.title - 标题 {@since 7.9}
     * @param {string} request.image - 图片地址 {@since 7.9}
     * @param {string} request.url - 链接地址 {@since 7.9}
     * @param {string} request.desc - 描述信息 {@since 7.9}
     * @param {string} request.extras - 扩展字段 (Json 格式) {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static share(request) {
        return invoke('Social', 'share', request);
    }
}

/**
 * 用于控制启动页面
 *
 * @since 7.9
 */
class SplashScreen {

    /**
     * 阻止启动页面自动关闭
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static preventAutoHide() {
        return invoke('SplashScreen', 'preventAutoHide');
    }

    /**
     * 关闭启动页面
     *
     * @returns {Promise<object>}
     */
    static hide() {
        return invoke('SplashScreen', 'hide');
    }
}

/**
 * 状态栏模块: 提供或者修改应用的状态栏信息
 *
 * @since 8.1
 */
class StatusBar {

    /**
     * 获取状态栏高度
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getHeight() {
        return invoke('StatusBar', 'getHeight');
    }

    /**
     * 设置状态栏模式（light是白,dark是黑,default默认为黑色）
     *
     * @param {object} request
     * @param {string} request.mode - 状态栏字体的颜色 {@since 8.1}
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static setStatusBarMode(request) {
        return invoke('StatusBar', 'setStatusBarMode', request);
    }
}

/**
 * 顶部导航栏模块:提供或者修改应用的导航栏信息
 *
 * @since 8.1
 */
class TitleBar {

    /**
     * 获取导航栏高度(加状态栏的高度)
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getHeight() {
        return invoke('TitleBar', 'getHeight');
    }
}

/**
 * 用于弹出消息提示
 *
 * @since 7.9
 */
class Toast {

    /**
     * 弹出消息提示
     *
     * @param {object} request
     * @param {string} request.text - 文本内容
     *
     * @returns {Promise<object>}
     */
    static show(request) {
        return invoke('Toast', 'show', request);
    }
}

/**
 * 埋点模块
 *
 * @since 7.9
 */
class Tracker {

    /**
     * 获取当前状态
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getCurrentState() {
        return invoke('Tracker', 'getCurrentState');
    }

    /**
     * 事件埋点
     *
     * @param {object} request
     * @param {string} request.name - 事件名称 {@since 7.9}
     * @param {string} request.type - 事件类型 ('click', 'slide', 'enter') {@since 7.9}
     * @param {string} request.params - 扩展信息 (Json 格式) {@since 7.9}
     *
     * @returns {Promise<object>}
     */
    static trackEvent(request) {
        return invoke('Tracker', 'trackEvent', request);
    }

    /**
     * 页面埋点
     *
     * @param {object} request
     * @param {string} request.pageName - 页面名称 {@since 8.1}
     *
     * @returns {Promise<object>}
     */
    static trackPage(request) {
        return invoke('Tracker', 'trackPage', request);
    }
}

/**
 * 交易模块: 用于获取交易信息
 *
 * @since 7.9
 */
class Trade {

    /**
     * 跳转交易登录
     *
     * @param {object} request
     * @param {string} request.funcId - 资金账号 {@since 7.9}
     * @param {string} request.module - 登录模块, 不传默认为沪深登录 (hs: 沪深; credit: 两融; option: 期权; hk: 港股; usa: 美股) {@since 7.9}
     * @param {boolean} request.force - 用户处于已登录状态时, 强制唤起登录页面 {@since 7.9}
     * @param {boolean} request.noPassword - 使用免密登录 {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static requestLogin(request) {
        return invoke('Trade', 'requestLogin', request);
    }

    /**
     * 获取交易账号信息
     *
     * @param {object} request
     * @param {string} request.module - 登录模块, 不传默认为沪深登录 (hs: 沪深; credit: 两融; option: 期权; hk: 港股; usa: 美股) {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getAccountInfo(request) {
        return invoke('Trade', 'getAccountInfo', request);
    }

    /**
     * 获取交易全局配置
     *
     * @param {object} request
     * @param {string} request.module - 模块, 不传默认为沪深 (hs: 沪深; hk: 港美股;) {@since 7.9}
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getGlobalConfiguration(request) {
        return invoke('Trade', 'getGlobalConfiguration', request);
    }

    /**
     * 获取交易相关的服务器地址
     *
     * @returns {Promise<object>}
     *
     * @since 7.9
     */
    static getServerList() {
        return invoke('Trade', 'getServerList');
    }

    /**
     * 获取最近的交易登录用户信息
     *
     * @returns {Promise<object>}
     *
     * @since 8.1
     */
    static getHistoryTradeAccountInfos() {
        return invoke('Trade', 'getHistoryTradeAccountInfos');
    }
}

const modules = {};
modules.invoke = invoke;
modules.Calendar = Calendar;
modules.CFH = CFH;
modules.Configuration = Configuration;
modules.Container = Container;
modules.Crypto = Crypto;
modules.Font = Font;
modules.Kibana = Kibana;
modules.LocalStorage = LocalStorage;
modules.Logger = Logger;
modules.Passport = Passport;
modules.PayCounter = PayCounter;
modules.Permissions = Permissions;
modules.Phone = Phone;
modules.Router = Router;
modules.Social = Social;
modules.SplashScreen = SplashScreen;
modules.StatusBar = StatusBar;
modules.TitleBar = TitleBar;
modules.Toast = Toast;
modules.Tracker = Tracker;
modules.Trade = Trade;

module.exports = modules;
