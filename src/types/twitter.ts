/**
 * {@link https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id#Response-fields}
 */
export interface TweetResponse extends Partial<ExpandedTweetData> {
  matching_rules?: MatchingRule[];

  // errors
  errors?: any[];
  title?: string;
  type?: string;
  status?: number; // status code
  detail?: string;
}

export interface TweetsResponse {
  tweets?: ExpandedTweetData[];
  error?: string;
}

export interface ExpandedTweetData {
  /** 트윗 데이터 */
  data: TweetData;
  /** 트윗, 유저, 장소, 미디어, 투표 등 확장된 정보를 담고 있는 객체 */
  includes?: Includes;
}

/**
 * {@link https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet}
 */
export interface TweetData {
  /** 트윗 고유 `ID` */
  id: string;
  /** 트윗 내용 */
  message: string;
  /** 트윗 내용 For Dev */
  text?: string;
  /** 첨부된 미디어 정보 */
  attachments?: Attachments;
  /** 트윗 작성자 `ID` */
  author_id: string;
  /** 트윗 스레드 `ID` */
  conversation_id: string;
  /** 트윗 작성 시간 */
  created_at: string;
  /** 트윗에서 의미를 갖는 텍스트의 파싱된 정보 모음 */
  entities?: Entities;
  /** 다른 트윗에 대한 답변일 경우 답변한 트윗의 `ID` */
  in_reply_to_user_id?: string;
  /** 민감한 콘텐츠 여부 */
  possibly_sensitive: boolean;
  /** 공개적인 트윗 참여 측정 항목 ex) 좋아요 수 ... */
  public_metrics: PublicMetrics;
  /** 참조하는 트윗 목록 */
  referenced_tweets?: ReferencedTweet[];
  /** 트윗의 답글 허용 범위 설정 */
  reply_settings: 'everyone' | 'mentionedUsers' | 'following';
  /** 유저가 사용한 앱의 이름 */
  source: string;
}

export interface ReferencedTweet {
  /** 참조된 트윗 유형 */
  type: 'retweeted' | 'quoted' | 'replied_to';
  /** 트윗 고유 `ID` */
  id: string;
}

export interface Attachments {
  /** 첨부된 미디어의 `key` 배열 */
  media_keys: string[];
}

export interface Entities {
  /** 트윗 본문 텍스트에서 파싱된 URL 데이터가 담긴 배열 */
  urls?: URLData[];
  /** 트윗 본문 텍스트에서 파싱된 언급된 사용자 이름이 담긴 배열 */
  mentions?: MentionData[];
  /** 트윗 본문 텍스트에서 파싱된 해시태그 이름이 담긴 배열 */
  hashtags?: HashtagData[];
  /** 트윗 본문 텍스트에서 파싱된 캐시태그 이름이 담긴 배열 */
  cashtags?: CashtagData[];
}

export interface EntityData {
  /** 트윗 본문에서의 시작 위치 (zero-based) */
  start: number;
  /** 트윗 본문에서의 종료 위치 (zero-based) */
  end: number;
}

export interface URLData extends EntityData {
  /** The URL in the format tweeted by the user */
  url: string;
  /** The fully resolved URL */
  expanded_url: string;
  /** The URL as displayed in the Twitter client */
  display_url: string;
  /** The full destination URL */
  unwound_url?: string;
}

export interface MentionData extends EntityData {
  /** 트위터 ID `@{username}` */
  username: string;
}

export interface HashtagData extends EntityData {
  /** 태그 문자열 */
  tag: string;
}

export type CashtagData = HashtagData;

export interface PublicMetrics {
  /** 리트윗 수 */
  retweet_count: number;
  /** 답글 수 */
  reply_count: number;
  /** 좋아요 수 */
  like_count: number;
  /** 인용 수 */
  quote_count: number;
}

export interface Includes {
  tweets?: TweetData[];
  users: UserData[];
  media?: MediaData[];
}

/**
 * {@link https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/user}
 */
export interface UserData {
  /** 트위터 고유로 부여되는 회원 ID */
  id: string;
  /** 트위터 유저의 표시되는 이름 */
  name: string;
  /** 트위터 ID `@{username}` */
  username: string;
  /** 프로필 이미지 확장자 포맷 URL */
  profile_image_url?: string;
  /** 공인 여부 */
  verified?: boolean;
}

/**
 * {@link https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media}
 */
export interface MediaData {
  /** 미디어의 확장자 포맷 URL */
  url: string;
  /** 미디어 유형 */
  type: 'photo' | 'video' | 'animated_gif';
  /** 미디어 `key` */
  media_key: string;
  /** `video` | `animated_gif` 타입 의 경우 지니는 미리보기 이미지 URL */
  preview_image_url?: string;
}

export interface MatchingRule {
  id: string;
  tag: string;
}
