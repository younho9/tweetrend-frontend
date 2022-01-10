const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');
const request = require('request');
const qs = require('qs');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.NODE_ENV === 'production' ? 3000 : 3001;
const post = util.promisify(request.post);
const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientOrigin =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:3000';

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [clientOrigin, 'http://localhost:6006'],
    methods: ['GET', 'POST'],
  },
});

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

let timeout = 0;

const QUERY_PARAMS = qs.stringify(
  {
    expansions: [
      'attachments.media_keys',
      'author_id',
      'entities.mentions.username',
      'in_reply_to_user_id',
      'referenced_tweets.id',
      'referenced_tweets.id.author_id',
    ],
    'media.fields': ['media_key', 'preview_image_url', 'type', 'url'],
    'tweet.fields': [
      'id',
      'text',
      'attachments',
      'author_id',
      'conversation_id',
      'created_at',
      'entities',
      'in_reply_to_user_id',
      'public_metrics',
      'possibly_sensitive',
      'referenced_tweets',
      'source',
      'reply_settings',
    ],
    'user.fields': ['id', 'name', 'username', 'profile_image_url', 'verified'],
  },
  { arrayFormat: 'comma' }
);

const streamURL = new URL(
  `https://api.twitter.com/2/tweets/search/stream?${QUERY_PARAMS}`
);

const rulesURL = new URL(
  'https://api.twitter.com/2/tweets/search/stream/rules'
);

const errortext = {
  title: 'Please Wait',
  detail: 'Waiting for new Tweets to be posted...',
};

const authtext = {
  title: 'Could not authenticate',
  details: [
    `Please make sure your bearer token is correct.
      If using Glitch, remix this app and add it to the .env file`,
  ],
  type: 'https://developer.twitter.com/en/docs/authentication',
};

const sleep = async (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

app.get('/api/rules', async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authtext);
  }

  const token = BEARER_TOKEN;
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.text);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.post('/api/rules', async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authtext);
  }

  const token = BEARER_TOKEN;

  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: req.body,
  };

  try {
    const response = await post(requestConfig);

    if (response.statusCode === 200 || response.statusCode === 201) {
      res.send(response);
    } else {
      throw new Error(response);
    }
  } catch (e) {
    res.send(e);
  }
});

const streamTweets = (socket, token) => {
  const config = {
    url: streamURL,
    auth: {
      bearer: token,
    },
    timeout: 31000,
  };

  try {
    const stream = request.get(config);

    stream
      .on('data', (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            socket.emit('error', json);
            reconnect(stream, socket, token);
          } else {
            if (json.data) {
              socket.emit('tweet', json);
            } else {
              socket.emit('authError', json);
            }
          }
        } catch (e) {
          socket.emit('heartbeat');
        }
      })
      .on('error', (error) => {
        // Connection timed out
        socket.emit('error', errortext);
        reconnect(stream, socket, token);
      });
  } catch (e) {
    socket.emit('authError', authtext);
  }
};

const reconnect = async (stream, socket, token) => {
  timeout++;
  stream.abort();
  await sleep(2 ** timeout * 1000);
  streamTweets(socket, token);
};

io.on('connection', async (socket) => {
  try {
    const token = BEARER_TOKEN;
    io.emit('connect-success', 'Client connected');
    streamTweets(io, token);
  } catch (e) {
    io.emit('authError', authtext);
  }
});

console.log('NODE_ENV is', process.env.NODE_ENV);

server.listen(port, () => console.log(`Listening on port ${port}`));
