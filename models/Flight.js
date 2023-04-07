import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema(
  {
    departureDate: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },

    аrrivalDate: {
      type: String,
      required: true,
    },
    аrrivalTime: {
      type: Boolean,
      required: true,
      default: false,
    },
    placeQtyAll: {
      type: Number,
      required: true,
      default: 180,
    },
    placeQtyFree: {
      type: Number,
      required: true,
      default: 180,
    },
    ticket: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Flight", FlightSchema);
