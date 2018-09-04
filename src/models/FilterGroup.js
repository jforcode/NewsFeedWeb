export default function ({ filterType, filters, totalCount }) {
  this.filterType = filterType
  this.filters = filters
  this.currCount = this.filters.length
  this.totalCount = totalCount
  this.moreAvailable = this.totalCount > this.currCount

  this.addFilter = function (filter) {
    this.filters.push(filter)
    this.currCount++
    // assuming that currCount will always be less than total count
  }

  this.setTotalCount = function (totalCount) {
    this.totalCount = totalCount
    this.moreAvailable = this.totalCount > this.currCount
  }
}
