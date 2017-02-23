function Humanize(date) {
    this.delta = Math.round((+new Date - date) / 1000);
    this.fuzzy = null;
    this.date = date;
    this.minute = 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;
    this.week = this.day * 7;
}

Humanize.prototype.humanizeDate = function() {
    if (this.delta < 30) {
        this.fuzzy = 'just now.';
    } else if (this.delta < this.minute) {
        this.fuzzy = this.delta + ' seconds ago';
    } else if (this.delta < 2 * this.minute) {
        this.fuzzy = 'a minute ago.';
    } else if (this.delta < this.hour) {
        this.fuzzy = Math.floor(this.delta / this.minute) + ' minutes ago';
    } else if (Math.floor(this.delta / this.hour) === 1) {
        this.fuzzy = '1 hour ago.';
    } else if (this.delta < this.day) {
        this.fuzzy = Math.floor(this.delta / this.hour) + ' hours ago';
    } else if (this.delta < this.day * 2) {
        this.fuzzy = 'yesterday';
    } else {
        this.fuzzy = this.formatDate();
    }

    return this.fuzzy;
};

Humanize.prototype.months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

Humanize.prototype.formatDate = function() {
    var day = this.date.getDate();
    var monthIndex = this.date.getMonth();
    var year = this.date.getFullYear();
    return day + ' ' + this.months[monthIndex] + ' ' + year;
};

module.exports = {
    Humanize: Humanize
};