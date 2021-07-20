export function setNoCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  res.setHeader("Expires", date.toUTCString());
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Cache-Control", "public, no-cache");
}

export function setLongTermCache(res) {
  const date = new Date();
  //1 day caching
  date.setDate(date.getDate() + 1);
  res.setHeader("Expires", date.toUTCString());
  //86400 = 60 sec * 60 min * 24 hrs
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");
}
