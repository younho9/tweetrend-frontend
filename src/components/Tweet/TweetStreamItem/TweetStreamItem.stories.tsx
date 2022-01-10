import { Story, Meta } from '@storybook/react/types-6-0';

import TweetStreamItem, { TweetStreamItemProps } from './TweetStreamItem';

export default {
  title: 'Components/Tweet/TweetStreamItem',
  component: TweetStreamItem,
} as Meta;

export const DefaultTweet: Story<TweetStreamItemProps> = (args) => (
  <TweetStreamItem {...args} />
);
DefaultTweet.args = {
  data: {
    id: '1341072021099327489',
    message:
      'As 2020 comes to an end we wanted to share a special Holiday Update on our research into zero-bundle-size React Server Components. The demo is available now whether you want to play with it during the holiday, or when work picks back up in the new year. https://t.co/C9BgkgOI5A https://t.co/F35mvs5OaM',
    attachments: {
      media_keys: ['3_1341071914127806465'],
    },
    author_id: '1566463268',
    conversation_id: '1341072021099327489',
    created_at: '2020-12-21T17:24:20.000Z',
    entities: {
      urls: [
        {
          start: 254,
          end: 277,
          url: 'https://t.co/C9BgkgOI5A',
          expanded_url: 'https://reactjs.org/server-components',
          display_url: 'reactjs.org/server-compone…',
        },
        {
          start: 278,
          end: 301,
          url: 'https://t.co/F35mvs5OaM',
          expanded_url:
            'https://twitter.com/reactjs/status/1341072021099327489/photo/1',
          display_url: 'pic.twitter.com/F35mvs5OaM',
        },
      ],
    },
    possibly_sensitive: false,
    reply_settings: 'everyone',
    public_metrics: {
      retweet_count: 1532,
      reply_count: 161,
      like_count: 5066,
      quote_count: 450,
    },
    source: 'Twitter Web App',
  },
  includes: {
    media: [
      {
        media_key: '3_1341071914127806465',
        type: 'photo',
        url: 'https://pbs.twimg.com/media/EpxxzPPXUAE-iqM.jpg',
      },
    ],
    users: [
      {
        username: 'reactjs',
        id: '1566463268',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_normal.png',
        verified: false,
        name: 'React',
      },
    ],
  },
};

