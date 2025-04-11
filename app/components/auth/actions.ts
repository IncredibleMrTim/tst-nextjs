'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@utils/supabase/server';
import { StoreKeys } from '@/store/redux/store';

export async function login(email: string, password: string) {
  const supabase = await createClient();
  const data = {
    email,
    password
  };
  const {
    error,
    data: { user }
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  return user;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export const signOut = async () => {
  const supabase = await createClient();
  return await supabase.auth.signOut({ scope: 'local' });
};

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  return user;
};
