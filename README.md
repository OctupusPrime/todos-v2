# .Todos
[**Live demo**](https://vue-todos-nuxt.herokuapp.com/)

## Installation Setup

```bash
# clone code
git clone https://github.com/OctupusPrime/todos-v2.git

# go to folder
cd todos-v2

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate
```
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Description

This is a full stack application for taking notes in columns. *Inspired by [Trello](https://trello.com).*

  
### Key features : 
* **Safety** _(All tokens are stored on the backend with the httpOnly tag)_;
* **Registration, Authentication** _(Ability to create an account to access your notes)_;
* **Saving notes to database** _([mongo DB](https://www.mongodb.com))_;
* **Convenient gui** _for (add, edit, delete) notes_;
* **Shuffling notes** _(Drag and drop functionality is fully implemented)_;
* **Working deadline** in a note;
* **Priority selection in each note separately**;
* There is a **[/help](https://vue-todos-nuxt.herokuapp.com/help)** page to help you get started;
* **Adaptable for any device**;

## Documentation
### Front End part
---
#### Plugins
| Name | Usage |
| --- | --- |
| [@fortawesome/vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome) | Used to add icons from [fontawesome](https://fontawesome.com) |
| [@nuxtjs/axios](https://www.npmjs.com/package/@nuxtjs/axios) | Used to send asynchronous requests to the backend |
| [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) | Used to create isAuth cookie on client |
| [vue-resize](https://www.npmjs.com/package/vue-resize) | Used to detect element size change |

#### Folders
* ##### assets  
It stores the ***global styles*** in the css folder, and the ***gifs / images*** folders hold the original gifs and photos *(so you might think)*.  

* ##### components
If the component has the ***Todo prefix***, then it refers to the note. And if ***Base*** then they replace the base *(input, buttons ...)*.

* ##### layouts
| Name | Usage |
| --- | --- |
| clear | Completely clean layout |
| default | layout of the application itself with the right bar settings |
| noAuth | layout with reg / log button in header |

* ##### middleware  
***auth.js*** - It is needed to validate whether the user is logged into the account, if not, then redirect to the landing page.  

* ##### pages
| Name | Usage |
| --- | --- |
| index | Landing page with registration/authentication and application information |
| tasks | Application page with notess |
| help  | User information page on how to use the app |

* ##### plugins
Just a folder to initialize global plugins.

* ##### store
The most interesting folder is where all requests to the back end and changes to the array of notes take place.

#### For future me 
Add click out from Add todo and quick menu.

### Back End part
---
#### Plugins
| Name | Usage |
| --- | --- |
| [express](https://www.npmjs.com/package/express) | Used to create routes |
| [express-validator](https://www.npmjs.com/package/express-validator) | Used to validate password and email |
| [mongoose](https://www.npmjs.com/package/mongoose) | Used for easy work with [mongo DB](https://www.mongodb.com) |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | Used to parse and add cookie to request header |
| [body-parser](https://www.npmjs.com/package/body-parser) | Used to parse request body |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Used to hash the password |
| [uuid](https://www.npmjs.com/package/uuid) | Used to create a unique id for refresh token |
#### Routes
* ##### **Authification**
---
**Registration**  
Registates user	  
Path: */api/auth/reg*  
Method: **POST**  

**Request**
| BODY | TYPE | REQUIRED |
| --- | --- | --- |
| email<br>*(User email)* | string  | **Required** |
| password<br>*(User password)* | string  | **Required** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response message *"User was created"*.
----  
**Log in**  
Log in user.  
Path: */api/auth/log*  
Method: **POST**  

**Request** 
| BODY | TYPE | REQUIRED |
| --- | --- | --- |
| email<br>*(User email)* | string  | **Required** |
| password<br>*(User password)* | string  | **Required** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response message *"Auntificated"*.
---
**Log out**  
Log out user.  
Path: */api/auth/logout*  
Method: **POST**  

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response message *"User logout"*.
---
**Refresh tokens**  
Log out user  
Path: */api/auth/logout*  
Method: **POST**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response message *"Token refreshed"*.
---
* ##### **Tasks**
---
**Get tasks**  
Gets all user tasks.
Path: */api/tasks*  
Method: **GET**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response body contains tasks list.
---
**Add task**  
Added task to array	
Path: */api/tasks*  
Method: **POST**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |  

| BODY | TYPE | REQUIRED |
| --- | --- | --- |
| title<br>*(of the task)* | string  | **Required** |
| description<br>*(of the task)* | string  | **Optional** |
| deadline<br>*(of the task)* | number | **Optional**<br>*(Default: 1 day)* |
| priority<br>*(of the task)* | string | **Optional**<br>*(Default: low)* |

**Response**  
On success, the HTTP status code in the response header is 200 OK and the response body contains of added task.
---
**Update  task**  
Update task values.  
Path: */api/tasks:title*  
Method: **PUT**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |  

PATH PARAMETER | TYPE | REQUIRED |
| --- | --- | --- |
| title<br>*(of the the task)* | string  | **Required** |  

| BODY | TYPE | REQUIRED |
| --- | --- | --- |
| title<br>*(Updated title)* | string  | **Optional** |
| description<br>*(Updated description)* | string  | **Optional** |
| deadline<br>*(Updated deadline)* | number | **Optional** |
| priority<br>*(Updated priority)* | string | **Optional** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and message *"Task was updated"*.
---
**Delete  task**  
Update task values.  
Path: */api/tasks:title*  
Method: **DELETE**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |  

PATH PARAMETER | TYPE | REQUIRED |
| --- | --- | --- |
| title<br>*(of the the task)* | string  | **Required** |  

**Response**  
On success, the HTTP status code in the response header is 200 OK and message *"Task was deleted"*.
---
**Relocate  task**  
Relocate task in columns and index.  
Path: */api/tasks:title*  
Method: **PUT**  

**Request** 
| HEADER | TYPE | REQUIRED |
| --- | --- | --- |
| Authorization<br>*(A valid user access token)* | string  | **Required** |  

PATH PARAMETER | TYPE | REQUIRED |
| --- | --- | --- |
| title<br>*(of the the task)* | string  | **Required** |  

| BODY | TYPE | REQUIRED |
| --- | --- | --- |
| status<br>*(Which column to put)* | string  | **Required** |
| index<br>*(Which index put)* | number  | **Required** |

**Response**  
On success, the HTTP status code in the response header is 200 OK and message *"Task was relocated"*.
---
#### Bugs
When in one column too many tasks relocate route doesn't work properly and put tasks in random spots.
#### For future me 
 Fix relocate bug.  
 Add to response to updated task in update task.
 
 ### Authors
 [**Misha Sokil**](https://github.com/kevinwairi)
 
 ### License
 MIT © Misha Sokil
 
**Thank you for your attention**