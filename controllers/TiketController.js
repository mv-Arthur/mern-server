import TicketModel from "../models/Ticket.js";

export class TicketController {
  static async getAll(req, res) {
    try {
      const posts = await TicketModel.find().populate("user").exec();
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "не удалось получить билеты",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await TicketModel.findById(ticketId).populate("user");
      if (!ticket) {
        return res.status(404).json({
          message: "не удалось найти билет",
        });
      }
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({
        message: "не удалось вернуть билет",
      });
    }
  }

  static async remove(req, res) {
    try {
      const ticketId = req.params.id;

      const ticket = await TicketModel.findOneAndDelete({
        _id: ticketId,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "не удалось вернуть билет",
      });
    }
  }

  static async create(req, res) {
    try {
      const doc = new TicketModel({
        ticketClass: req.body.ticketClass,
        price: req.body.price,
        place: req.body.place,
        user: req.userId,
        sold: req.body.sold,
        flight: req.body.flight,
        timeOut: req.body.timeOut,
        timeIn: req.body.timeIn,
      });
      const ticket = await doc.save();

      res.json(ticket);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "не удалось купить билет",
      });
    }
  }

  static async update(req, res) {
    try {
      const ticketId = req.params.id;
      await TicketModel.updateOne(
        {
          _id: ticketId,
        },
        {
          ticketClass: req.body.ticketClass,
          price: req.body.price,
          place: req.body.place,
          sold: req.body.sold,
          user: req.userId,
          flight: req.body.flight,
          timeOut: req.body.timeOut,
          timeIn: req.body.timeIn,
        }
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "не удалось обновить билет",
      });
    }
  }
}
