const convertNetworkError = (err) => {
  return {
    message: 'NETWORK-ERROR',
    err
  };
};

const convertServiceError = (err) => Promise.reject(err);

export const fetchGetSession = (username) => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchCreateSession = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchRemoveSession = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( convertNetworkError)
  .then( response => {
    return response.ok;
  });
};

export const fetchReadTheme = (username) => {
  return fetch(`/theme/${username}`, {
    method: 'GET'
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchUpdateTheme = (username, theme) => {
  return fetch(`/theme/${username}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ theme })
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchReadAllTasks = (username) => {
  return fetch(`/tasks/${username}`, {
    method: 'GET',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchAddOneTask = (username, taskName) => {
  return fetch(`/tasks/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ task: {taskName, done: false} }),
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchUpdateOneTask = (username, taskId, task) => {
  return fetch(`/tasks/${username}/${taskId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({task: task})
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchRemoveOneTask = (username, taskId) => {
  return fetch(`/tasks/${username}/${taskId}`, {
    method: 'DELETE',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};
