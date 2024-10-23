
# Employees API

Esta API gestiona información de empleados, permitiendo obtener listados de empleados, filtrar por privilegios, badges y realizar paginación.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto para configurar el puerto de la aplicación (opcional):

   ```
   PORT=8000
   ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

La API estará corriendo en `http://localhost:8000`.

## Endpoints

### 1. Obtener todos los empleados

```http
GET /api/employees
```

Devuelve una lista de todos los empleados.

### 2. Obtener empleados por paginación

```http
GET /api/employees?page=N
```

- **Parámetro**: `page` (número de página).
- **Ejemplo**:

```http
GET /api/employees?page=1
```

Devuelve los empleados correspondientes a la página solicitada (con un límite de 2 empleados por página).

### 3. Filtrar empleados por privilegios

```http
GET /api/employees?user=true
```

- **Parámetro**: `user` (booleano `true` o `false`).
- **Ejemplo**:

```http
GET /api/employees?user=true
```

Devuelve los empleados con el privilegio de "user" si `user=true` o sin privilegio de "user" si `user=false`.

### 4. Filtrar empleados por badges

```http
GET /api/employees?badges=<badge>
```

- **Parámetro**: `badges` (string).
- **Ejemplo**:

```http
GET /api/employees?badges=black
```

Devuelve los empleados que tengan el badge especificado.

### 5. Obtener el empleado más viejo

```http
GET /api/employees/oldest
```

Devuelve al empleado con mayor edad.

### 6. Crear un nuevo empleado

```http
POST /api/employees
```

- **Body (JSON)**:

  ```json
  {
    "name": "Nuevo Empleado",
    "age": 30,
    "phone": {
      "personal": "555-555-555",
      "work": "555-666-666",
      "ext": "1234"
    },
    "privileges": "user",
    "favorites": {
      "artist": "Van Gogh",
      "food": "pizza"
    },
    "finished": [1, 2],
    "badges": ["blue", "red"],
    "points": [
      {
        "points": 100,
        "bonus": 10
      }
    ]
  }
  ```

Crea un nuevo empleado y lo agrega a la lista.

### 7. Obtener empleado por nombre

```http
GET /api/employees/:name
```

- **Parámetro**: `name` (string).
- **Ejemplo**:

```http
GET /api/employees/John
```

Devuelve un empleado que coincida con el nombre proporcionado.

## Licencia

Este proyecto está bajo la licencia MIT.
