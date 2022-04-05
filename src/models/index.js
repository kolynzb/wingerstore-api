import fs from 'fs';
import path from 'path';

let models = {};

export function registerModels(sequelize) {
  const thisfile = path.basename(__filename);
  const modelFiles = fs.readdirSync(__dirname);
  const filteredModelFiles = modelFiles.filter((file) => file !== thisfile && file.slice(-3) === '.js');

  for (const file of filteredModelFiles) {
    const model = require(path.join(__dirname, file)).default(sequelize);
    console.log('model ', model);
    models[model.name] = model;
  }

  // register associations
  Object.keys(models).forEach((modelName) => {
    models[modelName].associate(models);
  });
  models.sequelize = sequelize;
}

export default models;
