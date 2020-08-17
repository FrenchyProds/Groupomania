var db = require("../models");
var asyncHandler = require('../middleware/asyncHandler')


exports.moderatedReddits = async (req, res) => {
  await db.Reddit.findAll({ where: { hasBeenModerated: true },
    include: {
      model: db.User,
      attributes: ["username", "id"],
    }, order: [["createdAt", "DESC"]],})
  .then(reddit => {
    if(!reddit) {
      return res.status(404).json({ error: 'Aucune publication trouvée !'})
    } else {
    res.status(200).json({ reddit })
    return reddit;
    }
  })
}

exports.moderatedGags = async (req, res) => {
  await db.Gag.findAll({ where: { hasBeenModerated: true },
    include: {
      model: db.User,
      attributes: ["username", "id"],
    }, order: [["createdAt", "DESC"]],})
  .then(gag => {
    if(!gag) {
      return res.status(404).json({ error: 'Aucune publication trouvée !'})
    } else {
    res.status(200).json({ gag })
    return gag;
    }
  })
}

exports.moderatedUsers = async (req, res) => {
  await db.User.findAll({ where: { hasBeenModerated: true }})
  .then(user => {
    if(!user) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvée !'})
    } else {
    res.status(200).json({ user })
    return user;
    }
  })
}

exports.moderatedComments = async (req, res) => {
  await db.Comment.findAll({ where: { hasBeenModerated: true },
    include: {
      model: db.User,
      attributes: ["username"],
    },
    order: [["createdAt", "DESC"]],})
  .then(comment => {
    if(!comment) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvée !'})
    } else {
    res.status(200).json({ comment })
    return comment;
    }
  })
}

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
    return gag;
};

exports.removeRedditFlag = async (req, res) => {
  await db.Reddit.findOne({ where: { id: req.params.id}})
  .then(reddit => {
    if(!reddit) {
        return res.status(404).json({ error: 'Reddit inconnu !'})
      } else {
  db.Reddit.update({ isFlag: false}, { where: { id: req.params.id}})
  res.status(200).json({ data: reddit })
    }
  })
}

exports.removeGagFlag = async (req, res) => {
  await db.Gag.findOne({ where: { id: req.params.id}});
  await db.Gag.update({ isFlag: false}, { where: { id: req.params.id}})
  res.status(200).json({ success: true })
}

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

exports.unflagUser = async (req, res) => {
  await db.User.findOne({ where: { id: req.params.id }})
  .then(user => {
    if(!user) {
        return res.status(404).json({ error: 'Utilisateur inconnu !'})
      } else {
  db.User.update({ isFlag: false}, { where: { id: req.params.id }})
  res.status(200).json({ data: user })
    }
  })
}

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

exports.removeRedditCommentFlag = async (req, res) => {
  await db.Comment.findOne({ where: { redditId: req.params.id, id: req.params.commentId}})
  .then(comment => {
    if(!comment) {
        return res.status(404).json({ error: 'Commentaire inconnu !'})
      } else {
  db.Comment.update({ isFlag: false}, { where: { redditId: req.params.id, id: req.params.commentId}})
  res.status(200).json({ data: comment })
    }
  })
}

exports.removeGagCommentFlag = async (req, res) => {
  await db.Comment.findOne({ where: { gagId: req.params.id, id: req.params.commentId}})
  .then(comment => {
    if(!comment) {
        return res.status(404).json({ error: 'Commentaire inconnu !'})
      } else {
  db.Comment.update({ isFlag: false}, { where: { gagId: req.params.id, id: req.params.commentId}})
  res.status(200).json({ data: comment })
    }
  })
}

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


