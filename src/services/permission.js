export const hasModuleAccess = (moduleKey) => {
  const role = localStorage.getItem("role");
  const modules = JSON.parse(localStorage.getItem("modules") || "[]");

  if (role === "SUPER_ADMIN") return true;
  return modules.includes(moduleKey);
};
