var express = require('express')
var router = express.Router()

const token = require('../middleware/getUserIdByToken');

var db = require("../models");

router.post('/reddit/post', async (req, res) => {
    const Reddit = await db.Reddit.create({
        include: {
            model: db.User,
            attributes: ["username", "id"],
        },
        title: req.body.title,
        content: req.body.content,
        userId: token.getUserIdByToken(req),
        postType: 'reddit'
      });
      res.status(200).json({ data: Reddit })
      .catch(error => res.status(500).json({ error }))
});

router.get('/reddit', async (req, res) => {
    const Reddit = await db.Reddit.findAll({
        include: {
            model: db.User,
            attributes: ["username"],
          },
        order: [["createdAt", "DESC"]],
       })
       console.log(req.headers)
       res.status(200).json({ data: Reddit })
       return Reddit;
});

router.get('/reddit/:id', async (req, res) => {
    const Reddit = await db.Reddit.findOne({ where: { id: req.params.id },
        include: 
          [{
            model: db.User,
            attributes: ["id", "username"],
          },
        {
            model: db.Comment,
            attributes: ["id", "content", "createdAt", "updatedAt"]
        }]
      })
    .then(reddit => {
        if(!reddit) {
            console.log(req.params.id)
            return res.status(404).json({ error: 'Publication inconnue !'})
          } else {
           console.log(req.params.id)
          res.status(200).json({ data: reddit })
          return reddit;
          }
    })
});

router.put('/reddit/:id', async (req, res) => {
  await db.Reddit.update(req.body, {
    where: { id: req.params.id }
  });
  const reddit = await db.Reddit.findByPk(req.params.id, {
    attributes: [
      "title",
      "content",
    ]
  })
        res.status(200).json({ data: reddit });
        console.log(reddit)
        return reddit;
  })

  router.put('/reddit/report/:id', async (req, res) => {
    await db.Reddit.findOne({ where: { id: req.params.id }})
      .then(reddit => {
        if(!reddit) {
            console.log(req.params.id)
            return res.status(404).json({ error: 'Publication inconnue !'})
          } else {
          db.Reddit.update( { isFlag: true }, { where: { id: req.params.id }})
          res.status(200).json({ data: reddit })
          return reddit;
          }
  })
})

  router.delete('/reddit/:id', async (req, res) => {
    await db.Reddit.destroy({ where: { id: req.params.id}
    })
    .then(reddit => {
      if(!reddit) {
        return res.status(404).json({ error: 'Publication inconnue !'})
      } else {
      res.status(200).json({ success : true })
  }
  })
})

  router.get('/reddit/byUser/:id', async (req, res) => {
    const reddit = await db.Reddit.findAll({
      where: { userId : req.params.id },
      order: [["createdAt", "DESC"]],
    })
        res.status(200).json({ data: reddit });
        return reddit;
  })

router.post('/gag/post', async (req, res) => {
    const Gag = await db.Gag.create({
        include: {
            model: db.User,
            attributes: ["username", "id"],
        },
        title: req.body.title,
        content: req.body.content,
        userId: token.getUserIdByToken(req),
        postType: 'gag'
      });
      res.status(200).json({ data: Gag })
      .catch(error => res.status(500).json({ error }))
      return Gag;
});

router.get('/gag', async (req, res) => {
    const Gag = await db.Gag.findAll({
        include: {
            model: db.User,
            attributes: ["username"],
          },
        order: [["createdAt", "DESC"]],
       })
    //    console.log(Gag)
       res.status(200).json({ data: Gag })
       return Gag;
});

router.get('/gag/byUser/:id', async (req, res) => {
  const gag = await db.Gag.findAll({
    where: { userId : req.params.id },
    order: [["createdAt", "DESC"]],
  })
      res.status(200).json({ data: gag });
      return gag;
})

router.put('/gag/:id', async (req, res) => {
  await db.Gag.update(req.body, {
    where: { id: req.params.id }
  });
  const gag = await db.Gag.findByPk(req.params.id, {
    attributes: [
      "title",
      "content",
    ]
  })
        res.status(200).json({ data: gag });
        console.log(gag)
        return gag;
  })

  router.put('/gag/report/:id', async (req, res) => {
    await db.Gag.findOne({ where: { id: req.params.id }})
      .then(gag => {
        if(!gag) {
            console.log(req.params.id)
            return res.status(404).json({ error: 'Publication inconnue !'})
          } else {
          db.Gag.update( { isFlag: true }, { where: { id: req.params.id }})
          res.status(200).json({ data: gag })
          return gag;
          }
    })
})


router.delete('/gag/:id', async (req, res) => {
  await db.Gag.destroy({ where: { id: req.params.id}
  })
  .then(gag => {
    if(!gag) {
      return res.status(404).json({ error: 'Publication inconnue !'})
    } else {
    res.status(200).json({ success : true })
    }
  })
})

router.get('/gag/:id', async (req, res) => {
    const Gag = await db.Gag.findOne({ where: { id: req.params.id },
        include: 
          {
            model: db.User,
            attributes: ["id", "username"],
          },
      })
    .then(gag => {
        if(!gag) {
            console.log(req.params.id)
            return res.status(404).json({ error: 'Publication inconnue !'})
          } else {
           console.log(req.params.id)
          res.status(200).json({ data: gag })
          return gag;
          }
    })
});

router.get('/flaggedGags', async (req, res) => {
  const Gag = await db.Gag.findAll({ where: { isFlag : 1 },
    include: {
      model: db.User,
      attributes: ["username"],
    },
  order: [["createdAt", "DESC"]],
 })
 res.status(200).json({ Gag })
 return Gag;
})

router.get('/flaggedReddits', async (req, res) => {
  const Reddit = await db.Reddit.findAll({ where: { isFlag : 1 },
    include: {
      model: db.User,
      attributes: ["username"],
    },
    order: [["createdAt", "DESC"]],
    })
    res.status(200).json({ Reddit })
    return Reddit;
})
 


module.exports = router;



