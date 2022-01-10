import { Story, Meta } from '@storybook/react/types-6-0';

import TweetHeader, { TweetHeaderProps } from './TweetHeader';

export default {
  title: 'Components/Tweet/TweetHeader',
  component: TweetHeader,
} as Meta;

const now = new Date();

export const Default: Story<TweetHeaderProps> = (args) => (
  <TweetHeader {...args} />
);
Default.args = {
  user: {
    id: '937698624',
    name: 'Linus Torvalds',
    username: 'Linus__Torvalds',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/2828597835/0f1840e9c2fbafa93fe6f0d7ccf64a3e_normal.jpeg',
    verified: false,
  },
  createdAt: now,
};

export const isVerify: Story<TweetHeaderProps> = (args) => (
  <TweetHeader {...args} createdAt={now} />
);
isVerify.args = {
  user: {
    id: '1636590253',
    name: 'Tim Cook',
    username: 'tim_cook',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1194113737092935681/63O1znGw_normal.jpg',
    verified: true,
  },
  createdAt: now,
};

export const Times: Story<TweetHeaderProps> = (args) => {
  const times = {
    pastHour: new Date(),
    pastDate: new Date(),
    pastWeek: new Date(),
    pastMonth: new Date(),
    pastYear: new Date(),
  };

  times.pastHour.setHours(now.getHours() - 5);
  times.pastDate.setDate(now.getDate() - 5);
  times.pastWeek.setDate(now.getDate() - 11);
  times.pastMonth.setMonth(now.getMonth() - 5);
  times.pastYear.setFullYear(now.getFullYear() - 5);

  return (
    <div>
      {Object.values(times).map((pastTime) => (
        <TweetHeader {...args} createdAt={pastTime} />
      ))}
    </div>
  );
};
Times.args = {
  user: {
    id: '1636590253',
    name: 'Tim Cook',
    username: 'tim_cook',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1194113737092935681/63O1znGw_normal.jpg',
    verified: true,
  },
};
