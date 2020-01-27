export default (req, res) => {
  res.json({
    lastChecked: (new Date()).toISOString(),
    lastUpdated: (new Date()).toISOString(),
  })
}