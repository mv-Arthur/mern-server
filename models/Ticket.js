import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    ticketClass: {
      type: String,
      required: true,
      unique: false,
    },
    place: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeIn: {
      type: String,
      required: true,
    },
    timeOut: {
      type: String,
      required: true,
    },
    flight: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ticket", TicketSchema);
