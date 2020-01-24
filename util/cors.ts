import Cors from "micro-cors";

const cors = Cors({
  allowedMethods: ["GET", "HEAD"]
});

export default cors;
