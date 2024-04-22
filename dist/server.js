"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./infra/express/express");
const PORT = String(process.env.PORT);
express_1.app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