export const ReTweet: Story<TweetStreamItemProps> = (args) => (
  <TweetStreamItem {...args} />
);
ReTweet.args = {
  data: {
    entities: {
      mentions: [
        {
          start: 3,
          end: 16,
          username: '_MAArgentino',
        },
      ],
    },
    id: '1352092678909997058',
    referenced_tweets: [
      {
        type: 'retweeted',
        id: '1352075356140949504',
      },
    ],
    source: 'Twitter for iPhone',
    possibly_sensitive: false,
    created_at: '2021-01-21T03:16:29.000Z',
    conversation_id: '1352092678909997058',
    author_id: '747148865527128064',
    message:
      'RT @_MAArgentino: START/ How did the QAnon community react once the eleventh hour passed, once Biden was sworn in, once there were no mass…',
    public_metrics: {
      retweet_count: 227,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    reply_settings: 'everyone',
  },
  includes: {
    users: [
      {
        username: 'dlspace108',
        id: '747148865527128064',
        verified: false,
        name: 'dlh',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1008768990796136448/0YfXyq-R_normal.jpg',
      },
      {
        username: '_MAArgentino',
        id: '94401193',
        verified: true,
        name: 'Marc-André Argentino',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1326855414563135488/9bT8QnvV_normal.jpg',
      },
    ],
    tweets: [
      {
        entities: {},
        id: '1352075356140949504',
        source: 'Twitter Web App',
        possibly_sensitive: false,
        created_at: '2021-01-21T02:07:39.000Z',
        conversation_id: '1352075356140949504',
        author_id: '94401193',
        message:
          'START/ How did the QAnon community react once the eleventh hour passed, once Biden was sworn in, once there were no mass arrests, no declass, no post from Q? I will try and break down todays timeline.',
        public_metrics: {
          retweet_count: 227,
          reply_count: 19,
          like_count: 631,
          quote_count: 53,
        },
        reply_settings: 'everyone',
      },
    ],
  },
};

export const ReplyTweet: Story<TweetStreamItemProps> = (args) => (
  <TweetStreamItem {...args} />
);
ReplyTweet.args = {
  data: {
    id: '1346308612394782720',
    message:
      '@swyx @wongmjane @biilmann @undef_obj @ednergizer I think there’s some confusion about WS. When I say streaming I just mean the ability to provide HTTP response progressively instead of all at once. Aka chunked encoding. https://t.co/VflmLfejEQ',
    conversation_id: '1346161321788620801',
    source: 'Twitter for iPhone',
    in_reply_to_user_id: '33521530',
    possibly_sensitive: false,
    entities: {
      urls: [
        {
          start: 221,
          end: 244,
          url: 'https://t.co/VflmLfejEQ',
          expanded_url:
            'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding',
          display_url: 'developer.mozilla.org/en-US/docs/Web…',
          unwound_url:
            'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding',
        },
      ],
      mentions: [
        {
          start: 0,
          end: 5,
          username: 'swyx',
        },
        {
          start: 6,
          end: 16,
          username: 'wongmjane',
        },
        {
          start: 17,
          end: 26,
          username: 'biilmann',
        },
        {
          start: 27,
          end: 37,
          username: 'undef_obj',
        },
        {
          start: 38,
          end: 49,
          username: 'ednergizer',
        },
      ],
    },
    referenced_tweets: [
      {
        type: 'replied_to',
        id: '1346307304212160514',
      },
    ],
    reply_settings: 'everyone',
    author_id: '70345946',
    public_metrics: {
      retweet_count: 0,
      reply_count: 0,
      like_count: 5,
      quote_count: 1,
    },
    created_at: '2021-01-05T04:12:41.000Z',
  },
  includes: {
    users: [
      {
        name: 'Dan Abramov',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_normal.jpg',
        verified: false,
        id: '70345946',
        username: 'dan_abramov',
      },
      {
        name: 'shawn swyx wang',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1336445471359823872/vgcUXO4W_normal.jpg',
        verified: false,
        id: '33521530',
        username: 'swyx',
      },
      {
        name: 'Jane Manchun Wong',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1337084860792356866/h10V5_yC_normal.jpg',
        verified: true,
        id: '337119125',
        username: 'wongmjane',
      },
      {
        name: 'Matt Biilmann',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/560874041452408833/a8obZPqr_normal.jpeg',
        verified: false,
        id: '24203304',
        username: 'biilmann',
      },
      {
        name: 'Ricardo',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1137975081630461952/Uf-8uyw-_normal.jpg',
        verified: false,
        id: '264955322',
        username: 'undef_obj',
      },
      {
        name: 'Ed Lima',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/984417753283964928/mz7pfPbi_normal.jpg',
        verified: false,
        id: '823014415423287297',
        username: 'ednergizer',
      },
    ],
    tweets: [
      {
        conversation_id: '1346161321788620801',
        source: 'Twitter Web App',
        in_reply_to_user_id: '33521530',
        id: '1346307304212160514',
        possibly_sensitive: false,
        entities: {
          mentions: [
            {
              start: 0,
              end: 10,
              username: 'wongmjane',
            },
            {
              start: 11,
              end: 23,
              username: 'dan_abramov',
            },
            {
              start: 24,
              end: 33,
              username: 'biilmann',
            },
            {
              start: 63,
              end: 73,
              username: 'undef_obj',
            },
            {
              start: 78,
              end: 89,
              username: 'ednergizer',
            },
          ],
        },
        referenced_tweets: [
          {
            type: 'replied_to',
            id: '1346305613035278338',
          },
        ],
        reply_settings: 'everyone',
        message:
          "@wongmjane @dan_abramov @biilmann forgot to tag the leads here @undef_obj and @ednergizer for anything else they'd add",
        author_id: '33521530',
        public_metrics: {
          retweet_count: 0,
          reply_count: 2,
          like_count: 1,
          quote_count: 0,
        },
        created_at: '2021-01-05T04:07:29.000Z',
      },
    ],
  },
};

export const QuoteTweet: Story<TweetStreamItemProps> = (args) => (
  <TweetStreamItem {...args} />
);
QuoteTweet.args = {
  data: {
    id: '1346297415440195587',
    message: '“Component unmounted.” https://t.co/HGBZFPvFnq',
    possibly_sensitive: false,
    source: 'Twitter for iPhone',
    created_at: '2021-01-05T03:28:11.000Z',
    reply_settings: 'everyone',
    referenced_tweets: [
      {
        type: 'quoted',
        id: '1346176822850048000',
      },
    ],
    conversation_id: '1346297415440195587',
    entities: {
      urls: [
        {
          start: 23,
          end: 46,
          url: 'https://t.co/HGBZFPvFnq',
          expanded_url:
            'https://twitter.com/alice_moran/status/1346176822850048000',
          display_url: 'twitter.com/alice_moran/st…',
        },
      ],
    },
    author_id: '70345946',
    public_metrics: {
      retweet_count: 72,
      reply_count: 29,
      like_count: 1756,
      quote_count: 4,
    },
  },
  includes: {
    users: [
      {
        name: 'Dan Abramov',
        username: 'dan_abramov',
        verified: false,
        id: '70345946',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_normal.jpg',
      },
      {
        name: 'Alice Moran',
        username: 'Alice_Moran',
        verified: true,
        id: '44141752',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1323387328937795585/HCrpxDv7_normal.jpg',
      },
    ],
    tweets: [
      {
        id: '1346176822850048000',
        message:
          'Quote tweet this with the pun about your job Arnold Schwarzenegger would make if he killed you in a movie.',
        possibly_sensitive: false,
        source: 'Twitter for iPhone',
        created_at: '2021-01-04T19:28:59.000Z',
        reply_settings: 'everyone',
        conversation_id: '1346176822850048000',
        author_id: '44141752',
        entities: {},
        public_metrics: {
          retweet_count: 204,
          reply_count: 1249,
          like_count: 3177,
          quote_count: 6436,
        },
      },
    ],
  },
};
