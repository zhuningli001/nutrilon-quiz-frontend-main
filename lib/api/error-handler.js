/**
 *  @author Jason Watmore
 */
export function errorHandler(err, res) {
  if (typeof err === "string") {
    // custom application error
    const statusCode = err.toLowerCase().endsWith("not found") ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }
  // default to 500 server error
  console.error(err);
  return res.status(500).json({ message: err.message });
}
