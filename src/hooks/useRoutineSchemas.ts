import { 
  generateOrganizationSchema, 
  generateVideoSchema, 
  generateHowToSchema, 
  generateBreadcrumbSchema,
  generateProductWithRatingSchema,
  ORGANIZATION_DATA,
  type VideoData,
  type HowToData,
  type BreadcrumbItem,
  type AggregateRatingData
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
  breadcrumbs?: BreadcrumbItem[];
  rating?: AggregateRatingData;
}

export const useRoutineSchemas = (params: RoutineSchemaParams) => {
  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);

  const videoData: VideoData = {
    name: params.videoTitle,
    description: params.routineDescription,
    thumbnailUrl: `https://img.youtube.com/vi/${params.videoId}/maxresdefault.jpg`,
    uploadDate: params.uploadDate || new Date().toISOString(),
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

  // Schemas opcionales
  const breadcrumbSchema = params.breadcrumbs 
    ? generateBreadcrumbSchema(params.breadcrumbs) 
    : null;

  const ratingSchema = params.rating
    ? generateProductWithRatingSchema(
        params.routineName,
        params.routineDescription,
        `https://img.youtube.com/vi/${params.videoId}/maxresdefault.jpg`,
        params.rating
      )
    : null;

  const schemas: any[] = [organizationSchema, videoSchema, howToSchema];
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  if (ratingSchema) schemas.push(ratingSchema);

  return {
    organizationSchema,
    videoSchema,
    howToSchema,
    breadcrumbSchema,
    ratingSchema,
    allSchemas: schemas
  };
};
