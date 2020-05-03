const statusMessages = {
  DEFAULT: 'Oh no!  Something went wrong, please try again',
  USERNAME_REQUIRED: 'Username is required',
  NETWORK_ERROR: 'There was a problem reaching your network, please try again',
  LOGIN_REQUIRED: 'You must be logged in to view this content',
  LOGIN_UNAUTHORIZED: 'You are not permitted to view this content',
  EMPTY_TASKNAME: 'Taskname cannot be empty',
  'login denied': 'Username must be between 2-20 chracters and start with [A-Za-z0-9_-]',
  'no valid session' : 'Your session is not valid',
  'action not permitted' :  'This action is not permitted',
  'no tasks for user' : 'There is no such task' ,
  'no such taskId' : 'Invalid taskId',
  'failed to update' : 'Update failed',
};

export default statusMessages;
