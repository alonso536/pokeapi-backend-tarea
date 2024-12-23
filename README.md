# Pokeapi - Backend

### Diplomado Fullstack

**Docente:** Ricardo Castillo

**Alumno:** Alonso Díaz

![Logo instituto](https://media.licdn.com/dms/image/v2/D4E0BAQFVRQTLjQcHiw/company-logo_200_200/company-logo_200_200/0/1719843104181?e=2147483647&v=beta&t=7eOkSfJpbNurmyxC8gDrUcrVGJDJROF_mxQosb9hnH0)

## Instrucciones

1. Clonar `.env.template` a `.env` y configurar las variables de entorno, se puede ingresar cualquier puerto disponible
   y cualquier secret key para el JWT
2. La variable de entorno `DATABASE ENVIRONMENT` puede contener los valores `mongo` o `postgres`, cualquier otro valor levantará el ambiente con datos en memoria
3. Ejecutar `npm install` para instalar las dependencias
4. Ejecutar `npx prisma init` para crear el archivo `schema.prisma` (Solo si desea probar el ambiente de postgres)
5. Ejecutar `npx prisma db pull` para crear los modelos de prisma (Solo si desea probar el ambiente de postgres)
6. Ejecutar `npx prisma generate` para crear el cliente de prisma (Solo si desea probar el ambiente de postgres)
7. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Tecnologías

- Node JS (v22.3.0)
- Express
- Typescript
- Bycrypt
- UUID
- Json Web Token
- Mongo DB
- Mongoose
- Postgresql
- Prisma ORM

## Endpoints

- Se utilizó la libreria UUID para los identificadores primarios y se agregó un campo num para guardar el
  número del pokemon

1. **Autenticación**:

   - POST `/auth/register` - Registro de nuevo entrenador
   - POST `/auth/login` - Login de entrenador

2. **Pokémon**:
   - GET `/pokemon` - Listar todos los Pokémon
   - GET `/pokemon/:id` - Ver detalle de un Pokémon: Funciona con el id y el num del pokemon
   - GET `/pokemon/trainer/mypokemons` - Ver mis Pokemon (autenticado)
   - POST `/pokemon` - Crear nuevo Pokémon (autenticado)
   - PUT `/pokemon/:id` - Actualizar Pokémon (autenticado): Solo funciona con el id del pokemon
   - DELETE `/pokemon/:id` - Eliminar Pokémon (autenticado): Solo funciona con el id del pokemon
