import { createClient } from '@/util/supabase/client';

class AuthService {
  static async signUp(email: string, password: string) {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/auth/callback`,
        },
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  }

  static async signIn(email: string, password: string) {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  }

  static async signOut() {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  }

  static async getSession() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const user = data.session?.user || null;

      return { user, session: data.session };
    } catch (error) {
      console.error('Get Session Error:', error);
      return { user: null, session: null };
    }
  }
}

export default AuthService;
