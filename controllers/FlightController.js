import FlightModel from "../models/Ticket.js";

export class FlightController {
  static async getAll(req, res) {
    try {
      const flights = await TicketModel.find().populate("ticket").exec();
      res.json(flights);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "не удалось получить рейсы",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const fligthId = req.params.id;
      const flight = await TicketModel.findById(fligthId);
      if (!flight) {
        return res.status(404).json({
          message: "не удалось найти рейс",
        });
      }
      res.status(200).json(flight);
    } catch (err) {
      res.status(500).json({
        message: "не удалось вернуть билет",
      });
    }
  }

  static async remove(req, res) {
    try {
      const fligthId = req.params.id;

      const fligth = await TicketModel.findOneAndDelete({
        _id: fligthId,
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
      const doc = new FlightModel({
        departureDate: req.body.departureDate,
        departureTime: req.body.departureTime,
        аrrivalDate: req.body.аrrivalDate,
        аrrivalTime: req.body.аrrivalTime,
        placeQtyAll: req.body.placeQtyAll,
        placeQtyFree: req.body.placeQtyFree,
        ticket: req.body,
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
