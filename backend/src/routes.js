const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("./config/multer")

const Post = require("./models/Post")

routes.get("/posts", async (req, res) => {
  const get = await Post.find()
  return res.json(get)
} )

routes.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  return res.json(post)
})

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file
  const post = await Post.create({
    name,
    size,
    key,
    url
  })

  return res.json(post)
})

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  await post.delete()

  return res.json({msg: "File is deleted!"})
})

module.exports = routes