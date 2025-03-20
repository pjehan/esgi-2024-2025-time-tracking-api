function sendNotFound(res) {
  res.status(404).send();
}

function sendForbidden(res) {
  res.status(403).send();
}

function sendBadRequest(res) {
  res.status(400).json({ message: 'invalid id' });
}

function sendOk(req, res, result) {
  switch (req.method) {
    case 'POST':
      res.status(201).json(result);
      break;
    case 'GET':
    case 'PUT':
      res.json(result);
      break;
    case 'DELETE':
      res.send({ message: 'Ressource deleted successfully' });
      break;
  }
}

export async function endpoint(req, res, fn, checkIsForbidden) {
  try {
    const result = await fn();
    if (result === null) {
      sendNotFound(res);
    } else if (checkIsForbidden && checkIsForbidden(result)) {//!Array.isArray(result) && result.user === undefined || !result.user.equals(req.user._id)) {
      sendForbidden(res);
    } else {
      sendOk(req, res, result);
    }
  } catch (error) {
    console.log(error);
    sendBadRequest(res);
  }
}
