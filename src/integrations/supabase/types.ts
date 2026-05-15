export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      baseline_metrics: {
        Row: {
          client_id: string
          created_at: string
          id: string
          max_pull_ups: number | null
          max_push_ups: number | null
          max_squats: number | null
          notes: string | null
          recorded_at: string
          weight_kg: number | null
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          notes?: string | null
          recorded_at?: string
          weight_kg?: number | null
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          notes?: string | null
          recorded_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "baseline_metrics_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          publish_date: string | null
          read_time: number | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["blog_status"]
          tags: string[] | null
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          publish_date?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["blog_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          publish_date?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["blog_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      client_adherence: {
        Row: {
          adherence_pct_30d: number | null
          adherence_pct_7d: number | null
          calculated_at: string | null
          client_id: string
          current_streak: number | null
          days_since_last_session: number | null
          id: string
          last_session_at: string | null
          longest_streak: number | null
          status: Database["public"]["Enums"]["adherence_status"] | null
          updated_at: string
        }
        Insert: {
          adherence_pct_30d?: number | null
          adherence_pct_7d?: number | null
          calculated_at?: string | null
          client_id: string
          current_streak?: number | null
          days_since_last_session?: number | null
          id?: string
          last_session_at?: string | null
          longest_streak?: number | null
          status?: Database["public"]["Enums"]["adherence_status"] | null
          updated_at?: string
        }
        Update: {
          adherence_pct_30d?: number | null
          adherence_pct_7d?: number | null
          calculated_at?: string | null
          client_id?: string
          current_streak?: number | null
          days_since_last_session?: number | null
          id?: string
          last_session_at?: string | null
          longest_streak?: number | null
          status?: Database["public"]["Enums"]["adherence_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_adherence_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_profiles: {
        Row: {
          activity_level: Database["public"]["Enums"]["activity_level"] | null
          available_equipment: string | null
          bodyweight_experience: boolean | null
          coach_id: string | null
          created_at: string
          current_training_description: string | null
          daily_steps_avg: number | null
          date_of_birth: string | null
          health_conditions: string | null
          height_cm: number | null
          id: string
          lifestyle_description: string | null
          long_term_goal: string | null
          max_pull_ups: number | null
          max_push_ups: number | null
          max_squats: number | null
          session_duration_minutes: number | null
          short_term_goal: string | null
          training_days_per_week: number | null
          training_experience: string | null
          training_location: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          available_equipment?: string | null
          bodyweight_experience?: boolean | null
          coach_id?: string | null
          created_at?: string
          current_training_description?: string | null
          daily_steps_avg?: number | null
          date_of_birth?: string | null
          health_conditions?: string | null
          height_cm?: number | null
          id: string
          lifestyle_description?: string | null
          long_term_goal?: string | null
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          session_duration_minutes?: number | null
          short_term_goal?: string | null
          training_days_per_week?: number | null
          training_experience?: string | null
          training_location?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          available_equipment?: string | null
          bodyweight_experience?: boolean | null
          coach_id?: string | null
          created_at?: string
          current_training_description?: string | null
          daily_steps_avg?: number | null
          date_of_birth?: string | null
          health_conditions?: string | null
          height_cm?: number | null
          id?: string
          lifestyle_description?: string | null
          long_term_goal?: string | null
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          session_duration_minutes?: number | null
          short_term_goal?: string | null
          training_days_per_week?: number | null
          training_experience?: string | null
          training_location?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          client_id: string
          coach_id: string
          created_at: string
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          client_id: string
          coach_id: string
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          client_id?: string
          coach_id?: string
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_alerts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_alerts_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          aliases: string[] | null
          category: Database["public"]["Enums"]["exercise_category"] | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          equipment_needed: string[] | null
          id: string
          is_active: boolean | null
          is_public_seo: boolean
          monthly_volume: number | null
          muscle_groups: string[] | null
          name: string
          primary_keyword: string | null
          public_order: number | null
          seo_description: string | null
          seo_slug: string | null
          updated_at: string
          youtube_video_id: string | null
        }
        Insert: {
          aliases?: string[] | null
          category?: Database["public"]["Enums"]["exercise_category"] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          equipment_needed?: string[] | null
          id?: string
          is_active?: boolean | null
          is_public_seo?: boolean
          monthly_volume?: number | null
          muscle_groups?: string[] | null
          name: string
          primary_keyword?: string | null
          public_order?: number | null
          seo_description?: string | null
          seo_slug?: string | null
          updated_at?: string
          youtube_video_id?: string | null
        }
        Update: {
          aliases?: string[] | null
          category?: Database["public"]["Enums"]["exercise_category"] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          equipment_needed?: string[] | null
          id?: string
          is_active?: boolean | null
          is_public_seo?: boolean
          monthly_volume?: number | null
          muscle_groups?: string[] | null
          name?: string
          primary_keyword?: string | null
          public_order?: number | null
          seo_description?: string | null
          seo_slug?: string | null
          updated_at?: string
          youtube_video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          age: number
          created_at: string
          goal: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          age: number
          created_at?: string
          goal: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          age?: number
          created_at?: string
          goal?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      program_day_exercises: {
        Row: {
          custom_youtube_video_id: string | null
          day_id: string
          exercise_id: string
          id: string
          notes: string | null
          order_index: number
          reps: string | null
          rest_seconds: number | null
          sets: number | null
        }
        Insert: {
          custom_youtube_video_id?: string | null
          day_id: string
          exercise_id: string
          id?: string
          notes?: string | null
          order_index?: number
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
        }
        Update: {
          custom_youtube_video_id?: string | null
          day_id?: string
          exercise_id?: string
          id?: string
          notes?: string | null
          order_index?: number
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_day_exercises_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "program_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_day_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      program_days: {
        Row: {
          day_number: number
          id: string
          is_rest_day: boolean | null
          name: string | null
          notes: string | null
          scheduled_date: string | null
          week_id: string
        }
        Insert: {
          day_number: number
          id?: string
          is_rest_day?: boolean | null
          name?: string | null
          notes?: string | null
          scheduled_date?: string | null
          week_id: string
        }
        Update: {
          day_number?: number
          id?: string
          is_rest_day?: boolean | null
          name?: string | null
          notes?: string | null
          scheduled_date?: string | null
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_days_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "program_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      program_weeks: {
        Row: {
          id: string
          name: string | null
          notes: string | null
          program_id: string
          start_date: string | null
          week_number: number
        }
        Insert: {
          id?: string
          name?: string | null
          notes?: string | null
          program_id: string
          start_date?: string | null
          week_number: number
        }
        Update: {
          id?: string
          name?: string | null
          notes?: string | null
          program_id?: string
          start_date?: string | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_weeks_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          client_id: string | null
          coach_id: string | null
          created_at: string
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_weeks: number | null
          end_date: string | null
          id: string
          is_template: boolean | null
          name: string
          phase_number: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["program_status"] | null
          tags: string[] | null
          template_id: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          coach_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_weeks?: number | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          name: string
          phase_number?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["program_status"] | null
          tags?: string[] | null
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          coach_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_weeks?: number | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          name?: string
          phase_number?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["program_status"] | null
          tags?: string[] | null
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_pages: {
        Row: {
          canonical: string | null
          created_at: string
          description: string | null
          h1: string | null
          h2_primary: string | null
          h2_secondary_1: string | null
          h2_secondary_2: string | null
          id: string
          keywords: string[] | null
          og_image: string | null
          path: string
          title: string | null
          updated_at: string
        }
        Insert: {
          canonical?: string | null
          created_at?: string
          description?: string | null
          h1?: string | null
          h2_primary?: string | null
          h2_secondary_1?: string | null
          h2_secondary_2?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          path: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          canonical?: string | null
          created_at?: string
          description?: string | null
          h1?: string | null
          h2_primary?: string | null
          h2_secondary_1?: string | null
          h2_secondary_2?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          path?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_redirects: {
        Row: {
          code: number
          created_at: string
          from_path: string
          id: string
          to_path: string
          updated_at: string
        }
        Insert: {
          code?: number
          created_at?: string
          from_path: string
          id?: string
          to_path: string
          updated_at?: string
        }
        Update: {
          code?: number
          created_at?: string
          from_path?: string
          id?: string
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_robots: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      session_checkins: {
        Row: {
          comment: string | null
          completed_workout: boolean
          created_at: string
          difficulty_rating: number
          energy_rating: number
          id: string
          session_id: string
        }
        Insert: {
          comment?: string | null
          completed_workout: boolean
          created_at?: string
          difficulty_rating: number
          energy_rating: number
          id?: string
          session_id: string
        }
        Update: {
          comment?: string | null
          completed_workout?: boolean
          created_at?: string
          difficulty_rating?: number
          energy_rating?: number
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_checkins_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_exercise_logs: {
        Row: {
          completed: boolean | null
          id: string
          logged_at: string
          notes: string | null
          program_day_exercise_id: string | null
          reps_completed: string | null
          session_id: string
          sets_completed: number | null
        }
        Insert: {
          completed?: boolean | null
          id?: string
          logged_at?: string
          notes?: string | null
          program_day_exercise_id?: string | null
          reps_completed?: string | null
          session_id: string
          sets_completed?: number | null
        }
        Update: {
          completed?: boolean | null
          id?: string
          logged_at?: string
          notes?: string | null
          program_day_exercise_id?: string | null
          reps_completed?: string | null
          session_id?: string
          sets_completed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "session_exercise_logs_program_day_exercise_id_fkey"
            columns: ["program_day_exercise_id"]
            isOneToOne: false
            referencedRelation: "program_day_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_exercise_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_page_usage: {
        Row: {
          created_at: string
          notes: string | null
          page_path: string
          section: string
          source: string
          updated_at: string
          video_id: string
        }
        Insert: {
          created_at?: string
          notes?: string | null
          page_path: string
          section?: string
          source?: string
          updated_at?: string
          video_id: string
        }
        Update: {
          created_at?: string
          notes?: string | null
          page_path?: string
          section?: string
          source?: string
          updated_at?: string
          video_id?: string
        }
        Relationships: []
      }
      workout_sessions: {
        Row: {
          client_id: string
          completed_at: string | null
          created_at: string
          id: string
          program_day_id: string | null
          started_at: string
          status: Database["public"]["Enums"]["session_status"] | null
        }
        Insert: {
          client_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          program_day_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"] | null
        }
        Update: {
          client_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          program_day_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_sessions_program_day_id_fkey"
            columns: ["program_day_id"]
            isOneToOne: false
            referencedRelation: "program_days"
            referencedColumns: ["id"]
          },
        ]
      }
      youtube_videos: {
        Row: {
          comment_count: number
          created_at: string
          description: string | null
          duration: string | null
          last_synced_at: string
          like_count: number
          notes: string | null
          published_at: string | null
          source: string
          tags: string[]
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_id: string
          view_count: number
        }
        Insert: {
          comment_count?: number
          created_at?: string
          description?: string | null
          duration?: string | null
          last_synced_at?: string
          like_count?: number
          notes?: string | null
          published_at?: string | null
          source?: string
          tags?: string[]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_id: string
          view_count?: number
        }
        Update: {
          comment_count?: number
          created_at?: string
          description?: string | null
          duration?: string | null
          last_synced_at?: string
          like_count?: number
          notes?: string | null
          published_at?: string | null
          source?: string
          tags?: string[]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_id?: string
          view_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      recalculate_adherence: {
        Args: { p_client_id: string }
        Returns: undefined
      }
    }
    Enums: {
      activity_level: "sedentary" | "light_active" | "active" | "very_active"
      adherence_status: "new" | "active" | "at_risk" | "inactive"
      alert_type:
        | "inactive_2_3_days"
        | "inactive_4plus_days"
        | "low_adherence"
        | "high_difficulty_streak"
        | "low_energy_streak"
        | "session_not_completed"
        | "new_client_not_started"
      app_role: "admin" | "user"
      blog_status: "draft" | "published" | "scheduled"
      difficulty_level: "beginner" | "intermediate" | "advanced"
      exercise_category:
        | "fuerza"
        | "movilidad"
        | "resistencia"
        | "pliometria"
        | "flexibilidad"
      program_status: "draft" | "active" | "completed" | "paused" | "cancelled"
      session_status: "in_progress" | "completed" | "skipped"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_level: ["sedentary", "light_active", "active", "very_active"],
      adherence_status: ["new", "active", "at_risk", "inactive"],
      alert_type: [
        "inactive_2_3_days",
        "inactive_4plus_days",
        "low_adherence",
        "high_difficulty_streak",
        "low_energy_streak",
        "session_not_completed",
        "new_client_not_started",
      ],
      app_role: ["admin", "user"],
      blog_status: ["draft", "published", "scheduled"],
      difficulty_level: ["beginner", "intermediate", "advanced"],
      exercise_category: [
        "fuerza",
        "movilidad",
        "resistencia",
        "pliometria",
        "flexibilidad",
      ],
      program_status: ["draft", "active", "completed", "paused", "cancelled"],
      session_status: ["in_progress", "completed", "skipped"],
    },
  },
} as const
