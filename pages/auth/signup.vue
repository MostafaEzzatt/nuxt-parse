<script setup lang="ts">
import { z } from "zod";

const auth = useAuthStore();
const route = useRoute();

const authSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(7).superRefine((val, ctx) => {
    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one lowercase letter",
      });
    }

    if (!/[!@#$%^&*]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one special character",
      });
    }

    if (!/\d/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number",
      });
    }
  }),
});

// type zodeErrorType = z.infer<typeof authSchema>;
type fieldsErrorType = {
  field: string | number;
  message: string;
}[] | undefined;

const fieldsErrors = ref<fieldsErrorType>(undefined);

// function to return the error by field name
function getErrorByField(fieldName: string) {
  const error = fieldsErrors.value?.find(error => error.field === fieldName);

  if (error) {
    return error.message;
  }
}

async function onSubmit(data: Event) {
  if (!data.target)
    return;

  const target = data.target as HTMLFormElement;
  const username = (target.username as HTMLInputElement).value;
  const email = (target.email as HTMLInputElement).value;
  const password = (target.password as HTMLInputElement).value;
  const returnAuthSchema = authSchema.safeParse({
    username,
    email,
    password,
  });

  const formError = returnAuthSchema.error?.issues.map((error) => {
    return {
      field: error.path[0],
      message: error.message,
    };
  });

  if (formError) {
    fieldsErrors.value = formError;
    return;
  }

  auth.signUp(email, password, username);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <UiCard class="min-w-[500px] ">
      <UiCardHeader>
        <UiCardTitle class="text-2xl">
          SignUp
        </UiCardTitle>
        <UiCardDescription>
          Enter your Information below to Create your account
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <UiAlert v-if="route.query.error" variant="destructive" class="mb-4">
          <Icon
            name="lucide:octagon-x"
            size="20"
          />

          <UiAlertTitle class="ml-7">
            Heads up!
          </UiAlertTitle>
          <UiAlertDescription class="ml-7">
            {{ route.query.error }}
          </UiAlertDescription>
        </UiAlert>
        <form @submit.prevent="onSubmit">
          <div class="flex flex-col gap-6">
            <div class="grid gap-2">
              <UiLabel html-for="username">
                Username
              </UiLabel>
              <UiInput
                id="username"
                type="text"
                placeholder="John Doe"
                required
              />
              <span class="text-sm text-red-400">{{ getErrorByField("username") }}</span>
            </div>
            <div class="grid gap-2">
              <UiLabel html-for="email">
                Email
              </UiLabel>
              <UiInput
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <span class="text-sm text-red-400">{{ getErrorByField("email") }}</span>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <UiLabel html-for="password">
                  Password
                </UiLabel>
                <!-- <NuxtLink
                  to="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </NuxtLink> -->
              </div>
              <UiInput
                id="password"
                type="password"
                required
                placeholder="*****"
              />
              <span class="text-sm text-red-400">{{ getErrorByField("password") }}</span>
            </div>
            <UiButton type="submit" class="w-full">
              Create Your Account
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
