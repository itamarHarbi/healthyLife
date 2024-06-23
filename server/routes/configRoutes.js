const indexR = require("./index");
const usersR = require("./users");
const menusR = require("./menus");
const groupsR = require("./groups");
const chatsR = require("./chats");
const commentsR = require("./comments");
const fitnessR = require("./fitness");
const imagesR = require("./images");
const mailsR = require("./mails");

exports.routesInit = (app) => {
  app.use("/", indexR)
  app.use("/users", usersR)
  app.use("/menus", menusR)
  app.use("/groups", groupsR)
  app.use("/chats", chatsR)
  app.use("/comments", commentsR)
  app.use("/fitness", fitnessR)
  app.use("/images", imagesR)
  app.use("/mails", mailsR)
}