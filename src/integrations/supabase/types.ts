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
      client_adherence_weekly: {
        Row: {
          assigned_sessions: number
          client_id: string
          completed_sessions: number
          completion_rate: number
          created_at: string
          feedback_rate: number
          id: string
          inactivity_days: number
          week_start_date: string
        }
        Insert: {
          assigned_sessions?: number
          client_id: string
          completed_sessions?: number
          completion_rate?: number
          created_at?: string
          feedback_rate?: number
          id?: string
          inactivity_days?: number
          week_start_date: string
        }
        Update: {
          assigned_sessions?: number
          client_id?: string
          completed_sessions?: number
          completion_rate?: number
          created_at?: string
          feedback_rate?: number
          id?: string
          inactivity_days?: number
          week_start_date?: string
        }
        Relationships: []
      }
      client_milestones: {
        Row: {
          achieved_at: string
          client_id: string
          created_at: string
          id: string
          is_archived: boolean
          label: string | null
          metadata: Json | null
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          value: number | null
        }
        Insert: {
          achieved_at?: string
          client_id: string
          created_at?: string
          id?: string
          is_archived?: boolean
          label?: string | null
          metadata?: Json | null
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          value?: number | null
        }
        Update: {
          achieved_at?: string
          client_id?: string
          created_at?: string
          id?: string
          is_archived?: boolean
          label?: string | null
          metadata?: Json | null
          milestone_type?: Database["public"]["Enums"]["milestone_type"]
          value?: number | null
        }
        Relationships: []
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
          journey_stage: Database["public"]["Enums"]["journey_stage_type"]
          last_activity_at: string | null
          lifestyle_description: string | null
          long_term_goal: string | null
          max_pull_ups: number | null
          max_push_ups: number | null
          max_squats: number | null
          pinned_goal_id: string | null
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
          journey_stage?: Database["public"]["Enums"]["journey_stage_type"]
          last_activity_at?: string | null
          lifestyle_description?: string | null
          long_term_goal?: string | null
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          pinned_goal_id?: string | null
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
          journey_stage?: Database["public"]["Enums"]["journey_stage_type"]
          last_activity_at?: string | null
          lifestyle_description?: string | null
          long_term_goal?: string | null
          max_pull_ups?: number | null
          max_push_ups?: number | null
          max_squats?: number | null
          pinned_goal_id?: string | null
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
          coach_tips: string | null
          common_errors: string | null
          created_at: string
          created_by: string | null
          default_reps: string | null
          default_rest_seconds: number | null
          default_sets: number | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          easier_variation_id: string | null
          equipment_needed: string[] | null
          harder_variation_id: string | null
          id: string
          is_active: boolean | null
          is_public_seo: boolean
          monthly_volume: number | null
          movement_pattern:
            | Database["public"]["Enums"]["movement_pattern_type"]
            | null
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
          coach_tips?: string | null
          common_errors?: string | null
          created_at?: string
          created_by?: string | null
          default_reps?: string | null
          default_rest_seconds?: number | null
          default_sets?: number | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          easier_variation_id?: string | null
          equipment_needed?: string[] | null
          harder_variation_id?: string | null
          id?: string
          is_active?: boolean | null
          is_public_seo?: boolean
          monthly_volume?: number | null
          movement_pattern?:
            | Database["public"]["Enums"]["movement_pattern_type"]
            | null
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
          coach_tips?: string | null
          common_errors?: string | null
          created_at?: string
          created_by?: string | null
          default_reps?: string | null
          default_rest_seconds?: number | null
          default_sets?: number | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          easier_variation_id?: string | null
          equipment_needed?: string[] | null
          harder_variation_id?: string | null
          id?: string
          is_active?: boolean | null
          is_public_seo?: boolean
          monthly_volume?: number | null
          movement_pattern?:
            | Database["public"]["Enums"]["movement_pattern_type"]
            | null
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
          {
            foreignKeyName: "exercises_easier_variation_id_fkey"
            columns: ["easier_variation_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_harder_variation_id_fkey"
            columns: ["harder_variation_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_progress: {
        Row: {
          client_id: string
          created_at: string
          current_value: number | null
          custom_label: string | null
          goal_type: Database["public"]["Enums"]["goal_type"]
          id: string
          is_active: boolean
          notes: string | null
          start_value: number | null
          target_date: string | null
          target_value: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          current_value?: number | null
          custom_label?: string | null
          goal_type: Database["public"]["Enums"]["goal_type"]
          id?: string
          is_active?: boolean
          notes?: string | null
          start_value?: number | null
          target_date?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          current_value?: number | null
          custom_label?: string | null
          goal_type?: Database["public"]["Enums"]["goal_type"]
          id?: string
          is_active?: boolean
          notes?: string | null
          start_value?: number | null
          target_date?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      goal_progress_history: {
        Row: {
          client_id: string
          goal_id: string
          id: string
          recorded_at: string
          value: number
        }
        Insert: {
          client_id: string
          goal_id: string
          id?: string
          recorded_at?: string
          value: number
        }
        Update: {
          client_id?: string
          goal_id?: string
          id?: string
          recorded_at?: string
          value?: number
        }
        Relationships: []
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
      program_adjustments: {
        Row: {
          adjustment_type: Database["public"]["Enums"]["adjustment_type"]
          affected_exercise_id: string | null
          applied_at: string
          client_id: string
          coach_id: string | null
          created_at: string
          id: string
          new_value: string | null
          old_value: string | null
          program_id: string | null
          reason: string | null
        }
        Insert: {
          adjustment_type: Database["public"]["Enums"]["adjustment_type"]
          affected_exercise_id?: string | null
          applied_at?: string
          client_id: string
          coach_id?: string | null
          created_at?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          program_id?: string | null
          reason?: string | null
        }
        Update: {
          adjustment_type?: Database["public"]["Enums"]["adjustment_type"]
          affected_exercise_id?: string | null
          applied_at?: string
          client_id?: string
          coach_id?: string | null
          created_at?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          program_id?: string | null
          reason?: string | null
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
      program_day_overrides: {
        Row: {
          applied_at: string
          client_id: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          override_type: Database["public"]["Enums"]["override_type"]
          payload_jsonb: Json
          program_day_id: string
          reason: string | null
          updated_at: string
        }
        Insert: {
          applied_at?: string
          client_id: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          override_type: Database["public"]["Enums"]["override_type"]
          payload_jsonb?: Json
          program_day_id: string
          reason?: string | null
          updated_at?: string
        }
        Update: {
          applied_at?: string
          client_id?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          override_type?: Database["public"]["Enums"]["override_type"]
          payload_jsonb?: Json
          program_day_id?: string
          reason?: string | null
          updated_at?: string
        }
        Relationships: []
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
      program_phases: {
        Row: {
          created_at: string
          end_week: number
          id: string
          name: string
          notes: string | null
          objective: string | null
          order_index: number
          phase_type: Database["public"]["Enums"]["phase_type"]
          program_id: string
          start_week: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_week: number
          id?: string
          name: string
          notes?: string | null
          objective?: string | null
          order_index?: number
          phase_type?: Database["public"]["Enums"]["phase_type"]
          program_id: string
          start_week: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_week?: number
          id?: string
          name?: string
          notes?: string | null
          objective?: string | null
          order_index?: number
          phase_type?: Database["public"]["Enums"]["phase_type"]
          program_id?: string
          start_week?: number
          updated_at?: string
        }
        Relationships: []
      }
      program_template_versions: {
        Row: {
          change_notes: string | null
          created_at: string
          created_by: string | null
          id: string
          snapshot_jsonb: Json
          template_id: string
          version_number: number
        }
        Insert: {
          change_notes?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          snapshot_jsonb: Json
          template_id: string
          version_number: number
        }
        Update: {
          change_notes?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          snapshot_jsonb?: Json
          template_id?: string
          version_number?: number
        }
        Relationships: []
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
          duration_minutes_real: number | null
          energy_rating: number
          id: string
          pain_level: number | null
          pain_location: string | null
          rpe: number | null
          session_feeling:
            | Database["public"]["Enums"]["session_feeling_type"]
            | null
          session_id: string
        }
        Insert: {
          comment?: string | null
          completed_workout: boolean
          created_at?: string
          difficulty_rating: number
          duration_minutes_real?: number | null
          energy_rating: number
          id?: string
          pain_level?: number | null
          pain_location?: string | null
          rpe?: number | null
          session_feeling?:
            | Database["public"]["Enums"]["session_feeling_type"]
            | null
          session_id: string
        }
        Update: {
          comment?: string | null
          completed_workout?: boolean
          created_at?: string
          difficulty_rating?: number
          duration_minutes_real?: number | null
          energy_rating?: number
          id?: string
          pain_level?: number | null
          pain_location?: string | null
          rpe?: number | null
          session_feeling?:
            | Database["public"]["Enums"]["session_feeling_type"]
            | null
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
      technique_reviews: {
        Row: {
          client_id: string
          client_notes: string | null
          coach_feedback: string | null
          coach_id: string | null
          created_at: string
          exercise_id: string | null
          id: string
          recommendations: string | null
          reviewed_at: string | null
          score: number | null
          status: string
          updated_at: string
          video_storage_path: string | null
          video_url: string | null
        }
        Insert: {
          client_id: string
          client_notes?: string | null
          coach_feedback?: string | null
          coach_id?: string | null
          created_at?: string
          exercise_id?: string | null
          id?: string
          recommendations?: string | null
          reviewed_at?: string | null
          score?: number | null
          status?: string
          updated_at?: string
          video_storage_path?: string | null
          video_url?: string | null
        }
        Update: {
          client_id?: string
          client_notes?: string | null
          coach_feedback?: string | null
          coach_id?: string | null
          created_at?: string
          exercise_id?: string | null
          id?: string
          recommendations?: string | null
          reviewed_at?: string | null
          score?: number | null
          status?: string
          updated_at?: string
          video_storage_path?: string | null
          video_url?: string | null
        }
        Relationships: []
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
      weekly_reviews: {
        Row: {
          client_id: string
          client_visible: boolean
          coach_id: string | null
          created_at: string
          id: string
          improvement_areas: string | null
          next_steps: string | null
          strengths: string | null
          summary: string | null
          updated_at: string
          week_start_date: string
        }
        Insert: {
          client_id: string
          client_visible?: boolean
          coach_id?: string | null
          created_at?: string
          id?: string
          improvement_areas?: string | null
          next_steps?: string | null
          strengths?: string | null
          summary?: string | null
          updated_at?: string
          week_start_date: string
        }
        Update: {
          client_id?: string
          client_visible?: boolean
          coach_id?: string | null
          created_at?: string
          id?: string
          improvement_areas?: string | null
          next_steps?: string | null
          strengths?: string | null
          summary?: string | null
          updated_at?: string
          week_start_date?: string
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
      client_engagement_metrics: {
        Row: {
          adherence_rate: number | null
          client_id: string | null
          days_inactive: number | null
          feedback_rate: number | null
          risk_score: number | null
          sessions_completed_30d: number | null
          sessions_completed_7d: number | null
          sessions_missed_30d: number | null
          sessions_missed_7d: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_template_version: {
        Args: { p_change_notes?: string; p_template_id: string }
        Returns: string
      }
      generate_engagement_alerts: { Args: never; Returns: undefined }
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
      snapshot_weekly_adherence: { Args: never; Returns: undefined }
    }
    Enums: {
      activity_level: "sedentary" | "light_active" | "active" | "very_active"
      adherence_status:
        | "new"
        | "active"
        | "low_engagement"
        | "at_risk"
        | "inactive"
      adjustment_type:
        | "volume"
        | "intensity"
        | "exercise_swap"
        | "rest_day"
        | "progression"
        | "regression"
        | "mobility"
        | "other"
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
      goal_type:
        | "weight_loss"
        | "pull_ups"
        | "push_ups"
        | "squats"
        | "mobility"
        | "autonomy"
        | "oposiciones"
        | "hipertrofia"
        | "resistencia"
        | "custom"
      journey_stage_type:
        | "base"
        | "control"
        | "elite"
        | "renewal"
        | "annual_plan"
        | "inactive"
      milestone_type:
        | "streak_7"
        | "streak_30"
        | "streak_90"
        | "best_streak"
        | "adherence_80"
        | "first_session"
        | "goal_completed"
        | "sessions_10"
        | "sessions_50"
        | "sessions_100"
      movement_pattern_type:
        | "push"
        | "pull"
        | "squat"
        | "hinge"
        | "core"
        | "locomotion"
        | "isometric"
      override_type:
        | "skip_day"
        | "swap_exercise"
        | "change_sets_reps"
        | "add_exercise"
        | "remove_exercise"
        | "custom_note"
        | "reschedule"
      phase_type:
        | "preparacion"
        | "fuerza"
        | "hipertrofia"
        | "tecnica"
        | "deload"
        | "evaluacion"
        | "mantenimiento"
        | "custom"
      program_status: "draft" | "active" | "completed" | "paused" | "cancelled"
      session_feeling_type: "great" | "good" | "hard" | "too_hard" | "painful"
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
      adherence_status: [
        "new",
        "active",
        "low_engagement",
        "at_risk",
        "inactive",
      ],
      adjustment_type: [
        "volume",
        "intensity",
        "exercise_swap",
        "rest_day",
        "progression",
        "regression",
        "mobility",
        "other",
      ],
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
      goal_type: [
        "weight_loss",
        "pull_ups",
        "push_ups",
        "squats",
        "mobility",
        "autonomy",
        "oposiciones",
        "hipertrofia",
        "resistencia",
        "custom",
      ],
      journey_stage_type: [
        "base",
        "control",
        "elite",
        "renewal",
        "annual_plan",
        "inactive",
      ],
      milestone_type: [
        "streak_7",
        "streak_30",
        "streak_90",
        "best_streak",
        "adherence_80",
        "first_session",
        "goal_completed",
        "sessions_10",
        "sessions_50",
        "sessions_100",
      ],
      movement_pattern_type: [
        "push",
        "pull",
        "squat",
        "hinge",
        "core",
        "locomotion",
        "isometric",
      ],
      override_type: [
        "skip_day",
        "swap_exercise",
        "change_sets_reps",
        "add_exercise",
        "remove_exercise",
        "custom_note",
        "reschedule",
      ],
      phase_type: [
        "preparacion",
        "fuerza",
        "hipertrofia",
        "tecnica",
        "deload",
        "evaluacion",
        "mantenimiento",
        "custom",
      ],
      program_status: ["draft", "active", "completed", "paused", "cancelled"],
      session_feeling_type: ["great", "good", "hard", "too_hard", "painful"],
      session_status: ["in_progress", "completed", "skipped"],
    },
  },
} as const
