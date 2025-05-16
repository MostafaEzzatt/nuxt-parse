import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

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
    init,
    loading,
    user,
    signIn,
    signUp,
    signOut,
  };
});
