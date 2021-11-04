const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(product) {
    const products = await this.getAll();
    console.log(products);
    let newId;
    if (products.length == 0) {
      newId = 1;
      console.log(newId);
    } else {
      newId = products[products.length - 1].id + 1;
      console.log(newId);
    }

    const newProduct = { ...product, id: newId };
    products.push(newProduct);

    try {
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return newId;
    } catch (error) {
      throw new Error(`Error en fs.writeFile:${error}`);
    }
  }
  async getAll() {
    try {
      const products = await fs.promises.readFile(this.archivo, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }
  async deleteById(num) {
    try {
      const products = await fs.promises.readFile(this.archivo, "utf-8");
      let fileProducts = JSON.parse(products);

      let deleteProduct = fileProducts.filter((a) => {
        return a.id !== num;
      });
      let actualizado = JSON.stringify(deleteProduct, null, 2);

      fs.writeFile(this.archivo, actualizado, (err) => {
        if (err) {
          console.log("error");
        } else console.log("Objeto borrado de la lista");
      });
    } catch (error) {
      console.log("Errores en el metodo deleteById()", error);
    }
  }
  async getById(num) {
    try {
      let products = await fs.promises.readFile(this.archivo, "utf-8");
      let fileProducts = JSON.parse(products);

      let filtroid = fileProducts.map(function (element){
        return `${element.id}`;
      });

      let resultado = fileProducts.find(function (e) {
        return e.id == num;
      });

      if (resultado === undefined) {
        console.log("Objeto no encontrado");
      } else {
        console.log("Id: ", resultado);
      }
    } catch (error) {
      console.log("Error metodo getById() ", error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.unlink(this.archivo);
      console.log("Todo borrado");
    } catch (error) {
      console.log("Error en el metodo deleteAll()", error);
    }
  }
}

let obj1 = {
  title: "Escuadra1",
  price: "325",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
let obj2 = {
  title: "Escuadra2",
  price: "500",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
let obj3 = {
  title: "Escuadra3",
  price: "600",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
let obj4 = {
  title: "Escuadra4",
  price: "325",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
let obj5 = {
  title: "Escuadra5",
  price: "500",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
let obj6 = {
  title: "Escuadra6",
  price: "600",
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

// const file = process.argv[2];
// let fileContainer = new Contenedor(file);

const contenedor = new Contenedor("productos.txt");

// contenedor.save(obj5);
// contenedor.save(obj6);

module.exports = contenedor;



