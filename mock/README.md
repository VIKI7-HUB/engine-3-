# Engine 3 Front-End Mock API

This dependency-free Node server lets you exercise the Engine 3 UI before the Engine 2 API exists. It is a development mock, not a production server, database, authentication system, or ranking engine. The ten sample places contain fixed score values. The mock accepts every search parameter, but treats `preferredCategory` as a simple category filter.

## Run

From the repository root:

```powershell
node engine3/mock/server.js
```

It listens on `http://localhost:3000/api`, the base URL used by `engine3/app.js`. Open `engine3/index.html` in a browser or serve the `engine3` folder with a static server.

## Mock admin login

- Password: `yatra-demo`
- Token: `yatra-mock-admin-token`

These fixed values exist only for local UI demonstrations. Do not use them for a deployed application.
