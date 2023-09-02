## Overview
URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases “short links.” Users are redirected to the original URL when they hit these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.

For example, if we shorten the following URL through TinyURL:

https://babeljs.io/blog/2020/10/15/7.12.0#class-static-blocks-12079httpsgithubcombabelbabelpull12079-12143httpsgithubcombabelbabelpull12143 We would get:

https://tinyurl.com/y4ned4ep The shortened URL is nearly one-fifth the size of the actual URL.

Some of the use cases for URL shortening is to optimise links shared across users, easy tracking of individual links and sometimes hiding the affiliated original URLs.

## Tech stacks
-  Node.Js
-  Express.Js
-  MongoDB

## Dependencies
-  Axios
-  cors
-  jsonwebtoken
-  mongoose
-  nodemon
-  shortid
-  valid-url

## Author
-  Aditya Shaw

## Deployment Link
-

## Models

1. ### User Model
```
{
     fullName: {
        type:String,
        require:true,
      },
      emailId: {
        type: String,
        required: true,
        unique: true
    },
      password: {
        type: String,
        required: true
    },
      confirmPassword: {
        type: String,
        required: true
    }
}
```
2. ### Shortened URL Model
```
{
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  urlCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
}
```

## APIs
1. ### User APIs
-  router.post("/users", createUsers);
-  router.post("/loginUser", loginUser);
-  router.post("/getUsers", fetchuser, getUser)

2. ### URL APIs
-  router.post("/shortenUrl", creatURL);
-  router.get("/getURL", getAllURL);
-  router.get("/user/:userId", getURLByUserId);
-  router.get("/url/:urlCode", getURLWithPath);

## Frontend repository link
This is a MERN stack project so please visit frontend repository also (https://github.com/aadimr/URLShortner-frontend)

