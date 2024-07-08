import { Schema, model } from "mongoose";

/*
  Creamos un interface que declara los atributos y su tipo de nuestro tipo de dato ISale
*/
export interface ISale {
  age: number;
  temperature: number;
  drink: number;
}

/*
  Creamos un nuevo schema de Mongoose, enviamos en el generico nuestra interface ISale
  especificamos de nueva cuenta el los campos y tu tipo, adicionalmente indicamos que todos los campos son requeridos,
  es decir, ninguno puede ser null o undefined
*/
const saleSchema = new Schema<ISale>({
  age: { type: Number, required: true },
  temperature: { type: Number, required: true },
  drink: { type: Number, required: true },
});

/*
  Sobreescribimos el metodo que convierte nuestros registros a un formato JSON, renombramos el atributo _id a uid
  asi removemos atributos generado por MongoDB que no son utiles para enviar como __v
*/
saleSchema.methods.toJSON = function () {
  const { __v, _id, ...sale } = this.toObject();
  sale.uid = _id;
  return sale;
};

// Exportamos el modelo de mongoose, este objeto se encarga de realizar todas las operaciones sobre la colección Sales
export const Sale = model<ISale>("Sale", saleSchema);
