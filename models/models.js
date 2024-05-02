const Sequelize = require('sequelize');
const sequelize = new Sequelize('farmacia', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: { type: Sequelize.INTEGER, primaryKey: true },
  razonSocial: Sequelize.STRING,
  direccion: Sequelize.STRING,
  telefono: Sequelize.STRING,
  email: Sequelize.STRING 
}, {
  tableName: 'Laboratorio', 
  timestamps: false 
});


const Especialidad = sequelize.define('Especialidad', {
  CodEspec: { type: Sequelize.INTEGER, primaryKey: true },
  descripcionEsp: Sequelize.STRING
}, {
  tableName: 'Especialidad',
  timestamps: false
});

const TipoMedic = sequelize.define('TipoMedic', {
  CodTipoMed: { type: Sequelize.INTEGER, primaryKey: true },
  descripcion: Sequelize.STRING
}, {
  tableName: 'TipoMedic',
  timestamps: false
});


const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: { type: Sequelize.INTEGER, primaryKey: true },
  descripcionMed: Sequelize.STRING,
  fechaFabricacion: Sequelize.DATE,
  fechaVencimiento: Sequelize.DATE,
  CodTipoMed: Sequelize.INTEGER,
  CodEspec: Sequelize.INTEGER,
  CodLab: Sequelize.INTEGER,
  emailContacto: Sequelize.STRING 
}, {
  tableName: 'Medicamento',
  timestamps: false
});




const OrdenVenta = sequelize.define('OrdenVenta', {
  NroOrdenVta: { type: Sequelize.INTEGER, primaryKey: true },
  fechaEmision: Sequelize.DATE,
  Motivo: Sequelize.STRING,
  Situacion: Sequelize.STRING
}, {
  tableName: 'OrdenVenta',
  timestamps: false
});

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
  NroOrdenVta: Sequelize.INTEGER,
  CodMedicamento: Sequelize.INTEGER,
  descripcionMed: Sequelize.STRING,
  cantidadRequerida: Sequelize.INTEGER
}, {
  tableName: 'DetalleOrdenVta',
  timestamps: false
});


const Presentacion = sequelize.define('Presentacion', {
  CodTipoMed: Sequelize.INTEGER,
  Marca: Sequelize.STRING,
  stock: Sequelize.INTEGER,
  precioVentaUni: Sequelize.DECIMAL(10, 2),
  precioVentaPres: Sequelize.DECIMAL(10, 2),
  CodEspec: Sequelize.INTEGER
}, {
  tableName: 'Presentacion',
  timestamps: false
});


const OrdenCompra = sequelize.define('OrdenCompra', {
  NroOrdenC: { type: Sequelize.INTEGER, primaryKey: true },
  fechaEmision: Sequelize.DATE,
  Situacion: Sequelize.STRING,
  Total: Sequelize.DECIMAL(10, 2),
  CodLab: Sequelize.INTEGER,
  NrofacturaProv: Sequelize.INTEGER
}, {
  tableName: 'OrdenCompra',
  timestamps: false
});


const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
  NroOrdenC: Sequelize.INTEGER,
  CodMedicamento: Sequelize.INTEGER,
  descripcion: Sequelize.STRING,
  cantidad: Sequelize.INTEGER,
  precio: Sequelize.DECIMAL(10, 2),
  montouni: Sequelize.DECIMAL(10, 2)
}, {
  tableName: 'DetalleOrdenCompra',
  timestamps: false
});


module.exports = {
  Laboratorio,
  Especialidad,
  TipoMedic,
  Medicamento,
  OrdenVenta,
  DetalleOrdenVta,
  Presentacion,
  OrdenCompra,
  DetalleOrdenCompra,
  sequelize 
};
