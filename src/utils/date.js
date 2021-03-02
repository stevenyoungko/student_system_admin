import moment from 'moment'

export const getFormat = (date, formatStr, useZ) => moment(date).format(formatStr) + ((useZ) ? 'Z' : '')

export const getToday = () => moment().format('YYYY-MM-DD')

export const getYesterday = () => moment().add(-1, 'days').format('YYYY-MM-DD')

export const getTodayRange = () => [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getYesterdayRange = () => [moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getWeek = () => [moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')]

export const getLastWeek = () => [moment().subtract(7, 'days').startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(7, 'days').endOf('week').format('YYYY-MM-DD HH:mm:ss')]

export const getMonth = () => [moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')]

export const getLastMonth = () => [moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss')]

export const getLastTwoWeek = () => [moment().subtract(2, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss')]

export const getNextTwoWeek = () => [moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().add(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss')]

export const getLast14Days = () => [moment().add(-14, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getNext14Days = () => [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().add(13, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getLastYear = () => [moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().subtract(1, 'year').endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getNextYear = () => [moment().add(1, 'year').startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().add(1, 'year').endOf('day').format('YYYY-MM-DD HH:mm:ss')]

export const getDifferentDays = (end, start) => moment(end).diff(moment(start), 'days')

export const isEqualDate = (dateLeft, dateRight) => moment(dateLeft).isSame(dateRight)

export const isEqualDateRange = (dateRangeLeft, dateRangeRight) => moment(dateRangeLeft[0]).isSame(dateRangeRight[0]) && moment(dateRangeLeft[1]).isSame(dateRangeRight[1])
