/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require("moment");
const corn = require("node-cron");

module.exports = {
  list: async (req, res) => {
    try {
      const user_id = req.user.email;
      const test = await Articles.find({ user_id });
      const doing = "DOING";
      const done = "DONE";
      const nothing = "END";

      test.map((t) => {
        const current = new Date();
        t.status = corn.schedule(
          "*/1 * * * *",
          () => {
            if (moment(current).format("LT") === t.due_date) {
              t.status.stop();
              console.log(done);
            } else if (moment(current).format("LT") < t.due_date) {
              // t.status.start();
              console.log(doing);
            } else {
              t.status.stop();
              console.log(nothing);
            }
          },
          { scheduled: true, timezone: "Asia/Ho_Chi_Minh" }
        );
        if (moment(current).format("LT") === t.due_date) {
          t.status = done;
        } else if (moment(current).format("LT") < t.due_date) {
          t.status = doing;
        } else {
          t.status.stop();
          t.status = nothing;
        }
      });
      // res.send("started");

      // const testUserId = Articles.find({}).exec((err, articles) => {
      //   console.log(articles);
      //   if (err) {
      //     res.send(500, { error: "Database Error" });
      //   }
      //   // res.view("articles/articles", { articles: articles });
      //   res.json(articles);
      // });

      res.status(200).json(test);
    } catch (err) {
      console.log(err);
    }
  },
  add: async (req, res) => {
    try {
      const title = req.body.title;
      const body = req.body.body;
      const due_date = req.body.due_date;
      const user_id = req.user.email;
      let status = "";
      if (!due_date) {
        status = "";
      }
      Articles.create({
        title: title,
        body: body,
        user_id: user_id,
        due_date: due_date,
        status: status,
      }).exec((err) => {
        if (err) {
          res.send(500, { err: err });
        }
        res.json({
          title: title,
          body: body,
          user_id: user_id,
          due_date: due_date,
          status: status,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  edit: (req, res) => {
    Articles.find({ _id: req.params.id }).exec((err, articles) => {
      if (err) {
        res.send(500, { err: "something went wrong" });
      }
      res.view("articles/edit", { articles: articles });
    });
  },
  delete: (req, res) => {
    try {
      Articles.destroy({ id: req.params.id }).exec((err) => {
        if (err) {
          res.send(500, { err: err });
        }
        res.send("success");
      });
    } catch (err) {
      res.send("Error deleted");
    }
  },
  update: (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const due_date = req.body.due_date;
    Articles.update(
      { id: req.params.id },
      { title: title, body: body, due_date: due_date }
    ).exec((err, articles) => {
      if (err) {
        res.send(500, { err: err });
      }
      res.json({ title: title, body: body, due_date: due_date });
    });
  },
};
