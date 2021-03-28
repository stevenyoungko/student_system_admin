import moment from 'moment'
/**
 * 所有表單驗證等正規式 都放在這裡維護
 */

// 判斷數字
function isNaN_rule_handle(rule, value, cb) {
  if (value === null || value === '') {
    return cb()
  }
  if (isNaN(parseInt(value, 10))) {
    return cb(new Error('格式錯誤'))
  }
  return cb()
}

// 快捷時間元件專用
function quickRangeTimerRequire(rule, value, callback) {
  const start = moment(value[0])
  const end = moment(value[1])
  // 是否必填
  if (rule.required && (value[0] === '' || value[1] === '')) {
    callback(new Error('請輸入時間區間'))
  } else if (end.diff(start, 'days') > 60) {
    // 时间区间 目前两个月(60天)
    callback(new Error('時間區間不得超過 60 天'))
  } else {
    callback()
  }
}

// 除了負數
function positiveNum(rule, value, callback) {
  if (/^[0-9][0-9]*(.[0-9]*[1-9]+)?$/.test(value)) return callback()
  return callback(new Error('格式錯誤'))
}

// 僅可為正整數或 0，不可有小數、不可為負數
function positiveInt(rule, value, callback) {
  if (/^[0-9]+$/.test(value)) return callback()
  return callback(new Error('格式錯誤'))
}

// 所有整數: 包含負整數、正整數、零(不可有小數)
function integer(rule, value, callback) {
  if (/^-{0,1}\d+$/.test(value)) return callback()
  return callback(new Error('格式錯誤'))
}

// 驗證規則
export const rules = {
  required_rule: { required: true, message: ' ', trigger: 'blur' },
  isNaN_rule: { trigger: 'blur', validator: isNaN_rule_handle },
  quickRange_rule: { trigger: 'blur', validator: quickRangeTimerRequire },
  positiveNum_rule: { trigger: 'blur', validator: positiveNum },
  positiveInt_rule: { trigger: 'blur', validator: positiveInt },
  integer_rule: { trigger: 'blur', validator: integer }
}

/**
 * 一般密碼
 * 长度：6~20
 * 限制符号：半形、英文、数字（不含空白）
 * @param {string} password
 * @returns {Boolean}
 */
export function validateNormalPassword(password) {
  if (/\s/g.test(password)) {
    return false
  }
  return /^[A-Za-z\d]{6,20}$/.test(password)
}

/**
 * 帳號
 * 长度：6~20
 * 限制符号：半形、英文、数字、底线（不含空白）
 * @param {string} account
 * @returns {Boolean}
 */
export function validateAccount(account) {
  if (/\s/g.test(account)) {
    return false
  }
  return /^[A-Za-z\d_]{6,20}$/.test(account)
}
