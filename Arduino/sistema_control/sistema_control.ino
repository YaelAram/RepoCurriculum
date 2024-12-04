/*****************************************************
 *                   Proyecto (IoT)                  *
 *                                                   *
 *                    Integrantes:                   *
 *             Castillo Sanchez Yael Aram            *
 *              Cruz Ramirez Joshua Rene             *
 *                Quijano Cabello Axel               *
 *                                                   *
 *                   Descripcion:                    *
 *  Este archivo contiene el código fuente del       *
 *  ESP32 encargado de leer los sensores conectados  *
 *  a el, enviar las lecturas a un servidor y al     *
 *  actualizar el estado de los actuadores segun la  *
 *  respuesta del servidor.                          *
 *                                                   *
 *****************************************************/

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <LiquidCrystal.h>
#include <DHT.h>

#define MAX_ADC_READ 4095 // El ADC del ESP32 tiene una resolucion de 12 bits, la lectura maxima del ADC es 4095
#define DHTTYPE DHT11
#define GAS_LIMITE 1000 // Indica el limite en la lectura del sensor de gas para activar el zumbador
#define HAY_PRESENCIA 0 // Indica la lectura del sensor de presencia que indica que detecto algo

// Configuraciones de red
const char* ssid = "Galaxy A129687"; // Contiene el nombre de la red WiFi
const char* password = "vtkh5753"; // Contiene el password para acceder a la red WiFi
const char* url = "https://serveriot-udfi.onrender.com/control/"; // Configura la URL del endpoint de consulta
const int httpOk = 200; // Codigo HTTP para un peticion exitosa

// Pines RS, E, D4, D5, D6, D7 para la pantalla LCD
const int RS_PIN = 13, EN_PIN = 12, D4_PIN = 14, D5_PIN = 27, D6_PIN = 26, D7_PIN = 25;
// Pines de los sensores
const int LUZ_PIN = 34, DHT_PIN = 4, MQ_PIN = 35, PRES_PIN = 21;
// Pines de los actuadores
const int LED_PIN = 17, MOTOR_PIN = 16, GAS_B_PIN = 5, PRES_B_PIN = 18;
// Variables que almacenan las lecturas de los sensores
int LUZ_LEC = 0, TEMP_LEC = 0, GAS_LEC = 0, PRES_LEC = 0;
// Mensajes para la pantalla LCD
const int GAS_MEN = 0, LUZ_MEN = 1, PRE_MEN = 2, TEMP_MEN = 3;
String info[4][2] = {{"", ""}, {"", ""}, {"", ""}, {"", ""}};

DHT dht(DHT_PIN, DHTTYPE); // Instancia DHT11
LiquidCrystal lcd(RS_PIN, EN_PIN, D4_PIN, D5_PIN, D6_PIN, D7_PIN); // Instancia para controlar la pantalla LCD

void setup() {
  Serial.begin(9600); // Iniciamos el monitor serial
  delay(1000);
  lcd.begin(16, 2); // Inicializa la pantalla LCD con 16 columnas y 2 filas
  // Configurando los pines de los sensores
  dht.begin(); // Inciamos la comunicacion con el sensor DHT11
  pinMode(PRES_PIN, INPUT); // Configuramos el pin conectado al sensor de presencia como una entrada digital
  // Configurando los pines de los actuadores como salida digitales
  pinMode(LED_PIN, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(GAS_B_PIN, OUTPUT);
  pinMode(PRES_B_PIN, OUTPUT);
  // Apagamos todos los actuadores (Estado por defecto o inicial)
  actualizarActuadores(0, 0, 0, 0);
  // Iniciamos el proceso de conexion a internet
  conectarAInternet();
}

void loop() {
  // Si no hay conexion a internet
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Sin conexion a internet"); // Notificamos a traves del monitor serial
    conectarAInternet(); // Intentamos conectarnos a internet
    // Una vez con conexion a internet seguimos con la ejecucion de la funcion LOOP
  }
  
  String json = leerSensores(); // Leemos el estado de los sensores y obtenemos la informacion en formato JSON
  if (json == "Error") return; // Si hubo un error salimos de la funcion
  
  String resp = consultarServidor(json); // Consultamos al servidor
  if (resp == "Error") return; // Si hubo un error salimos de la funcion
  
  // Actualizamos el estado de los actuadores
  actualizarActuadores(
    resp.charAt(GAS_MEN) - '0',
    resp.charAt(LUZ_MEN) - '0',
    resp.charAt(PRE_MEN) - '0',
    resp.charAt(TEMP_MEN) - '0'
  );
  // Mostramos las lecturas de los sensores y estado de los actuadores a traves de la pantalla LCD
  mostrarInformacion();
}

