export default defineEventHandler(async (event) => {
  setCookie(event, "loginData", "{}", {
    expires: new Date(),
  })

  return sendRedirect(event, "/")
})
