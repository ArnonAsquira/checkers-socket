function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(";").shift() as string;
  return "123";
}

const authAxiosConfig = () => ({
  headers: {
    authorization: `bearer ${getCookie("jwt")}`,
  },
});

export { authAxiosConfig };
