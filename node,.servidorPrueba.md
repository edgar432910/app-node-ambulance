const paths = [
{
path: "/users",
method: "GET",
ftn: (request: any, response: any) => {
const users = [
{ name: "juan", age: 20 },
{ name: "ed", age: 20 },
{ name: "and", age: 20 },
];
response.writeHead(200, { "content-type": "application/json" });
response.write(JSON.stringify(users));
response.end();
},
},
{
path: "/users",
method: "POST",
ftn: (request: any, response: any) => {
console.log(`FF`);
response.writeHead(200, { "content-type": "text/html" });
response.write(`<h1>HOLA MUNDO</h1>`);
response.end();
},
},
];
const server = http.createServer((request, response) => {
console.log("request.url ", request.url);
console.log("request.url ", request.method);
const path = paths.find(
(el) => el.path === request.url && el.method === request.method
);
if (path) {
path?.ftn(request, response);
} else {
response.writeHead(404, { "content-type": "text/plain" });
response.write("Not Found");
response.end();
}
console.log({ path });
// if (request.url === "/users" && request.method?.toLowerCase() === "get") {
// const users = [
// { name: "juan", age: 20 },
// { name: "ed", age: 20 },
// { name: "and", age: 20 },
// ];
// response.writeHead(200, { "content-type": "application/json" });
// response.write(JSON.stringify(users));
// response.end();
// } else if (
// request.url === "/users" &&
// request.method?.toLowerCase() === "post"
// ) {
// response.writeHead(200, { "content-type": "text/html" });
// response.write(`<h1>HOLA MUNDO</h1>`);
// response.end();
// } else {
// response.writeHead(404, { "content-type": "text/plain" });
// response.write("Not Found");
// response.end();
// }
// if (request.url === "/") {
// response.writeHead(200, { "content-type": "text/plain" });
// response.write("Hola MUndo");
// response.end();
// } else if (request.url === "/users") {
// const users = [
// { name: "juan", age: 20 },
// { name: "ed", age: 20 },
// { name: "and", age: 20 },
// ];
// response.writeHead(200, { "content-type": "application/json" });
// response.write(JSON.stringify(users));
// response.end();
// } else {
// response.writeHead(404, { "content-type": "text/plain" });
// response.write("Not Found");
// response.end();
// }
});

server.listen(3000, () => {
console.log("SERVER IS LISTENING ON PORT 3000");
});
