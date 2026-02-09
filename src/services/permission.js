export const hasModuleAccess = (moduleKey) => {
  const role = localStorage.getItem("role");
  const modules = JSON.parse(localStorage.getItem("modules") || "[]");

  if (role === "SUPER ADMIN") return true;
  return modules.includes(moduleKey);
};
