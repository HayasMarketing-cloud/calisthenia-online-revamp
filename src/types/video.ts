export type ZonaMuscular = 
  | 'Espalda' 
  | 'Pecho' 
  | 'Brazos' 
  | 'Piernas' 
  | 'Core' 
  | 'Hombros' 
  | 'Full Body';

export type Nivel = 
  | 'Principiante' 
  | 'Intermedio' 
  | 'Avanzado';

export type Material = 
  | 'Peso corporal'
  | 'Bandas elásticas'
  | 'Anillas'
  | 'Paralelas'
  | 'Barra dominadas'
  | 'Kettlebell'
  | 'Sin equipamiento';

export interface VideoMetadata {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string; // Formato PT7M12S (ISO 8601)
  durationSeconds: number; // Duración en segundos para ordenamiento
  vistas: number;
  likes: number;
  comentarios: number;
  zonaMuscular: ZonaMuscular;
  nivel: Nivel;
  material: Material;
  engagementScore: number; // Score calculado para ordenamiento
}
