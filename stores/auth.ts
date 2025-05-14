import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const loading = computed(() => session.value.isPending || session.value.isRefetching);

  async function signUp(email: string, password: string, name: string) {
    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onError: (ctx) => {
        console.error(ctx.error.status, ctx.error.message);
      },
      onSuccess: () => {
        navigateTo("/auth/signin"); // redirect to sign in page
      },
    });
  }

  async function signIn(email: string, password: string) {
    await authClient.signIn.email({
      email,
      password,
    }, {
      onError: (ctx) => {
        console.error(ctx.error.status, ctx.error.message);
      },
      onSuccess: () => {
        navigateTo("/dashboard"); // redirect to dashboard
      },
    });
  }

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigateTo("/"); // redirect to login page
        },
      },
    },
    );
  }

  return {
    loading,
    user,
    signIn,
    signUp,
    signOut,
  };
});
