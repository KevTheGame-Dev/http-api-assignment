
const respondJSON = (request, response, status, object) => {
  
  if(request['headers'].accept === 'application/json'){
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
  }
  else{
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(`<response><message>${object.message}</message><id>${object.id}</id></response>`);
  }
  response.end();
};

const success = (request, response, params) => {
  const responseJSON = {
    message: 'Successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};


const badRequest = (request, response, params) => {
    if(params['valid']){
        
        if(params['valid'] == 'true'){
            const responseJSON = {
                message: 'Request has required parameters',
            };
            respondJSON(request, response, 200, responseJSON);
        }

        else{
            const responseJSON = {
                message: 'Missing valid query parameter set to true',
                id: 'badRequest'
            };
            respondJSON(request, response, 400, responseJSON);
        }
    }
    else{
        const responseJSON = {
            message: 'Missing valid query parameter set to true',
            id: 'badRequest'
        };
        respondJSON(request, response, 400, responseJSON);
    }
};

const unauthorized = (request, response, params) => {
    if(params['loggedIn']){
        
        if(params['loggedIn'] == 'true'){
            const responseJSON = {
                message: 'Request has required parameters',
            };
            respondJSON(request, response, 200, responseJSON);
        }

        else{
            const responseJSON = {
                message: 'Missing loggedIn query parameter set to true',
                id: 'unauthorized'
            };
            respondJSON(request, response, 401, responseJSON);
        }
    }
    else{
        const responseJSON = {
            message: 'Missing loggedIn query parameter set to true',
            id: 'unauthorized'
        };
        respondJSON(request, response, 401, responseJSON);
    }
};

const forbidden = (request, response, params) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden'
  };

  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, params) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internal'
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, params) => {
  const responseJSON = {
    message: 'Requested content has not been created',
    id: 'notImplemented'
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response, params) => {
  const responseJSON = {
    message: 'Page not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
