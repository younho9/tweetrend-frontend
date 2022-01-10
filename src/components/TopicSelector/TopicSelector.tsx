import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../Button';

export type TopicSelectorProps = Record<string, unknown> &
  Partial<StyledTopicSelectorProps>;

export type StyledTopicSelectorProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTopicSelector = styled.ul<StyledTopicSelectorProps>`
  display: flex;
  justify-content: space-between;
`;

const TOPICS = ['covid-19', 'movie', 'music', 'bts', 'sports'] as const;
const TOPICS_KO_MAP = {
  'covid-19': '코로나',
  movie: '영화',
  music: '음악',
  bts: 'BTS',
  sports: '스포츠',
} as const;

function TopicSelector(props: TopicSelectorProps) {
  const location = useLocation();
  const [, tap, active] = location.pathname.split('/');
  const history = useHistory();

  const moveTopic = useCallback(
    (to: string) => () => {
      if (to !== active) {
        history.push(`/${tap}/${to}`);
      }
    },
    [active, history, tap]
  );

  return (
    <StyledTopicSelector {...props}>
      {TOPICS.map((topic) => (
        <li key={topic} className="topic-button-item">
          <Button
            variants={active === topic ? 'informative' : 'default'}
            color="Blue"
            rounded
            active={active === topic}
            size="extraLarge"
            width={180}
            height={60}
            onClick={moveTopic(topic)}>
            {TOPICS_KO_MAP[topic]}
          </Button>
        </li>
      ))}
    </StyledTopicSelector>
  );
}

export default TopicSelector;
