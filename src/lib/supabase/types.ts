export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          id: number;
          user_id: string;
          item_type: "agent" | "skill";
          item_slug: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          item_type: "agent" | "skill";
          item_slug: string;
        };
        Update: {
          user_id?: string;
          item_type?: "agent" | "skill";
          item_slug?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
