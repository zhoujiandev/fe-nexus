import React, {useEffect,useState} from "react";
import {isNil, isArray, isObject, isString, isEmpty, uniqBy, isPlainObject, forEach} from "lodash";
import moment from "moment/moment";
import axios from "axios";
import {ServerDateTime} from "@/services";

/**
 * 作用：捷输入antd message的类型，防止写错
 */
export const antdMessageTypeEnum = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
    LOADING: "loading",
};

export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";


/**
 * 判断是否是合法的身份证
 */
export const isIdNumber = (str) => {
    const reg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
    return reg.test(str)
}


/**
 * 判断是否是合法的护照
 */
export const isPassport = (str) => {
    const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/; // 护照（包括香港和澳门）
    return reg.test(str)
}


/**
 * 判断是否是合法的手机号
 */
export const isPhoneNumberReg = (str) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    return reg.test(str)
};

/**
 * 判断是否是合法的座机号
 */
export const isFixedPhoneReg = (str) => {
    const reg = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
    return reg.test(str)
};

/**
 * 用来判断是否是合法的中文汉字
 */
export const isChineseCharacter = (str) => {
    const reg = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
    return reg.test(str)
}

/**
 * 作用：判断是否是合法的邮编
 */
export const isPostalCode = str => {
    const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
    return reg.test(str)
}

/**
 * 作用：判断是否是合法的url地址
 */
