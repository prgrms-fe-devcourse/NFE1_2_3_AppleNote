import { http, HttpResponse, HttpResponseResolver } from "msw";

import { validateContentBody, validateContentType } from "@mocks/helper";
import { BASE_URL } from "@common/api/fetch";

type AuthRequest = {
  email: string;
  password: string;
};

type AuthResponse = {
  statusCode: number;
  payload: {
    accessToken: string;
    userId: string;
    name: string;
    email: string;
    bannerImage: string | null;
    profileImage: string | null;
  };
};

const handleAuthRequest = (
  url: string,
  method: keyof typeof http,
  resolver: HttpResponseResolver<never, AuthRequest, AuthResponse>
) => {
  return http[method](url, resolver);
};

export const handlers = [
  handleAuthRequest(`${BASE_URL}/auth/login`, "post", async ({ request }) => {
    const data = await request.json();

    await validateContentType(request, "application/json");
    await validateContentBody(!data.email || !data.password, "Missing email or password");

    return HttpResponse.json({
      statusCode: 200,
      payload: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamVvbmdiYWViYW5nIiwidXNlcklkIjoiODkzN2MzZWUtN2I5NS00Njg4LWI3ZmUtOWMyZjE5MGU1M2RhIn0.D0oyvTrwN169uG9VvDvUpXgzD5Nio512ROlACguWLSs",
        userId: "8937c3ee-7b95-4688-b7fe-9c2f190e53da",
        name: data.email,
        email: data.password,
        bannerImage: null,
        profileImage: null,
      },
    });
  }),
];
