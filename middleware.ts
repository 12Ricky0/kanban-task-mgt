// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl || req.nextUrl.pathname);
  }
  // if (!req.auth && req.nextUrl.pathname !== "/signup") {
  //   const newUrl = new URL("/signup", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }

  // const newUrl = new URL("/signup", req.nextUrl.origin);
  // return Response.redirect(newUrl);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|login|signup|libs|models).*)",
  ],
};