/*
  Esta funcion nos permite conectar el ESP32 a internet.
  No recibe parametros.
  No retorna nada.
*/
void conectarAInternet() {
  Serial.print("=============================================================");
  Serial.println("Conectando a red " + String(ssid)); // Comenzamos el proceso de conexion a internet
  WiFi.begin(ssid, password); // Enviamos el nombre de la red y el password
  lcd.clear(); // Limpiamos la pantalla LCD

  // Intentamos conectarnos mientras no haya conexion a internet
  while(WiFi.status() != WL_CONNECTED) {
    delay(1000); // Esperamos 1 segundo entre cada intento
    // Notificamos que seguimos en proceso de conexion
    Serial.println("Conectando...");
    lcd.print("Conectando...");
  }
  Serial.println("Conectado a " + String(ssid)); // Notificamos que la conexion fue exitosa
  lcd.clear(); // Limpiamos la pantalla LCD
}

/*
  Esta funcion se encarga de crear los mensajes a mostrar en la pantalla LCD que informan al usuario
  las lecturas de los sensores.
  Parametros:
    - gas: Indica si el sensor de gas detecto una concentracion de gas superior al limite
    - luminosidad: Indica el porcentaje de luz en el cuarto
    - pre: Indica si el sensor de presencia detecto algo
    - TEMP_LEC: Contiene la temperatura actual del cuarto
  No retorna nada
*/
void crearMensajesLecturas(bool gas, int luminosidad, bool pre, int TEMP_LEC) {
  if (gas) info[GAS_MEN][0] = "Gas: Detectado";
  else info[GAS_MEN][0] = "Gas: No Detectado";

  info[LUZ_MEN][0] = "Luz: " + String(luminosidad) + "%";

  if (pre) info[PRE_MEN][0] = "Presencia: Si";
  else info[PRE_MEN][0] = "Presencia: No";
  
  info[TEMP_MEN][0] = "Temp: " + String(TEMP_LEC) + "C";
}

/*
  Esta funcion se encarga de recolectar la informacion de los sensores y devolver un String con un JSON
  codificado con la informacion de los sensores.
  Sin Parametros.
  Retorna:
    - Retorna un String el cual contiene un JSON con la informacion de los sensores o "Error" indicando que 
    hubo un error al leer el sensor DHT11.
*/
String leerSensores() {
  LUZ_LEC = analogRead(LUZ_PIN); // Obtenemos la lectura del ADC
  TEMP_LEC = round(dht.readTemperature()); // Leemos la temperatura mediante el sensor DHT11
  GAS_LEC = analogRead(MQ_PIN); // Obtenemos la lectura del sensor de gas MQ2
  PRES_LEC = digitalRead(PRES_PIN); // Obtenemos la lectura del sensor de presencia

  int luminosidad = round((LUZ_LEC * 100) / MAX_ADC_READ); // Obtenemos el porcentaje de luminosidad
  bool pre = PRES_LEC == HAY_PRESENCIA; // Verificamos si el sensor de presencia detecto algo
  bool gas = GAS_LEC > GAS_LIMITE; // Verificamos si la lectura del sensor de gas supera el limite

  // Imprimimos en el puerto Serial la informacion de los sensores y sus conversiones
  Serial.print("=============================================================");
  Serial.println("Luz: " + String(LUZ_LEC) + "(" + String(luminosidad) + "%)");
  Serial.println("Temp: " + String(TEMP_LEC));
  Serial.println("Gas: " + String(GAS_LEC) + "(" + String(gas));
  Serial.println("Luz: " + String(PRES_LEC) + "(" + String(pre));
  
  if (isnan(TEMP_LEC)) return "Error"; // Si hubo un error al leer el sensor DHT11 devolvemos "Error"
  crearMensajesLecturas(gas, luminosidad, pre, TEMP_LEC); // Creamos los mensajes para la pantalla LCD

  // Contruimos el String con el JSON codificado
  String json = "{\"temp\": " + String(TEMP_LEC) + ","; 
  json += "\"luz\": " + String(luminosidad) + ","; 
  json += "\"gas\": " + String(gas ? "true" : "false") + ","; 
  json += "\"pre\": " + String(pre ? "true" : "false") + "}"; 

  return json; // Devolvemos el string
}

