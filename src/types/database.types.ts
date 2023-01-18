export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          author: string | null;
          created_at: string | null;
          id: number;
          message: string | null;
        };
        Insert: {
          author?: string | null;
          created_at?: string | null;
          id?: number;
          message?: string | null;
        };
        Update: {
          author?: string | null;
          created_at?: string | null;
          id?: number;
          message?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
