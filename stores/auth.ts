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
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      headers,
      onError: (ctx) => {
        navigateTo({
          path: "/auth/signup",
          query: {
            error: ctx.error.message,
          },
        });
      },
      onSuccess: () => {
        navigateTo("/dashboard"); // redirect to sign in page
      },
    });
  }

  async function signIn(email: string, password: string) {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signIn.email({
      email,
      password,
    }, {
      headers,

      onError: (ctx) => {
        // console.error(ctx.error.status, ctx.error.message);
        // send user the the same page with error message in the query string
        navigateTo({
          path: "/auth/signin",
          query: {
            error: ctx.error.message,
          },
        });
      },
      onSuccess: () => {
        navigateTo("/dashboard"); // redirect to dashboard
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
        onSuccess: () => {
          navigateTo("/"); // redirect to login page
        },
        onError: (e) => {
          console.log(e.error.message);
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
