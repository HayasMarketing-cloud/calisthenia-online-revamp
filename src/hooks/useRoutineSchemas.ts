import { 
  generateOrganizationSchema, 
  generateVideoSchema, 
  generateHowToSchema, 
  ORGANIZATION_DATA,
  type VideoData,
  type HowToData
} from "@/lib/schemas";

interface RoutineSchemaParams {
  routineName: string;
  routineDescription: string;
  videoId: string;
  videoTitle: string;
  videoDuration: string;
  uploadDate?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
}

export const useRoutineSchemas = (params: RoutineSchemaParams) => {
  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);

  const videoData: VideoData = {
    name: params.videoTitle,
    description: params.routineDescription,
    thumbnailUrl: `https://img.youtube.com/vi/${params.videoId}/maxresdefault.jpg`,
    uploadDate: params.uploadDate || new Date().toISOString().split('T')[0],
    duration: params.videoDuration,
    embedUrl: `https://www.youtube.com/embed/${params.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${params.videoId}`
  };

  const howToData: HowToData = {
    name: params.routineName,
    description: params.routineDescription,
    image: `https://img.youtube.com/vi/${params.videoId}/maxresdefault.jpg`,
    totalTime: params.totalTime || "PT30M",
    estimatedCost: "0",
    supply: ["Superficie plana", "Ropa cómoda"],
    tool: ["Peso corporal"],
    steps: params.steps
  };

  const videoSchema = generateVideoSchema(videoData);
  const howToSchema = generateHowToSchema(howToData);

  return {
    organizationSchema,
    videoSchema,
    howToSchema,
    allSchemas: [organizationSchema, videoSchema, howToSchema]
  };
};
