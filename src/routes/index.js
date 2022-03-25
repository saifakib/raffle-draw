const router = require('express').Router()

router.get('/', (_, res) => {
    const obj = {
        developer: "Saif"
    }
    res.status(200).send(obj)
})

module.exports = router;