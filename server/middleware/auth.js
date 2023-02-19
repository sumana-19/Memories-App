import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //If >500, then it's Google Auth

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); //gonna give all the data from the token
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub is Google's id name
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
