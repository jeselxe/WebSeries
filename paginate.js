function Paginate (data, perPage) {
	
	if (!data) throw new Error('Required Argument Missing')
	if (!(data instanceof Array)) throw new Error('Invalid Argument Type')

	this.data = data
	this.perPage = perPage || 10
	this.currentPage = 0
	this.totalPages = Math.ceil(this.data.length / this.perPage)
}

Paginate.prototype.offset = function () {
	
	return ((this.currentPage - 1) * this.perPage);
}

Paginate.prototype.page = function (pageNum) {
	
	if (pageNum < 1) pageNum = 1
	if (pageNum > this.totalPages) pageNum = this.totalPages
	
	this.currentPage = pageNum
	
	var start = this.offset()
	  , end = start + this.perPage

	return this.data.slice(start, end);
}
 
Paginate.prototype.hasNext = function () {
	
	return (this.currentPage < this.totalPages)
}

Paginate.prototype.hasPrev = function () {
	
	return (this.currentPage > 1)
}

Paginate.prototype.getLinks = function (req) {
	
	var baseUrl = req.baseUrl + req.url.split('?')[0];
	
	var links = {
		self 	 : req.originalUrl,
		first	 : baseUrl + "?page=" + 1,
		last	 : baseUrl + "?page=" + this.totalPages
	};
	if (this.hasNext())
		links.next = baseUrl + "?page=" + (this.currentPage+1);
	if (this.hasPrev())
		links.prev = baseUrl + "?page=" + (this.currentPage-1);
		
	return links;
}
 
module.exports = Paginate