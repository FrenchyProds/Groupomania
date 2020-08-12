var db = require("../models");
var asyncHandler = require('../middleware/asyncHandler')


exports.moderateReddit = async (req, res) => {
    await db.Reddit.update( req.body, {
      where: { id: req.params.id }
    });
    const reddit = await db.Reddit.findByPk(req.params.id, {
      attributes: [
        "title",
        "content",
      ]
    })
    await db.Reddit.update({ isFlag: false}, { where: { id: req.params.id }})
    await db.Reddit.update({ hasBeenModerated: true}, { where: { id: req.params.id }})
    res.status(200).json({ data: reddit });
    console.log(reddit)
    return reddit;
};

exports.moderateGag = async (req, res) => {
    await db.Gag.update(req.body, {
        where: { id: req.params.id }
    });
    const gag = await db.Gag.findByPk(req.params.id, {
        attributes: [
        "title",
        "content",
        ]
    })
    await db.Gag.update({ isFlag: false }, { where: { id: req.params.id}})
    await db.Gag.update({ hasBeenModerated: true}, { where: { id: req.params.id }})
    res.status(200).json({ data: gag });
    console.log(gag)
    return gag;
};

exports.adminDeleteReddit = async (req, res) => {
    await db.Reddit.destroy({ where: { id: req.params.id }})
    .then(reddit => {
    if(!reddit) {
      return res.status(404).json({ error: 'Reddit inconnu !'})
    } else {
    res.status(200).json({ success : true })
        }
    })
};

exports.adminDeleteGag = async (req, res) => {
    await db.Gag.destroy({ where: { id: req.params.id }})
    .then(gag => {
    if(!gag) {
      return res.status(404).json({ error: 'Gag inconnu !'})
    } else {
    res.status(200).json({ success : true })
        }
    })
};

exports.moderateUser = async (req, res) => {
    await db.User.update(req.body, {
      where: { id: req.params.id }
    });
    const user = await db.User.findByPk(req.params.id, {
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "username",
        "avatar",
        "department",
      ]
    });
    await db.User.update( { isFlag: false}, { where: { id: req.params.id }})
    await db.User.update( { hasBeenModerated: true}, { where: { id: req.params.id }})
    res.status(200).json({ data: user });
    return user;
  };

  exports.adminDeleteUser = async (req, res) => {
    await db.User.destroy( {
      where : { id : req.params.id }
    }).then(user => {
      if(!user) {
        return res.status(404).json({ error: 'Utilisateur inconnu !'})
      } else {
      res.status(200).json({ success : true })
        }
    })
};

exports.adminDeleteRedditComment = async (req, res) => {
    await db.Comment.destroy({ where: { redditId: req.params.id, id: req.params.commentId }
    })
    .then(comment => {
      if(!comment) {
        return res.status(404).json({ error: 'Commentaire inconnu !'})
      } else {
      res.status(200).json({ success : true })
  }
  })
}

exports.adminDeleteGagComment = async (req, res) => {
    await db.Comment.destroy({ where: { gagId: req.params.id, id: req.params.commentId }
    })
    .then(comment => {
      if(!comment) {
        return res.status(404).json({ error: 'Commentaire inconnu !'})
      } else {
      res.status(200).json({ success : true })
  }
  })
}


