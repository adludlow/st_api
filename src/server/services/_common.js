import { isUndefined, omitBy } from 'lodash'

export const omitUndefined = (data) =>
  omitBy(data, isUndefined)
