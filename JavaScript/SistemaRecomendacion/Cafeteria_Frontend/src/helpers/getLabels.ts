import {
  Age,
  AgeType,
  Drink,
  DrinkType,
  Temp,
  TempType,
} from "../interfaces/types";

// Esta funcion nos permite obtener el objeto tipo DrinkType apropiado segun el parametro drink que reciba la funcion
export const getDrink = (drink: number): DrinkType => {
  // Si drink es igual a 0 retorna el objeto DrinkType para una bebida fria, de lo contrario retorna el de la bebida caliente
  return drink === 0 ? Drink.COLD : Drink.HOT;
};

// Esta funcion nos permite obtener el objeto tipo TempType apropiado segun el parametro temp que reciba la funcion
export const getTemp = (temp: number): TempType => {
  if (temp <= 0) return Temp.FREEZE;
  else if (temp > 0 && temp <= 10) return Temp.COLD;
  else if (temp > 10 && temp <= 20) return Temp.COOL;
  else if (temp > 20 && temp <= 30) return Temp.MILD;
  else if (temp > 30 && temp <= 40) return Temp.HOT;
  else return Temp.BOILING;
};

// Esta funcion nos permite obtener el objeto tipo AgeType apropiado segun el parametro age que reciba la funcion
export const getAge = (age: number): AgeType => {
  if (age >= 0 && age <= 12) return Age.CHILD;
  else if (age > 12 && age <= 20) return Age.TEEN;
  else if (age > 20 && age <= 30) return Age.YOUNG;
  else if (age > 30 && age <= 40) return Age.MIDDLE;
  else if (age > 40 && age <= 60) return Age.ADULT;
  else if (age > 60 && age <= 80) return Age.RETIRED;
  else return Age.OLDER;
};
