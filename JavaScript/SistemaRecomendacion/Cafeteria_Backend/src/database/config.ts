import mongoose from "mongoose";

// Esta funcion nos permite configurar Mongoose para que se conecte con nuestra base de datos MongoDB en la nube
export const conectToDataBase = async () => {
  try {
    // Mandamos a llamar el metodo connect de Mongoose con el string de conexion de las variables de entorno
    await mongoose.connect(process.env.MongoDB_Atlas ?? "");
    // Si la anterior funcion no lanza una excepcion mostramos un mensaje de exito
    console.log("DataBase connection successful");
  } catch (error) {
    // Si la conexion no fue exitosa mostramos un mensaje de error y lanzamos una excepcion
    console.log(error);
    throw new Error("DataBase connection error");
  }
};
