module.exports.models = {
  // schema: true,

  migrate: "alter",

  attributes: {
    createdAt: { type: "number", autoCreatedAt: true },
    updatedAt: { type: "number", autoUpdatedAt: true },
    id: { type: "number", autoIncrement: true },
  },

  dataEncryptionKeys: {
    default: "tVcwLoZRj2tlThxtK+CMyK2vw+atyB1nsvEsLgMMovU=",
  },

  cascadeOnDestroy: true,
};
