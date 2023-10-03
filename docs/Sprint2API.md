# Sprint 2 Nueva funcionalidad

> A partir de ahora todas las llamadas a la api necesitan un token de usuario. (Salvo login y registrar)
# Proyectos
<details><summary>Ver info de un proyecto</summary>

**GET** {{url}}/api/projects/:id

response:

```json
{
  "_id": "6369564206cac10ffe6bed14",
  "name": "Some project",
  "description": "Some description",
  "context": "Some context Eugen need"
}
```
</details>

# Sprints

<details><summary>Obtener Sprints de un proyecto</summary>

**GET** {{url}}/api/sprints/:id

body:

```
response:

```json
[
  {
    "_id": "63877796ecae88987dc3f35b",
    "number": 2,
    "description": "some desc for sprint 2"
  },
  {
    "_id": "638781466637359a4a7733ab",
    "number": 1,
    "description": "first sprint"
  }
]
```

Nota: el orden depende de como se creen, borren, actualicen... No fiarse de que los entregue ordenados.
</details>

<details><summary>Crear sprint</summary>

**POST** {{url}}/api/sprints/

body:

```json
{
  "project_id": "6384e5c4d73622564b7d9b83",
  "number": 1,
  "description": "first sprint"
}
```
response:

```json
{
  "_id": "638781466637359a4a7733ab",
  "number": 1,
  "description": "first sprint"
}
```
</details>

<details><summary>Updatear sprint</summary>

**PUT** {{url}}/api/sprints/

body:

```json
{
  "_id": "638781466637359a4a7733ab",
  "number": 1,
  "description": "first sprint new desc"
}
```
response:

```json
{
  "_id": "638781466637359a4a7733ab",
  "number": 1,
  "description": "first sprint new desc"
}
```
</details>

<details><summary>Delete sprint</summary>

**DELETE** {{url}}/api/sprints/

body:

```json
{
  "_id": "638781466637359a4a7733ab",
}
```
response:

```json
{
  "_id": "638781466637359a4a7733ab",
}
```
</details>

# Historias de Usuario

</details>

<details><summary>Get user stories</summary>

**GET** {{url}}/api/userstories/:id

body:

response:

```json
[
  {
    "_id": "63879b88842b65e3eca1510c",
    "project_id": "6384e633bcdc2c62c0d0d18c",
    "sprint_id": "63879b60842b65e3eca150ff",
    "createdAt": "2022-11-30T18:06:00.083Z",
    "updatedAt": "2022-11-30T18:06:00.083Z",
    "__v": 0
  },
  {
    "_id": "63879bb3842b65e3eca15110",
    "project_id": "6384e633bcdc2c62c0d0d18c",
    "sprint_id": "63879b60842b65e3eca150ff",
    "name": "some user story",
    "done": 4,
    "createdAt": "2022-11-30T18:06:43.818Z",
    "updatedAt": "2022-11-30T18:06:43.818Z",
    "__v": 0
  },
  {
    "_id": "63879c26e3a32e6ed31945e4",
    "project_id": "6384e633bcdc2c62c0d0d18c",
    "sprint_id": "63879b60842b65e3eca150ff",
    "name": "some user story",
    "done": 4,
    "createdAt": "2022-11-30T18:08:38.145Z",
    "updatedAt": "2022-11-30T18:08:38.145Z",
    "__v": 0
  }
]
```
</details>

<details><summary>New user stories</summary>

**POST** {{url}}/api/userstories/

body:

```json
{
  "project_id": "6384e633bcdc2c62c0d0d18c",
  "sprint_id": "63879b60842b65e3eca150ff",
  "name": "new u s creation",
  "priority": 90, 
  "estimated": 4, 
  "done": 2,
  "state": "", 
  "notes": ""
}
```

Nota: el único atributo obligatorio es project_id, lo demás es opcional. 

response:

```json
{
  "_id": "6388ca823f321b28a0cd964a",
  "project_id": "6384e633bcdc2c62c0d0d18c",
  "sprint_id": "63879b60842b65e3eca150ff",
  "name": "new u s creation",
  "priority": 90,
  "estimated": 4,
  "done": 2,
  "state": "",
  "notes": ""
}
```
</details>


<details><summary>Update user stories</summary>

**PUT** {{url}}/api/userstories/

body:

```json
{
  "_id": "6388ca823f321b28a0cd964a",
  "sprint_id": "63879b60842b65e3eca150ff",
  "name": "new u s creation",
  "priority": 90, 
  "estimated": 4, 
  "done": 3,
  "state": "", 
  "notes": ""
}
```

response:

```json
{
  "_id": "6388ca823f321b28a0cd964a",
  "project_id": "6384e633bcdc2c62c0d0d18c",
  "sprint_id": "63879b60842b65e3eca150ff",
  "name": "new u s creation",
  "priority": 90,
  "estimated": 4,
  "done": 3,
  "state": "",
  "notes": ""
}
```
</details>