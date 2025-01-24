const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {

    email :String,
    file: String,
    contact : String,
    name : String,

  },
  { collection: "PdfDetails" }
);

mongoose.model("PdfDetails", PdfDetailsSchema);