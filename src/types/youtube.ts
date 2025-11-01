export interface YouTubeChannelStats {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  title: string;
  thumbnailUrl: string;
  channelUrl: string;
  lastVideoThumbnail?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: string; // Formato ISO 8601 (ej: "PT12M34S")
  viewCount: number;
  likeCount: number;
  videoUrl: string;
}
