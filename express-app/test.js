const stringifyDate = (date) => {
  const dateNow = Date.now()
  const diff = Math.floor((dateNow - date) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  else if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    const unit = (minutes > 1 ? "minutes" : "minute")
    return `${minutes} ${unit} ago`
  }
  else if (diff < 86400) {
    const hours = Math.floor((diff / 60) / 60)
    const unit = (hours > 1 ? "hours" : "hour")
    return `${hours} ${unit} ago`
  }
  else if (diff < 604800) {
    const days = Math.floor(((diff / 60) / 60) / 24)
    const unit = (days > 1 ? "days" : "day")
    return `${days} ${unit} ago`
  }
  else {
    return date.format("dddd, MMMM Do YYYY, h:mm:ss a")
  } 
}

console.log(stringifyDate(new Date("09/05/2000")))
