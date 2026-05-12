import { axiosAdmin } from "../../shared/api/api.js";



// Robare los necesaios para salvar esta compañia   
export const getCompanies = async () => {
  return await axiosAdmin.get("/company");
};

export const createCompany = async (data) => {
   return await axiosAdmin.post("/company", data);
   };
export const updateCompany = async (id, data) => { 
  return await axiosAdmin.put(`/company/${id}`, data); 
};

export const deactivateCompany = async (id) => {
  return await axiosAdmin.delete(`/company/${id}`);
};

// Instituciones
export const getInstitutions = async () => {
  return await axiosAdmin.get("/institud");
};



export const createInstitution = async (data) => {
  return await axiosAdmin.post("/institud", data);
};

export const updateInstitution = async (id, data) => {
  return await axiosAdmin.put(`/institud/${id}`, data);
};

export const deactivateInstitution = async (id) => {
  return await axiosAdmin.delete(`/institud/${id}`);
};




// Studiantes
export const getStudentRecords = async () => {
   return await axiosAdmin.get("/student"); };
export const createStudentRecord = async (data) => { 
  return await axiosAdmin.post("/student", data); };
export const updateStudentRecord = async (id, data) => { 
  return await axiosAdmin.put(`/student/${id}`, data); };

export const deactivateStudentRecord = async (id) => {
   return await axiosAdmin.delete(`/student/${id}`); };
/*
// Reservaciones
export const getReservations = async () => api.get("/reservation");
export const getReservationById = async (id) => api.get(`/reservation/${id}`);
export const createReservation = async (data) => api.post("/reservation", data);
export const updateReservation = async (id, data) => api.put(`/reservation/${id}`, data);
export const changeReservationStatus = async (id, status) => api.put(`/reservation/${id}`, { estado: status });
*/
// Usuarios
export const obtenerUsuarios = async () => {
   return await axiosAdmin.get("/user"); };

export const obtenerUsuario = async (id) => { 
  return await axiosAdmin.get(`/user/${id}`); };

export const actualizarUsuario = async (id, data) => { 
  return await axiosAdmin.put(`/user/${id}`, data); };

export const deactivateUsuario = async (id) => {
   return await axiosAdmin.delete(`/user/${id}`); };


/*

// Mantenimiento
export const getMaintenanceRecords = async () => {
  return await axiosAdmin.get("/maintenance");
};

export const createMaintenanceRecord = async (data) => {
  return await axiosAdmin.post("/maintenance", data, buildFormDataConfig(data));
};

export const updateMaintenanceRecord = async (id, data) => {
  return await axiosAdmin.put(`/maintenance/${id}`, data, buildFormDataConfig(data));
};

export const deleteMaintenanceRecord = async (id) => {
  return await axiosAdmin.put(`/maintenance/${id}/deactivate`, { isActive: false });
};
// Carritos
export const getCarts = async () => api.get("/cart");
export const getCartById = async (id) => api.get(`/cart/${id}`);
export const createCart = async (data) => api.post("/cart", data);
export const updateCart = async (id, data) => api.put(`/cart/${id}`, data);

// Administración general
export const getAdministration = async () => api.get("/administration");
// export const getAdministrationById = async (id) => api.get(`/administration/${id}`);
export const createAdministration = async (data) => api.post("/administration", data);
export const updateAdministration = async (id, data) => api.put(`/administration/${id}`, data);



*/