/*
  Esta funcion se encarga de enviar al servidor las lecturas de los sensores y recibir el nuevo
  estado de los actuadores.
  Parametros:
    - json: Un string con la informacion codificada en formato JSON con las lecturas de los sensores
  Retorna:
    - Un string con el nuevo estado de los actuadores
*/
String consultarServidor(String json) {
  WiFiClientSecure client; // Creamos un nuevo cliente para HTTPS
  client.setInsecure(); // Indicamos que deseamos usarlo de forma insegura

  HTTPClient http; // Creamos un nuevo cliente HTTP
  http.begin(client, url); // Enviamos la URL al endpoint del servidor y el cliente para HTTPS
  http.addHeader("Content-Type", "application/json"); // Indicamos que la informacion es enviada en formato JSON
  int codigoHttp = http.POST(json); // Realizamos una peticion POST y obtenemos el codigo HTTP de respuesta
  
  Serial.println("Codigo HTTP: " + String(codigoHttp)); // Imprimimos el codigo de respuesta

  // Veficiamos si la peticion fue exitosa
  if (codigoHttp != httpOk) {
    // Notificamos el error a traves del monitor serial
    Serial.println("Hubo un error al realizar la peticion HTTP.");
    return "Error"; // Retornamos el mensaje de error
  }

  // Si la peticion fue exitosa
  String resp = http.getString(); // Obtenemos el nuevo estado los actuadores
  Serial.println("Respuesta: " + resp); // Imprimimos la respuesta a traves del monitor serial
  http.end(); // Finalizamos la conexion

  return resp; // Retornamos la respuesta exitosa
}

/*
  Esta funcion se encarga de crear los mensajes a mostrar en la pantalla LCD que informan al usuario
  el estado de los actuadores.
  Parametros:
    - gas: Indica si el zumbador 1 debe ser encendido
    - luz: Indica si el led debe ser encendido
    - pre: Indica si el zumbador 2 debe ser encendido
    - temp: Indica si el ventilador debe ser encendido
  No retorna nada
  Nota: Los 4 parametros tienen un valor de cero o uno, uno = encender, cero = apagar
*/
void crearMensajesActuadores(int gas, int luz, int pre, int temp) {
  if (gas == HIGH) info[GAS_MEN][1] = "Alarma Encendida";
  else info[GAS_MEN][1] = "Alarma Apagada";

  if (luz == HIGH) info[LUZ_MEN][1] = "Luz Encendida";
  else info[LUZ_MEN][1] = "Luz Apagada";

  if (pre == HIGH) info[PRE_MEN][1] = "Alarma Encendida";
  else info[PRE_MEN][1] = "Alarma Apagada";

  if (temp == HIGH) info[TEMP_MEN][1] = "Aire Encendido";
  else info[TEMP_MEN][1] = "Aire Apagado";
}

/*
  Esta funcion se encarga de actualizar el estado de los actuadores.
  Parametros:
    - gas: Indica si el zumbador 1 debe ser encendido
    - luz: Indica si el led debe ser encendido
    - pre: Indica si el zumbador 2 debe ser encendido
    - temp: Indica si el ventilador debe ser encendido
  No retorna nada
  Nota: Los 4 parametros tienen un valor de cero o uno, uno = encender, cero = apagar
*/
void actualizarActuadores(int gas, int luz, int pre, int temp) {
  // Creamos los mensaje de estado de los actuadores para la pantalla LCD
  crearMensajesActuadores(gas, luz, pre, temp);

  // Imprimimos el nuevo estado de los actuadores en el monitor serial
  Serial.println("Ventilador: " + String(temp));
  Serial.println("Zumbador (Gas): " + String(gas));
  Serial.println("Luz: " + String(luz));
  Serial.println("Zumbador (Presencia): " + String(pre));
  
  // Actualizamos las salidas digitales que se conectan a los actuadores
  digitalWrite(LED_PIN, luz);
  digitalWrite(GAS_B_PIN, gas);
  digitalWrite(PRES_B_PIN, pre);
  digitalWrite(MOTOR_PIN, temp);
}

/*
  Esta funcion se encarga de mostrar la informacion con las lecturas de los sensores y el estado de los actuadores
  al usuario a trves de la pantalla LCD.
  No recibe parametros.
  No retorna nada.
*/
void mostrarInformacion() {
  // Iteramos sobre el arreglo con los mensajes
  for (int i = 0 ; i < 4 ; i++) {
    lcd.clear(); // Limpiamos la pantalla y nos situamos en la posicion 0,0
    lcd.print(info[i][0]); // Imprimimos la lectura del sensor
    lcd.setCursor(0, 1); // Nos movemos al segundo renglon de la pantalla LCD
    lcd.print(info[i][1]); // Imprimimos el estado del actuador ligado al sensor

    delay(3000); // Esperamos 2 segundos antes de imprimir el siguiente mensaje
  }
}
