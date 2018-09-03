export default function ({ filterLabel, filters, totalCount }) {
  this.filterLabel = filterLabel
  this.filters = filters
  this.currCount = this.filters.length
  this.totalCount = totalCount
  this.moreAvailable = this.totalCount > this.currCount
}
