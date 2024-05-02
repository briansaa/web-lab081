const express = require('express');
const Sequelize = require('sequelize');
const { Laboratorio, Especialidad, TipoMedic, Medicamento, OrdenVenta, 
  DetalleOrdenVta, Presentacion, OrdenCompra, DetalleOrdenCompra } 
  = require('./models/models');

const app = express();

const sequelize = new Sequelize('farmacia', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec' });
Medicamento.belongsTo(Laboratorio, { foreignKey: 'CodLab' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'OrdenVenta_NroOrdenVta' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });
Presentacion.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'OrdenCompra_NroOrdenC' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });
// Definir las relaciones entre los modelos
Laboratorio.hasMany(Medicamento, { foreignKey: 'CodLab' }); 
Medicamento.belongsTo(Laboratorio, { foreignKey: 'CodLab' }); 

Especialidad.belongsToMany(Medicamento, { through: 'MedicamentoEspecialidad', foreignKey: 'CodEspec' });
Medicamento.belongsToMany(Especialidad, { through: 'MedicamentoEspecialidad', foreignKey: 'CodMedicamento' }); 

TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed' }); 
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' }); 

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos OK');
  })
  .catch(error => {
    console.log('Error de conexión a la base de datos: ' + error);
  });

// Rutas para mostrar los datos
app.get('/laboratorios', async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.render('laboratorios', { laboratorios });
  } catch (error) {
    console.error('Error al obtener los laboratorios: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/especialidades', async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.render('especialidades', { especialidades });
  } catch (error) {
    console.error('Error al obtener las especialidades: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/tipos-medicamentos', async (req, res) => {
  try {
    const tiposMedicamentos = await TipoMedic.findAll();
    res.render('tiposMedicamentos', { tiposMedicamentos });
  } catch (error) {
    console.error('Error al obtener los tipos de medicamentos: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/medicamentos', async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      attributes: ['CodMedicamento', 'descripcionMed', 'fechaFabricacion', 'fechaVencimiento', 'CodTipoMed', 'CodLab']
    });
    res.render('medicamentos', { medicamentos });
  } catch (error) {
    console.error('Error al obtener los medicamentos: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/ordenes-venta', async (req, res) => {
  try {
    const ordenesVenta = await OrdenVenta.findAll();
    res.render('ordenesVenta', { ordenesVenta });
  } catch (error) {
    console.error('Error al obtener las ordenes de venta: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/detallesOrdenVenta', async (req, res) => {
  try {
    const detallesOrdenVenta = await DetalleOrdenVta.findAll({
      attributes: ['NroOrdenVta', 'CodMedicamento', 'descripcionMed', 'cantidadRequerida']
    });
    res.render('detallesOrdenVenta', { detallesOrdenVenta });
  } catch (error) {
    console.error('Error al obtener los detalles de orden de venta: ' + error);
    res.status(500).send('Error interno del servidor');
  }
});

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Configura el puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});