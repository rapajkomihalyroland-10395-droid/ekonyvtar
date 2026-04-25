export const Logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Sikeres kijelentkezés" });
  } catch (error) {
    return res.status(500).json({ error: "Kijelentkezési hiba" });
  }
};