export const isURL = (url) => {
    const reg =
        /^https?:\/\/((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?$/;
    return reg.test(url);
};

/**
 * 作用：判断本地存储的值是否为空
 */
export const isStorageFieldEmpty = (val) =>
    isValueEmpty(val) || val === "undefined" || val === "null";

/**
 * 作用：判断一个字段的值是否为空
 */
export const isValueEmpty = (val) =>
    isNil(val) || (isString(val) && val.trim() === "");


/**
 * 作用： 判断目标是否是数组并且长度大于0
 */
export const isArrayLoopNeeded = (target) => isArray(target) && target.length > 0;

/**
 * 作用：判断是否是非空数组
 */
export const isPlainObjectNotEmpty = (val) => isPlainObject(val) && !isEmpty(val);

/**
 * 作用：通过code判断请求是否成功
 */
export const isNumber0 = (number) => number === 0;

/**
 * 作用：通过statusCode判断restful请求是否成功
 */
export const isNumber200 = (number) => number === 200;

/**
 * 作用： 优先当前服务器的时间，没有就使用本地时间
 */
export const getServeTime = () => {
    let timeStamp = ServerDateTime.now;
    if (isNil(timeStamp)) {
        timeStamp = moment().valueOf();
    }
    return timeStamp;
};

/**
 * 计算字符串的长度：中文汉字计两个字符，英文字符计一个字符
 */
export const getStrUnitLength = (value) => {
    let ret = 0;
    const str = value || "";
    const len = str.length;
    for (let i = 0; i < len; i++) {
        if (isChineseCharacter(str[i])) {
            ret += 2;
        } else {
            ret += 1;
        }
    }
    return ret;
};

/**
 * 作用：根据身份证号得到出生日期
 */
export const getBirthDateFromIDNumber = (idCard) => {
    if (isValueEmpty(idCard) || !isString(idCard)) return null;
    // 使用正则表达式匹配身份证号中的出生年月日部分
    const match = idCard.match(/^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/);

    if (!match) return null;

    // 提取年、月、日
    const year = match[2];
    const month = match[3];
    const day = match[4];
    return year + "-" + month + "-" + day;
};

/**
 * 根据身份证计算年龄，今天没满的不算
 */
export const getAgeFromIDCard = (idCardNumber) => {
    if (isValueEmpty(idCardNumber)) {
        return "";
    }
    return moment(getServeTime()).diff(
        handleMoment(getBirthDateFromIDNumber(idCardNumber), DATE_FORMAT),
        "years",
    );
};

/**
 * 筛选表单中关于日期的初始值
 */
export const getDateFormItemInitialValue = (data) => {
    let ret = data;
    // RangePicker
    if (isArray(data) && data.length === 2) {
        ret = [moment(ret[0]), moment(ret[1])];
    }
    // DatePicker
    else if (!isArray(data) && !isValueEmpty(data)) {
        ret = moment(data);
    }
    return ret;
};

/**
 * 作用：校验合法性
 *      防止moment(undefined)会取now,
 *      防止moment(-1)取1970-01-01
 */
export const handleMoment = (timeStamp, format) => {
    if (isValueEmpty(timeStamp) || timeStamp <= 0) {
        return "";
    }
    const m = moment(timeStamp);
    if (m.isValid() && !isValueEmpty(format)) {
        return m.format(format);
    }
    if (m.isValid() && isValueEmpty(format)) {
        return m;
    }
    return "";
};

export const findItem = (options, compareFn, getFn = (item) => item.value) => {
    let ret = "";
    const one = options.find((item) => compareFn(item));
    if (!isNil(one)) {
        ret = getFn(one);
    }
    return ret;
};

/**
 * 作用：去重
 * 注意事项，map函数返回的对象要包含id字段
 */
export const handleRemoteOptions = (arr, map = (item) => item) => uniqBy(arr.map(map), 'id');

/**
 * 如果props中包含propType字段，替换成type prop（因为prop type 和 元素type重名了）
 */
export const generateReactElementByJS = (items) => {
    const func = (items) => {
        if (isEmpty(items)) {
            return null;
        }
        // 传的数组
        if (isArray(items)) {
            return items.map(func);
        }
        // 传的对象
        else if (isObject(items) && !isNil(items)) {
            const {type, children, ...props} = items;
            if (props.hasOwnProperty("propType")) {
                props.type = props.propType;
                delete props.propType;
            }
            //  子元素有一个或多个
            if (isArray(children)) {
                return React.createElement(type, props || {}, ...func(children));
            }
            // 子元素只有一个
            else if (isObject(children) && !isNil(children)) {
                return React.createElement(type, props || {}, func(children));
            }
            // 子元素是文本
            else if (isString(children) && children !== "") {
                return React.createElement(type, props || {}, children);
            }
            // 没有子元素
            else return React.createElement(type, props);
        }
        // 传的其它值
        else return null;
    };
    return func(items);
};


/**
 * 作用：设置表格stripe效果
 */
export const stripedRowClassName = (record, index) => {
    return index % 2 === 0 ? "antd-diy-odd-row-class" : "";
};


/**
 * 作用：防止报错
 */
export const safeJSONParse = (str) => {
    try {
        let ret = str;
        if (!isString(str)) {
            return ret;
        }
        ret = JSON.parse(str);
        return ret;
    } catch (err) {
        return str;
    }
};

/**
 * 作用：根据对象生成路由参数
 */
export const stringifyRouteParams = (obj) => {
    // str = date='ab'& name='Tom'
    const arr = [];
    forEach(obj, (value, key) => {
        if (!isValueEmpty(value)) {
            arr.push(`${key}=${value}`);
        }
    });
    return arr.join("&");
};

/**
 * 用法：根据路由参数字符串，得到路由参数的对象
 */
export const parseRouteParams = (url) => {
    const params = {};
    const arr = url.split("?");
    if (arr.length < 2) {
        return {};
    }
    const pairs = arr[1].split("&");
    if (!isArrayLoopNeeded(pairs)) {
        return {};
    }
    pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });
    return params;
};


/**
 * avoid race conditions
 */
export function useData(config) {
    const [data, setData] = useState(null);
    useEffect(() => {
        let ignore = false;
        axios(config)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setData(json);
                }
            });
        return () => {
            ignore = true;
        };
    }, [url]);
    return data;
}

export const debounce = (func,wait=0)=>{
    let timerId = null;
    return function(...args){
        if(timerId){
            clearTimeout(timerId)
        }
        timerId =  setTimeout(()=>func.apply(this,args),wait)
    }
}

export  const throttle = (func,wait=0)=>{
    let canRun = true;
    return function(...args){
        if(canRun){
            func.apply(this,args);
            canRun = false;
        }
        setTimeout(()=>{
            canRun = true;
        },wait)
    }
}

